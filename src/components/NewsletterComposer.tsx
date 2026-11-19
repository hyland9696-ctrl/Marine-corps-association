"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { nextMeeting } from "@/lib/meeting";
import {
  buildNewsletterHtml,
  photosSectionHtml,
  newsletterDefaults,
  type NewsletterContent,
  type EventItem,
} from "@/lib/newsletterTemplate";

function useCopy(): [boolean, (t: string) => void] {
  const [copied, setCopied] = useState(false);
  return [
    copied,
    (t: string) => {
      try {
        navigator.clipboard.writeText(t);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch {
        /* ignore */
      }
    },
  ];
}

const DRAFT_KEY = "mcl725-scuttlebutt-draft";
const SECRET_KEY = "mcl725-send-secret";

type Photo = { name: string; type: string; data: string }; // data = base64, no prefix

const fmtDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtIssue = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

// Second Monday of the next month that is still ahead (staff meeting).
function nextStaffMeeting(now = new Date()): Date {
  const second = (y: number, m: number) => {
    const d = new Date(y, m, 1, 19, 0, 0, 0);
    d.setDate(1 + ((1 - d.getDay() + 7) % 7) + 7);
    return d;
  };
  let d = second(now.getFullYear(), now.getMonth());
  if (d.getTime() < now.getTime()) d = second(now.getFullYear(), now.getMonth() + 1);
  return d;
}

// Shrink a photo in the browser so the email stays light (max 1200px, JPEG).
function resizeImage(file: File): Promise<Photo> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1200;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
      resolve({ name: file.name.replace(/\.[^.]+$/, "") + ".jpg", type: "image/jpeg", data: dataUrl.split(",")[1] });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read " + file.name));
    };
    img.src = url;
  });
}

function readDraft(): { subject?: string; c?: NewsletterContent } | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as { subject?: string; c?: NewsletterContent }) : null;
  } catch {
    return null;
  }
}

type SendState =
  | { kind: "idle" }
  | { kind: "sending"; mode: "test" | "all" }
  | { kind: "done"; text: string }
  | { kind: "error"; text: string };

const labelCls = "block font-display text-xs font-semibold uppercase tracking-wide text-gold";
const inputCls =
  "mt-1 w-full rounded-sm border border-cream/15 bg-navy px-3 py-2 text-sm text-cream placeholder-cream/30 outline-none focus:border-gold/60";

