"use client";

import { useMemo, useState } from "react";
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

const labelCls = "block font-display text-xs font-semibold uppercase tracking-wide text-gold";
const inputCls =
  "mt-1 w-full rounded-sm border border-cream/15 bg-navy px-3 py-2 text-sm text-cream placeholder-cream/30 outline-none focus:border-gold/60";

export default function NewsletterComposer() {
  const [subject, setSubject] = useState("The Scuttlebutt — September 2026");
  const [c, setC] = useState<NewsletterContent>(newsletterDefaults);
  const [photos, setPhotos] = useState<string[]>([]);
  const [copiedSubject, copySubject] = useCopy();
  const [copiedHtml, copyHtml] = useCopy();

  function addPhotos(files: FileList | null) {
    if (!files) return;
    Array.from(files)
      .slice(0, 8)
      .forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = () => setPhotos((prev) => [...prev, String(reader.result)]);
        reader.readAsDataURL(file);
      });
  }

  const set = <K extends keyof NewsletterContent>(key: K, val: NewsletterContent[K]) =>
    setC((prev) => ({ ...prev, [key]: val }));

  const setEvent = (i: number, patch: Partial<EventItem>) =>
    setC((prev) => ({ ...prev, events: prev.events.map((e, j) => (j === i ? { ...e, ...patch } : e)) }));

  const rawHtml = useMemo(() => buildNewsletterHtml(c), [c]);
  const previewHtml = useMemo(
    () =>
      rawHtml
        .replace("{{PHOTOS}}", photosSectionHtml(photos))
        .replace(/{{\s*UNSUBSCRIBE\s*}}/g, "#")
        .replace(/{{\s*NAME\s*}}/g, "Marine"),
    [rawHtml, photos]
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

        {/* Event photos */}
        <div>
          <label className={labelCls}>Recent event photos</label>
          <div className="mt-2 rounded-sm border border-dashed border-gold/40 bg-navy p-3">
            <input
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
                    <img src={src} alt="" className="h-16 w-16 rounded-sm object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                      className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-scarlet text-xs text-cream"
                      aria-label="Remove photo"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-cream/50">
              These are a <strong>preview</strong> so you can see the layout. To actually send them,
              drop the same photos into your Google Drive{" "}
              <strong>&ldquo;Scuttlebutt Photos&rdquo;</strong> folder — the send engine embeds them
              automatically. (Menu: <strong>📣 Newsletter → Open Photos Folder</strong>.)
            </p>
          </div>
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
