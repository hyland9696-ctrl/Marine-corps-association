"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import {
  KEYS,
  draftMinutes,
  fmtDuration,
  minutesToText,
  readKey,
  transcribe,
  writeKey,
  type Minutes,
} from "@/lib/minutes";

const DRAFT_KEY = "mcl725-scuttlebutt-draft";

type Stage =
  | { kind: "idle" }
  | { kind: "transcribing" }
  | { kind: "drafting"; chars: number }
  | { kind: "error"; text: string };

const label = "block font-display text-xs font-semibold uppercase tracking-wide text-gold";
const input =
  "mt-1 w-full rounded-sm border border-cream/15 bg-navy px-3 py-2 text-sm text-cream placeholder-cream/30 outline-none focus:border-gold/60";
const btnGold =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-navy transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50";
const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-sm border border-cream/25 px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cream transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50";

function readLast(): { minutes: Minutes; transcript: string; at: string } | null {
  try {
    const raw = localStorage.getItem(KEYS.lastMinutes);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function fmtClock(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function MeetingMinutes() {
  const [dgKey, setDgKey] = useState(() => readKey(KEYS.deepgram));
  const [aiKey, setAiKey] = useState(() => readKey(KEYS.anthropic));
  const [showKeys, setShowKeys] = useState(() => !readKey(KEYS.deepgram) || !readKey(KEYS.anthropic));
  const [file, setFile] = useState<File | Blob | null>(null);
  const [fileName, setFileName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [notes, setNotes] = useState("");
  const [stage, setStage] = useState<Stage>({ kind: "idle" });
  const [transcript, setTranscript] = useState(() => readLast()?.transcript ?? "");
  const [duration, setDuration] = useState(0);
  const [minutes, setMinutes] = useState<Minutes | null>(() => readLast()?.minutes ?? null);
  const [text, setText] = useState(() => {
    const m = readLast()?.minutes;
    return m ? minutesToText(m) : "";
  });
  const [copied, setCopied] = useState(false);
  const [pushed, setPushed] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // In-browser recording (phone or laptop mic).
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => writeKey(KEYS.deepgram, dgKey.trim()), [dgKey]);
  useEffect(() => writeKey(KEYS.anthropic, aiKey.trim()), [aiKey]);

  const ready = !!dgKey.trim() && !!aiKey.trim();
  const busy = stage.kind === "transcribing" || stage.kind === "drafting";

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((m) =>
        typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m)
      );
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        const ext = (rec.mimeType || "audio/webm").includes("mp4") ? "m4a" : (rec.mimeType || "").includes("ogg") ? "ogg" : "webm";
        setFile(blob);
        setFileName(`meeting-${new Date().toISOString().slice(0, 10)}.${ext}`);
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start(1000);
      recRef.current = rec;
      setElapsed(0);
      setRecording(true);
      timerRef.current = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    } catch {
      setStage({ kind: "error", text: "Microphone access was blocked. Allow the mic for this site, or upload a recording instead." });
    }
  }

  function stopRecording() {
    recRef.current?.stop();
    recRef.current = null;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setRecording(false);
  }

  async function run() {
    if (!file || !ready) return;
    const ac = new AbortController();
    abortRef.current = ac;
    setMinutes(null);
    setText("");
    setPushed(false);
    try {
      setStage({ kind: "transcribing" });
      const t = await transcribe(file, dgKey.trim(), ac.signal);
      setTranscript(t.text);
      setDuration(t.durationSec);
      setStage({ kind: "drafting", chars: 0 });
      const m = await draftMinutes(t.text, aiKey.trim(), {
        meetingDate: meetingDate || undefined,
        notes: notes || undefined,
        signal: ac.signal,
        onProgress: (chars) => setStage({ kind: "drafting", chars }),
      });
      setMinutes(m);
      setText(minutesToText(m));
      setStage({ kind: "idle" });
      try {
        localStorage.setItem(KEYS.lastMinutes, JSON.stringify({ minutes: m, transcript: t.text, at: new Date().toISOString() }));
      } catch {
        /* ignore */
      }
    } catch (err) {
      if (ac.signal.aborted) setStage({ kind: "idle" });
      else setStage({ kind: "error", text: err instanceof Error ? err.message : String(err) });
    }
  }

  function cancel() {
    abortRef.current?.abort();
  }

  function copyAll() {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  function download() {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `minutes-${(minutes?.meetingDate || meetingDate || new Date().toISOString().slice(0, 10)).replace(/[^\w-]+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /** Push the recap and upcoming dates into the Scuttlebutt composer draft. */
  function pushToNewsletter() {
    if (!minutes) return;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      const draft = raw ? JSON.parse(raw) : {};
      const c = draft.c ?? {};
      const existing: { date: string; text: string }[] = Array.isArray(c.events) ? c.events : [];
      const merged = [...existing];
      for (const d of minutes.upcomingDates) {
        if (!merged.some((e) => e.date === d.date && e.text === d.text)) merged.push(d);
      }
      c.events = merged;
      c.goodOfLeague = [c.goodOfLeague, minutes.scuttlebuttRecap].filter(Boolean).join("\n\n");
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, c }));
      setPushed(true);
    } catch {
      /* ignore */
    }
  }

  const mailto = minutes
    ? `mailto:${site.contacts.editor.email}?subject=${encodeURIComponent(`Meeting minutes, ${minutes.meetingDate}`)}&body=${encodeURIComponent(text.slice(0, 1800) + (text.length > 1800 ? "\n\n(Full minutes attached separately.)" : ""))}`
    : "";

  return (
    <div className="space-y-6">
      {/* Keys */}
      <details open={showKeys} onToggle={(e) => setShowKeys((e.target as HTMLDetailsElement).open)} className="rounded-sm border border-cream/10 bg-navy p-4">
        <summary className="cursor-pointer font-display text-xs font-semibold uppercase tracking-wide text-gold">
          Setup: API keys {ready ? "✓" : "(needed once per browser)"}
        </summary>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Deepgram key (speech to text)</span>
            <input className={input} type="password" value={dgKey} onChange={(e) => setDgKey(e.target.value)} placeholder="Paste key" autoComplete="off" />
            <span className="mt-1 block text-xs text-cream/50">
              Free account at{" "}
              <a href="https://console.deepgram.com/signup" target="_blank" rel="noopener noreferrer" className="underline">
                console.deepgram.com
              </a>
              , then API Keys. About 25 cents per hour of audio.
            </span>
          </label>
          <label className="block">
            <span className={label}>Anthropic key (writes the minutes)</span>
            <input className={input} type="password" value={aiKey} onChange={(e) => setAiKey(e.target.value)} placeholder="Paste key" autoComplete="off" />
            <span className="mt-1 block text-xs text-cream/50">
              Create at{" "}
              <a href="https://platform.claude.com/" target="_blank" rel="noopener noreferrer" className="underline">
                platform.claude.com
              </a>
              , API Keys. About 10 to 30 cents per meeting.
            </span>
          </label>
        </div>
        <p className="mt-3 text-xs text-cream/50">
          Keys stay in this browser only. The audio goes to Deepgram and the transcript to Anthropic
          to be processed; neither is stored on the website. Announce at the start of each meeting
          that it is being recorded.
        </p>
      </details>

      {/* Input */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-sm border border-cream/10 bg-navy p-4">
          <p className={label}>1. Record here</p>
          <div className="mt-3 flex items-center gap-4">
            {recording ? (
              <button type="button" onClick={stopRecording} className="inline-flex items-center gap-2 rounded-sm bg-scarlet px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cream">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cream" /> Stop · {fmtClock(elapsed)}
              </button>
            ) : (
              <button type="button" onClick={startRecording} disabled={busy} className={btnOutline}>
                <span className="h-2.5 w-2.5 rounded-full bg-scarlet" /> Start recording
              </button>
            )}
            <span className="text-xs text-cream/50">Set the phone near the Commandant. Keep the screen awake.</span>
          </div>
        </div>
        <div className="rounded-sm border border-cream/10 bg-navy p-4">
          <p className={label}>or upload a recording</p>
          <input
            type="file"
            accept="audio/*,video/mp4,.m4a,.mp3,.wav,.webm,.ogg,.aac"
            disabled={busy || recording}
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setFile(f);
              setFileName(f?.name ?? "");
            }}
            className="mt-3 block w-full text-sm text-cream/70 file:mr-3 file:rounded-sm file:border-0 file:bg-gold file:px-3 file:py-1.5 file:font-display file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-navy"
          />
          <p className="mt-2 text-xs text-cream/50">Voice Memos (iPhone), Recorder (Android), or any .m4a / .mp3 / .wav file. Up to about 2 hours.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Meeting date (optional)</span>
          <input className={input} value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} placeholder="e.g. Dec 17, 2026" />
        </label>
        <label className="block">
          <span className={label}>Notes for the writer (optional)</span>
          <input className={input} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Guest speaker was from Focus Marines; vote on BBQ date passed" />
        </label>
      </div>

      {/* Run */}
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={run} disabled={!file || !ready || busy || recording} className={btnGold}>
          2. Transcribe and write minutes
        </button>
        {busy && (
          <button type="button" onClick={cancel} className={btnOutline}>
            Cancel
          </button>
        )}
        {fileName && !busy && <span className="text-xs text-cream/60">Ready: {fileName}</span>}
        {!ready && <span className="text-xs text-gold/80">Add both keys above first.</span>}
      </div>

      {stage.kind === "transcribing" && (
        <Progress text="Transcribing the recording. A one-hour meeting takes about a minute." />
      )}
      {stage.kind === "drafting" && (
        <Progress text={`Writing the minutes${stage.chars ? ` (${stage.chars.toLocaleString()} characters so far)` : ""}. Usually 1 to 3 minutes.`} />
      )}
      {stage.kind === "error" && (
        <div className="rounded-sm border border-scarlet/50 bg-scarlet/10 px-4 py-3 text-sm text-cream/85">{stage.text}</div>
      )}

      {/* Output */}
      {minutes && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Stat label="Recording" value={duration ? fmtDuration(duration) : "from file"} />
            <Stat label="Motions" value={String(minutes.motions.length)} />
            <Stat label="Action items" value={String(minutes.actionItems.length)} />
          </div>

          {minutes.unclear.length > 0 && (
            <div className="rounded-sm border border-gold/40 bg-gold/5 p-4 text-sm">
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-gold">Confirm before filing</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-cream/80">
                {minutes.unclear.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            <Section title="Summary" body={minutes.summary} />
            <Section title="Scuttlebutt recap" body={minutes.scuttlebuttRecap} />
          </div>

          {minutes.motions.length > 0 && (
            <div className="overflow-x-auto rounded-sm border border-cream/10 bg-navy">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy-light/60 font-display text-xs uppercase tracking-wide text-gold">
                  <tr>
                    <th className="px-3 py-2">Motion</th>
                    <th className="px-3 py-2">Moved</th>
                    <th className="px-3 py-2">Seconded</th>
                    <th className="px-3 py-2">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/10 text-cream/80">
                  {minutes.motions.map((m, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2">{m.motion}</td>
                      <td className="px-3 py-2">{m.movedBy}</td>
                      <td className="px-3 py-2">{m.secondedBy}</td>
                      <td className="px-3 py-2">{m.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {minutes.actionItems.length > 0 && (
            <div className="rounded-sm border border-cream/10 bg-navy p-4 text-sm">
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-gold">Action items</p>
              <ul className="mt-2 space-y-1 text-cream/80">
                {minutes.actionItems.map((a, i) => (
                  <li key={i}>
                    <strong className="text-cream">{a.who}</strong>: {a.what} <span className="text-cream/50">({a.when})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label className="block">
            <span className={label}>Full minutes (edit freely before filing)</span>
            <textarea className={`${input} min-h-[28rem] font-mono text-xs leading-relaxed`} value={text} onChange={(e) => setText(e.target.value)} />
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={copyAll} className={btnGold}>
              {copied ? "Copied ✓" : "Copy minutes"}
            </button>
            <button type="button" onClick={download} className={btnOutline}>
              Download .txt
            </button>
            <a href={mailto} className={btnOutline}>
              Email to {site.contacts.editor.name.split(" ")[0]}
            </a>
            <button type="button" onClick={pushToNewsletter} className={btnOutline} disabled={pushed}>
              {pushed ? "Added to newsletter draft ✓" : "Add recap and dates to newsletter"}
            </button>
          </div>

          <details className="rounded-sm border border-cream/10 bg-navy p-4">
            <summary className="cursor-pointer font-display text-xs font-semibold uppercase tracking-wide text-gold">Raw transcript</summary>
            <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-cream/70">{transcript}</pre>
          </details>
        </div>
      )}
    </div>
  );
}

function Progress({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-cream/80">
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      {text}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-cream/10 bg-navy p-4">
      <p className="font-display text-xs font-semibold uppercase tracking-wide text-gold">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-cream">{value}</p>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm border border-cream/10 bg-navy p-4 text-sm">
      <p className="font-display text-xs font-semibold uppercase tracking-wide text-gold">{title}</p>
      <p className="mt-2 whitespace-pre-wrap leading-relaxed text-cream/80">{body}</p>
    </div>
  );
}
