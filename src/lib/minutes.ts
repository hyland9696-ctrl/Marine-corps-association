/**
 * Meeting minutes engine (runs entirely in the officer's browser).
 *
 *   1. Audio file  -> Deepgram (speech-to-text, speaker labels)
 *   2. Transcript  -> Claude (structured minutes in Marine Corps League order)
 *
 * Both API keys live only in this browser's localStorage (same approach as the
 * newsletter send secret). Nothing is stored on the website or any server of ours.
 */
import Anthropic from "@anthropic-ai/sdk";
import { site } from "@/lib/site";

export const KEYS = {
  deepgram: "mcl725-deepgram-key",
  anthropic: "mcl725-anthropic-key",
  lastMinutes: "mcl725-last-minutes",
};

export type Motion = { motion: string; movedBy: string; secondedBy: string; result: string };
export type ActionItem = { who: string; what: string; when: string };
export type DateItem = { date: string; text: string };

export type Minutes = {
  meetingTitle: string;
  meetingDate: string;
  summary: string;
  attendance: string;
  callToOrder: string;
  previousMinutes: string;
  paymasterReport: string;
  officerAndCommitteeReports: string[];
  oldBusiness: string[];
  newBusiness: string[];
  motions: Motion[];
  actionItems: ActionItem[];
  upcomingDates: DateItem[];
  goodOfTheLeague: string;
  adjournment: string;
  scuttlebuttRecap: string;
  unclear: string[];
};

const minutesSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "meetingTitle", "meetingDate", "summary", "attendance", "callToOrder", "previousMinutes",
    "paymasterReport", "officerAndCommitteeReports", "oldBusiness", "newBusiness", "motions",
    "actionItems", "upcomingDates", "goodOfTheLeague", "adjournment", "scuttlebuttRecap", "unclear",
  ],
  properties: {
    meetingTitle: { type: "string" },
    meetingDate: { type: "string", description: "As stated in the recording, or 'not stated'" },
    summary: { type: "string", description: "3-6 sentence plain-English overview" },
    attendance: { type: "string", description: "Officers and members named as present, guests, headcount if stated" },
    callToOrder: { type: "string" },
    previousMinutes: { type: "string", description: "Whether prior minutes were read/approved and any corrections" },
    paymasterReport: { type: "string", description: "Balances, dues, income and expenses as stated; 'not given' if absent" },
    officerAndCommitteeReports: { type: "array", items: { type: "string" }, description: "One entry per report: 'Role or committee: what was reported'" },
    oldBusiness: { type: "array", items: { type: "string" } },
    newBusiness: { type: "array", items: { type: "string" } },
    motions: {
      type: "array",
      items: {
        type: "object", additionalProperties: false, required: ["motion", "movedBy", "secondedBy", "result"],
        properties: { motion: { type: "string" }, movedBy: { type: "string" }, secondedBy: { type: "string" }, result: { type: "string" } },
      },
    },
    actionItems: {
      type: "array",
      items: {
        type: "object", additionalProperties: false, required: ["who", "what", "when"],
        properties: { who: { type: "string" }, what: { type: "string" }, when: { type: "string" } },
      },
    },
    upcomingDates: {
      type: "array",
      items: {
        type: "object", additionalProperties: false, required: ["date", "text"],
        properties: { date: { type: "string", description: "Short, e.g. 'Dec 17' or 'Dec 17, 2026'" }, text: { type: "string" } },
      },
    },
    goodOfTheLeague: { type: "string" },
    adjournment: { type: "string" },
    scuttlebuttRecap: { type: "string", description: "A warm 120-180 word recap written for the newsletter, in the detachment's voice" },
    unclear: { type: "array", items: { type: "string" }, description: "Names, numbers, or decisions the recording left ambiguous and the Adjutant should confirm" },
  },
} as const;

const SYSTEM = `You are the recording secretary for ${site.name}, ${site.org} (${site.nickname}). You turn a transcript of a monthly detachment meeting into accurate, complete minutes.

Rules:
- Record only what the transcript supports. Never invent names, dollar amounts, dates, or vote results. If something is unclear, say so in the "unclear" list rather than guessing.
- Speech-to-text often garbles names and numbers. Known officers: ${site.officers.map((o) => `${o.role} ${o.name}`).join("; ")}. Prefer these spellings when the transcript is close.
- Use Marine Corps League terms (Commandant, Paymaster, Adjutant, Judge Advocate, Sergeant-at-Arms, Chaplain, Devil Dogs, Honor Guard, Color Guard, Young Marines, Toys for Tots, Scuttlebutt).
- Be thorough: every report, decision, dollar figure, date, and assignment should appear somewhere. Use plain, direct sentences.
- Attribute statements to speakers when the transcript identifies them; otherwise describe them neutrally ("a member asked...").
- Dates: the meeting is normally the ${site.meeting.schedule} at ${site.meeting.venue}.`;

export function readKey(name: string): string {
  try {
    return localStorage.getItem(name) ?? "";
  } catch {
    return "";
  }
}

