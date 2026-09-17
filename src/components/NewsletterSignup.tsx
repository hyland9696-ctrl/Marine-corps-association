"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

export default function NewsletterSignup({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }
    setStatus("submitting");
    try {
      // Apps Script web apps don't send CORS headers, so we fire-and-forget
      // with a simple form-encoded POST and show optimistic success.
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-sm text-navy/80">
        🎖️ You&rsquo;re on the list — thanks for subscribing. Semper Fi.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="nl-email">
          Email address
        </label>
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-sm border border-navy/15 bg-white px-3 py-2 text-sm text-navy placeholder-navy/40 outline-none focus:border-scarlet focus:ring-2 focus:ring-gold/40"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 rounded-sm bg-scarlet px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-scarlet-light disabled:opacity-60"
        >
          {status === "submitting" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm text-scarlet">Something went wrong — please try again.</p>
      )}
      {status === "unconfigured" && (
        <p className="text-sm text-navy/60">
          Newsletter signup isn&rsquo;t connected yet. Email{" "}
          <a href={`mailto:${site.contacts.editor.email}`} className="text-scarlet underline">
            {site.contacts.editor.email}
          </a>{" "}
          to be added.
        </p>
      )}
    </form>
  );
}