export default function NewsletterComposer() {
  const now = useMemo(() => new Date(), []);
  const prefilled = useMemo<NewsletterContent>(
    () => ({
      ...newsletterDefaults,
      issue: fmtIssue.format(now),
      nextDetachmentMeeting: fmtDate.format(nextMeeting(now)),
      nextStaffMeeting: fmtDate.format(nextStaffMeeting(now)),
    }),
    [now]
  );
  // Drafts live in this browser only; read them once, lazily, so the first
  // render already has them (no setState-in-effect, no flash of defaults).
  const [subject, setSubject] = useState(() => readDraft()?.subject ?? `The Scuttlebutt — ${fmtIssue.format(new Date())}`);
  const [c, setC] = useState<NewsletterContent>(() => readDraft()?.c ?? prefilled);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [secret, setSecret] = useState(() => {
    try {
      return localStorage.getItem(SECRET_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [testTo, setTestTo] = useState("");
  const [send, setSend] = useState<SendState>({ kind: "idle" });
  const [stats, setStats] = useState<{ subscribers: number; quota: number; last: { at: string; subject: string; sent: number } | null } | null>(null);
  const [copiedSubject, copySubject] = useCopy();
  const [copiedHtml, copyHtml] = useCopy();
  const endpoint = site.newsletterEndpoint;

  // Autosave the draft (not the photos) as you type.
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ subject, c }));
    } catch {
      /* ignore */
    }
  }, [subject, c]);

  useEffect(() => {
    try {
      if (secret) localStorage.setItem(SECRET_KEY, secret);
      else localStorage.removeItem(SECRET_KEY);
    } catch {
      /* ignore */
    }
  }, [secret]);

  async function callEngine(body: Record<string, unknown>) {
    // text/plain keeps this a "simple" request, which Apps Script answers
    // without a CORS preflight.
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...body, secret }),
      redirect: "follow",
    });
    return (await res.json()) as Record<string, unknown>;
  }

  async function loadStats() {
    if (!endpoint || !secret) return;
    try {
      const r = await callEngine({ action: "stats" });
      if (r.ok) setStats(r as unknown as typeof stats);
      else setStats(null);
    } catch {
      setStats(null);
    }
  }

  async function doSend(mode: "test" | "all") {
    if (!endpoint) {
      setSend({ kind: "error", text: "The send engine isn't connected yet (newsletterEndpoint is empty)." });
      return;
    }
    if (!secret) {
      setSend({ kind: "error", text: "Enter the send secret first (set it in the Google Sheet menu)." });
      return;
    }
    if (mode === "all") {
      const n = stats?.subscribers ?? "all";
      if (!window.confirm(`Send "${subject}" to ${n} subscribers now? This cannot be undone.`)) return;
    }
    setSend({ kind: "sending", mode });
    try {
      const r = await callEngine({ action: "send", mode, subject, html: rawHtml, photos, testTo });
      if (!r.ok) {
        setSend({ kind: "error", text: r.error === "bad_secret" ? "Send secret didn't match." : `Send failed (${String(r.error)}).` });
        return;
      }
      const note = r.note ? ` ${String(r.note)}` : "";
      setSend({
        kind: "done",
        text: mode === "test" ? `Test sent to ${testTo || "your Gmail"}. Check your inbox.` : `Sent to ${r.sent} of ${r.recipients} subscribers.${note}`,
      });
      if (mode === "all") {
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {
          /* ignore */
        }
      }
      loadStats();
    } catch {
      setSend({ kind: "error", text: "Couldn't reach the send engine. Check the Web App URL and that it's deployed to Anyone." });
    }
  }

  async function addPhotos(files: FileList | null) {
    if (!files) return;
    const picked = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, 8 - photos.length);
    const resized = await Promise.all(picked.map((f) => resizeImage(f).catch(() => null)));
    setPhotos((prev) => [...prev, ...resized.filter((p): p is Photo => p !== null)]);
  }

  const set = <K extends keyof NewsletterContent>(key: K, val: NewsletterContent[K]) =>
    setC((prev) => ({ ...prev, [key]: val }));

  const setEvent = (i: number, patch: Partial<EventItem>) =>
    setC((prev) => ({ ...prev, events: prev.events.map((e, j) => (j === i ? { ...e, ...patch } : e)) }));

  const rawHtml = buildNewsletterHtml(c);
  const previewHtml = rawHtml
    .replace("{{PHOTOS}}", photosSectionHtml(photos.map((p) => `data:${p.type};base64,${p.data}`)))
    .replace(/{{\s*UNSUBSCRIBE\s*}}/g, "#")
    .replace(/{{\s*NAME\s*}}/g, "Marine");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nlc-issue" className={labelCls}>Issue (month & year)</label>
            <input id="nlc-issue" className={inputCls} value={c.issue} onChange={(e) => set("issue", e.target.value)} />
          </div>
          <div>
            <label htmlFor="nlc-subject" className={labelCls}>Subject line</label>
            <input id="nlc-subject" className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="nlc-etitle" className={labelCls}>Editor column — heading</label>
          <input id="nlc-etitle" className={inputCls} value={c.editorTitle} onChange={(e) => set("editorTitle", e.target.value)} />
        </div>
        <div>
          <label htmlFor="nlc-ecol" className={labelCls}>Editor column — body</label>
          <textarea id="nlc-ecol" className={inputCls} rows={6} value={c.editorColumn} onChange={(e) => set("editorColumn", e.target.value)} />
        </div>
        <div>
          <label htmlFor="nlc-signed" className={labelCls}>Signed</label>
          <input id="nlc-signed" className={inputCls} value={c.editorName} onChange={(e) => set("editorName", e.target.value)} />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className={labelCls}>Upcoming Events</label>
            <button
              type="button"
              onClick={() => set("events", [...c.events, { date: "", text: "" }])}
              className="font-display text-xs font-semibold uppercase tracking-wide text-gold hover:text-gold-light"
            >
              + Add event
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {c.events.map((ev, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={inputCls + " mt-0 w-28 shrink-0"}
                  placeholder="Oct 17"
                  aria-label={`Event ${i + 1} date`}
                  value={ev.date}
                  onChange={(e) => setEvent(i, { date: e.target.value })}
                />
                <input
                  className={inputCls + " mt-0"}
                  placeholder="What's happening…"
                  aria-label={`Event ${i + 1} description`}
                  value={ev.text}
                  onChange={(e) => setEvent(i, { text: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => set("events", c.events.filter((_, j) => j !== i))}
                  className="shrink-0 rounded-sm border border-cream/15 px-2 text-sm text-cream/70 hover:border-scarlet hover:text-scarlet"
                  aria-label="Remove event"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nlc-nextdet" className={labelCls}>Next detachment meeting</label>
            <input id="nlc-nextdet" className={inputCls} value={c.nextDetachmentMeeting} onChange={(e) => set("nextDetachmentMeeting", e.target.value)} />
          </div>
          <div>
            <label htmlFor="nlc-nextstaff" className={labelCls}>Next staff meeting</label>
            <input id="nlc-nextstaff" className={inputCls} value={c.nextStaffMeeting} onChange={(e) => set("nextStaffMeeting", e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="nlc-good" className={labelCls}>Good of the League (optional)</label>
          <textarea id="nlc-good" className={inputCls} rows={2} value={c.goodOfLeague} onChange={(e) => set("goodOfLeague", e.target.value)} />
        </div>

        {/* Event photos */}
        <div>
          <label htmlFor="nlc-photos" className={labelCls}>Recent event photos</label>
          <div className="mt-2 rounded-sm border border-dashed border-gold/40 bg-navy p-3">
            <input
              id="nlc-photos"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => addPhotos(e.target.files)}
              className="block w-full text-xs text-cream/70 file:mr-3 file:rounded-sm file:border-0 file:bg-gold file:px-3 file:py-1.5 file:font-display file:text-xs file:font-semibold file:uppercase file:text-navy hover:file:bg-gold-light"
            />
            {photos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {photos.map((src, i) => (
                  <div key={i} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`data:${src.type};base64,${src.data}`} alt={`Photo ${i + 1}`} className="h-16 w-16 rounded-sm object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                      className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-scarlet text-xs text-cream"
                      aria-label={`Remove photo ${i + 1}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-cream/70">
              Up to 8 photos. They&rsquo;re resized here and embedded in the email when you hit
              send, so they show even where images are blocked.
            </p>
          </div>
        </div>

        <p className="text-xs text-cream/70">
          Issue, next-meeting dates, the officer roster, meeting schedule, and dues table are
          filled in automatically. Your draft autosaves in this browser.
        </p>

        {/* Send */}
        <div className="rounded-sm border border-gold/40 bg-navy p-4">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            Send
          </p>
          {!endpoint ? (
            <p className="mt-2 text-sm text-cream/80">
              The send engine isn&rsquo;t connected yet. Deploy the Google Apps Script (see
              newsletter-engine/README) and paste its Web App URL into <code>newsletterEndpoint</code>.
              Until then, use the copy buttons below and the sheet&rsquo;s menu.
            </p>
          ) : (
            <>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="nlc-secret" className={labelCls}>Send secret</label>
                  <input
                    id="nlc-secret"
                    type="password"
                    className={inputCls}
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    onBlur={loadStats}
                    placeholder="From the sheet menu: Set send secret"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="nlc-testto" className={labelCls}>Send test to</label>
                  <input
                    id="nlc-testto"
                    type="email"
                    className={inputCls}
                    value={testTo}
                    onChange={(e) => setTestTo(e.target.value)}
                    placeholder="Blank = the Gmail that runs the script"
                  />
                </div>
              </div>
              {stats && (
                <p className="mt-3 text-xs text-cream/70">
                  <strong className="text-cream">{stats.subscribers}</strong> subscribers · Gmail can send{" "}
                  <strong className="text-cream">{stats.quota}</strong> more today
                  {stats.last ? ` · last send: ${stats.last.subject} (${stats.last.sent} delivered)` : ""}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={send.kind === "sending"}
                  onClick={() => doSend("test")}
                  className="rounded-sm border border-gold/50 px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-gold transition hover:bg-gold hover:text-navy disabled:opacity-50"
                >
                  {send.kind === "sending" && send.mode === "test" ? "Sending…" : "Send test to me"}
                </button>
                <button
                  type="button"
                  disabled={send.kind === "sending"}
                  onClick={() => doSend("all")}
                  className="rounded-sm bg-scarlet px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-scarlet-light disabled:opacity-50"
                >
                  {send.kind === "sending" && send.mode === "all" ? "Sending…" : "Send to all subscribers"}
                </button>
              </div>
              {send.kind === "done" && <p className="mt-3 text-sm text-gold-light">{send.text}</p>}
              {send.kind === "error" && <p className="mt-3 text-sm text-scarlet-light">{send.text}</p>}
            </>
          )}
        </div>

        <details className="text-xs text-cream/70">
          <summary className="cursor-pointer font-display font-semibold uppercase tracking-wide text-gold/80">
            Manual fallback (copy &amp; paste into the sheet)
          </summary>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => copySubject(subject)}
              className="rounded-sm border border-gold/50 px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-gold transition hover:bg-gold hover:text-navy"
            >
              {copiedSubject ? "Copied ✓" : "Copy subject"}
            </button>
            <button
              type="button"
              onClick={() => copyHtml(rawHtml)}
              className="rounded-sm border border-cream/30 px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-cream hover:text-navy"
            >
              {copiedHtml ? "Copied ✓" : "Copy email HTML"}
            </button>
          </div>
          <p className="mt-2">
            Paste the subject into <strong>B1</strong> and the HTML into <strong>B2</strong> on the
            sheet&rsquo;s <em>Compose</em> tab, then use <strong>📣 Newsletter → Send</strong>.
          </p>
        </details>
        <button
          type="button"
          onClick={() => {
            setC(prefilled);
            setSubject(`The Scuttlebutt — ${fmtIssue.format(new Date())}`);
            setPhotos([]);
            setSend({ kind: "idle" });
          }}
          className="text-xs text-cream/60 underline hover:text-cream"
        >
          Start a fresh issue
        </button>
      </div>

      {/* Live preview */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-gold">
          Live preview
        </p>
        <div className="overflow-hidden rounded-sm border border-cream/15 bg-white">
          <iframe title="Newsletter preview" srcDoc={previewHtml} className="h-[620px] w-full" />
        </div>
      </div>
    </div>
  );
}