export function writeKey(name: string, value: string) {
  try {
    if (value) localStorage.setItem(name, value);
    else localStorage.removeItem(name);
  } catch {
    /* ignore */
  }
}

export type TranscriptResult = { text: string; durationSec: number };

/** Speech-to-text via Deepgram's pre-recorded endpoint, with speaker labels. */
export async function transcribe(file: Blob, key: string, signal?: AbortSignal): Promise<TranscriptResult> {
  const params = new URLSearchParams({
    model: "nova-3",
    smart_format: "true",
    punctuate: "true",
    diarize: "true",
    paragraphs: "true",
    language: "en-US",
  });
  const res = await fetch(`https://api.deepgram.com/v1/listen?${params}`, {
    method: "POST",
    headers: { Authorization: `Token ${key}`, "Content-Type": file.type || "application/octet-stream" },
    body: file,
    signal,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Deepgram ${res.status}: ${body.slice(0, 200) || res.statusText}`);
  }
  const json = (await res.json()) as {
    metadata?: { duration?: number };
    results?: { channels?: { alternatives?: { transcript?: string; paragraphs?: { transcript?: string } }[] }[] };
  };
  const alt = json.results?.channels?.[0]?.alternatives?.[0];
  const text = (alt?.paragraphs?.transcript || alt?.transcript || "").trim();
  if (!text) throw new Error("Deepgram returned an empty transcript. Was the recording audible?");
  return { text, durationSec: json.metadata?.duration ?? 0 };
}

/** Transcript -> structured minutes via Claude. */
export async function draftMinutes(
  transcript: string,
  key: string,
  opts: { meetingDate?: string; notes?: string; onProgress?: (chars: number) => void; signal?: AbortSignal } = {}
): Promise<Minutes> {
  const client = new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true });
  const user = [
    opts.meetingDate ? `Meeting date (from the officer): ${opts.meetingDate}` : "",
    opts.notes ? `Officer's notes to consider: ${opts.notes}` : "",
    "Transcript (speaker labels are automatic and may be wrong):",
    "<transcript>",
    transcript,
    "</transcript>",
    "Produce the minutes as JSON matching the schema.",
  ]
    .filter(Boolean)
    .join("\n\n");

  const stream = client.beta.messages.stream(
    {
      model: "claude-opus-5-5",
      max_tokens: 32000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      output_config: { effort: "high", format: { type: "json_schema", schema: minutesSchema } },
      messages: [{ role: "user", content: user }],
    },
    { signal: opts.signal }
  );
  let chars = 0;
  stream.on("text", (t) => {
    chars += t.length;
    opts.onProgress?.(chars);
  });
  const msg = await stream.finalMessage();
  if (msg.stop_reason === "refusal") throw new Error("The model declined this request. Try again or shorten the transcript.");
  if (msg.stop_reason === "max_tokens") throw new Error("The minutes were cut off. Try a shorter recording.");
  const text = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  return JSON.parse(text) as Minutes;
}

/** Plain-text rendering for copy, download, and email. */
export function minutesToText(m: Minutes): string {
  const list = (items: string[]) => (items.length ? items.map((i) => `- ${i}`).join("\n") : "- None recorded");
  const lines = [
    `${m.meetingTitle || `${site.name} Meeting Minutes`}`,
    `Date: ${m.meetingDate}`,
    "",
    "SUMMARY",
    m.summary,
    "",
    "CALL TO ORDER",
    m.callToOrder,
    "",
    "ATTENDANCE",
    m.attendance,
    "",
    "MINUTES OF THE PREVIOUS MEETING",
    m.previousMinutes,
    "",
    "PAYMASTER REPORT",
    m.paymasterReport,
    "",
    "OFFICER AND COMMITTEE REPORTS",
    list(m.officerAndCommitteeReports),
    "",
    "OLD BUSINESS",
    list(m.oldBusiness),
    "",
    "NEW BUSINESS",
    list(m.newBusiness),
    "",
    "MOTIONS",
    m.motions.length
      ? m.motions.map((x) => `- ${x.motion} (moved: ${x.movedBy}; seconded: ${x.secondedBy}; result: ${x.result})`).join("\n")
      : "- None recorded",
    "",
    "ACTION ITEMS",
    m.actionItems.length ? m.actionItems.map((a) => `- ${a.who}: ${a.what} (${a.when})`).join("\n") : "- None recorded",
    "",
    "UPCOMING DATES",
    m.upcomingDates.length ? m.upcomingDates.map((d) => `- ${d.date}: ${d.text}`).join("\n") : "- None recorded",
    "",
    "GOOD OF THE LEAGUE",
    m.goodOfTheLeague,
    "",
    "ADJOURNMENT",
    m.adjournment,
    "",
    "TO CONFIRM (unclear in the recording)",
    list(m.unclear),
    "",
    "SCUTTLEBUTT RECAP",
    m.scuttlebuttRecap,
  ];
  return lines.join("\n");
}

export function fmtDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return m ? `${m} min ${s} s` : `${s} s`;
}
