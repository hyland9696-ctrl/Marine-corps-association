"use client";

import { useEffect, useState } from "react";

/**
 * Share strip: native share sheet on phones, otherwise Facebook, X, email,
 * and copy-link. Builds its links from the page it's on.
 */
export default function ShareBar({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [canNative, setCanNative] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setUrl(window.location.href.split("#")[0]);
      setCanNative(typeof navigator.share === "function");
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const enc = encodeURIComponent;
  const btn =
    "inline-flex items-center gap-2 rounded-sm border border-navy/20 bg-white px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-scarlet hover:text-scarlet hover:shadow-md";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function native() {
    try {
      await navigator.share({ title, url });
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this page">
      <span className="mr-1 font-display text-xs font-semibold uppercase tracking-[0.15em] text-scarlet">
        Share
      </span>
      {canNative && (
        <button type="button" onClick={native} className={btn}>
          <Icon d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13" />
          Share
        </button>
      )}
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer">
        <Icon d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" />
        Facebook
      </a>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer">
        <Icon d="M4 4l16 16M20 4L4 20" />
        X
      </a>
      <a className={btn} href={`mailto:?subject=${enc(title)}&body=${enc(url)}`}>
        <Icon d="M3 6h18v12H3zM3 6l9 7 9-7" />
        Email
      </a>
      <button type="button" onClick={copy} className={btn}>
        <Icon d="M8 8h12v12H8zM4 16V4h12" />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
