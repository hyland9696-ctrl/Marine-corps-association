"use client";

import { useMemo, useState } from "react";
import {
  buildNewsletterHtml,
  newsletterDefaults,
  type NewsletterContent,
  type Highlight,
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
  const [subject, setSubject] = useState("Detachment 725 — Monthly Update");
  const [c, setC] = useState<NewsletterContent>(newsletterDefaults);
  const [copiedSubject, copySubject] = useCopy();
  const [copiedHtml, copyHtml] = useCopy();

  const set = <K extends keyof NewsletterContent>(key: K, val: NewsletterContent[K]) =>
    setC((prev) => ({ ...prev, [key]: val }));

  const setHighlight = (i: number, patch: Partial<Highlight>) =>
    setC((prev) => ({
      ...prev,
      highlights: prev.highlights.map((h, j) => (j === i ? { ...h, ...patch } : h)),
    }));

  const rawHtml = useMemo(() => buildNewsletterHtml(c), [c]);
  const previewHtml = useMemo(
    () => rawHtml.replace(/{{\s*UNSUBSCRIBE\s*}}/g, "#").replace(/{{\s*NAME\s*}}/g, "Marine"),
    [rawHtml]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Subject line</label>
          <input className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Greeting</label>
          <input className={inputCls} value={c.greeting} onChange={(e) => set("greeting", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Intro</label>
          <textarea className={inputCls} rows={3} value={c.intro} onChange={(e) => set("intro", e.target.value)} />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className={labelCls}>Highlights</label>
            <button
              type="button"
              onClick={() => set("highlights", [...c.highlights, { title: "", body: "" }])}
              className="font-display text-xs font-semibold uppercase tracking-wide text-gold hover:text-gold-light"
            >
              + Add
            </button>
          </div>
          <div className="mt-2 space-y-3">
            {c.highlights.map((h, i) => (
              <div key={i} className="rounded-sm border border-cream/10 bg-navy p-3">
                <div className="flex gap-2">
                  <input
                    className={inputCls + " mt-0"}
                    placeholder="Title"
                    value={h.title}
                    onChange={(e) => setHighlight(i, { title: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => set("highlights", c.highlights.filter((_, j) => j !== i))}
                    className="shrink-0 rounded-sm border border-cream/15 px-2 text-sm text-cream/50 hover:border-scarlet hover:text-scarlet"
                    aria-label="Remove highlight"
                  >
                    ✕
                  </button>
                </div>
                <textarea
                  className={inputCls}
                  rows={2}
                  placeholder="What's happening…"
                  value={h.body}
                  onChange={(e) => setHighlight(i, { body: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Event title (optional)</label>
            <input className={inputCls} value={c.eventTitle} onChange={(e) => set("eventTitle", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Event details</label>
            <input className={inputCls} value={c.eventDetails} onChange={(e) => set("eventDetails", e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Closing</label>
          <textarea className={inputCls} rows={2} value={c.closing} onChange={(e) => set("closing", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Sign-off</label>
          <input className={inputCls} value={c.signoff} onChange={(e) => set("signoff", e.target.value)} />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
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
          your Google Sheet&rsquo;s <em>Compose</em> tab, then use the sheet&rsquo;s
          <strong> 📣 Newsletter → Send</strong> menu.
        </p>
      </div>

      {/* Live preview */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-gold">
          Live preview
        </p>
        <div className="overflow-hidden rounded-sm border border-cream/15 bg-white">
          <iframe title="Newsletter preview" srcDoc={previewHtml} className="h-[560px] w-full" />
        </div>
      </div>
    </div>
  );
}
