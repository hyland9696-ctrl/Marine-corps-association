"use client";

import { useMemo, useState } from "react";
import {
  buildNewsletterHtml,
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

const labelCls = "block font-display text-xs font-semibold uppercase tracking-wide text-gold";
const inputCls =
  "mt-1 w-full rounded-sm border border-cream/15 bg-navy px-3 py-2 text-sm text-cream placeholder-cream/30 outline-none focus:border-gold/60";

export default function NewsletterComposer() {
  const [subject, setSubject] = useState("The Scuttlebutt — September 2026");
  const [c, setC] = useState<NewsletterContent>(newsletterDefaults);
  const [copiedSubject, copySubject] = useCopy();
  const [copiedHtml, copyHtml] = useCopy();

  const set = <K extends keyof NewsletterContent>(key: K, val: NewsletterContent[K]) =>
    setC((prev) => ({ ...prev, [key]: val }));

  const setEvent = (i: number, patch: Partial<EventItem>) =>
    setC((prev) => ({ ...prev, events: prev.events.map((e, j) => (j === i ? { ...e, ...patch } : e)) }));

  const rawHtml = useMemo(() => buildNewsletterHtml(c), [c]);
  const previewHtml = useMemo(
    () => rawHtml.replace(/{{\s*UNSUBSCRIBE\s*}}/g, "#").replace(/{{\s*NAME\s*}}/g, "Marine"),
    [rawHtml]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Issue (month & year)</label>
            <input className={inputCls} value={c.issue} onChange={(e) => set("issue", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Subject line</label>
            <input className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Editor column — heading</label>
          <input className={inputCls} value={c.editorTitle} onChange={(e) => set("editorTitle", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Editor column — body</label>
          <textarea className={inputCls} rows={6} value={c.editorColumn} onChange={(e) => set("editorColumn", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Signed</label>
          <input className={inputCls} value={c.editorName} onChange={(e) => set("editorName", e.target.value)} />
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
                  value={ev.date}
                  onChange={(e) => setEvent(i, { date: e.target.value })}
                />
                <input
                  className={inputCls + " mt-0"}
                  placeholder="What's happening…"
                  value={ev.text}
                  onChange={(e) => setEvent(i, { text: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => set("events", c.events.filter((_, j) => j !== i))}
                  className="shrink-0 rounded-sm border border-cream/15 px-2 text-sm text-cream/50 hover:border-scarlet hover:text-scarlet"
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
            <label className={labelCls}>Next detachment meeting</label>
            <input className={inputCls} value={c.nextDetachmentMeeting} onChange={(e) => set("nextDetachmentMeeting", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Next staff meeting</label>
            <input className={inputCls} value={c.nextStaffMeeting} onChange={(e) => set("nextStaffMeeting", e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Good of the League (optional)</label>
          <textarea className={inputCls} rows={2} value={c.goodOfLeague} onChange={(e) => set("goodOfLeague", e.target.value)} />
        </div>

        <p className="text-xs text-cream/50">
          The officer roster, meeting schedule, and dues table are built in automatically — you only
          edit the parts that change each month.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
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
            className="rounded-sm bg-scarlet px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-scarlet-light"
          >
            {copiedHtml ? "Copied ✓" : "Copy email HTML"}
          </button>
        </div>
        <p className="text-xs text-cream/50">
          Paste the subject into cell <strong>B1</strong> and the HTML into <strong>B2</strong> on
          your Google Sheet&rsquo;s <em>Compose</em> tab, then use its
          <strong> 📣 Newsletter → Send</strong> menu.
        </p>
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
