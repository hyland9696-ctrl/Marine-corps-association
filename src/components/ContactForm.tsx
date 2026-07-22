"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-sm border border-navy/15 bg-white px-4 py-2.5 text-navy placeholder-navy/40 outline-none transition focus:border-scarlet focus:ring-2 focus:ring-gold/40";
const labelClass =
  "block font-display text-sm font-semibold uppercase tracking-wide text-navy";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

export default function ContactForm({
  endpoint,
  email,
  phone,
}: {
  endpoint: string;
  email: string;
  phone: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // No delivery endpoint configured yet — guide people to email/phone
    // instead of pretending the message went through.
    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-navy/10 bg-white p-6 text-navy/80"
      >
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
          Message Sent
        </h3>
        <p className="mt-3">
          Thanks for reaching out. A member of the detachment will get back to you soon.
          Semper Fi.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 font-display text-sm font-semibold uppercase tracking-wide text-scarlet hover:text-scarlet-light"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people, catches bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${inputClass}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="cf-subject"
          name="subject"
          type="text"
          className={`mt-2 ${inputClass}`}
          placeholder="Membership, events, general question…"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          className={`mt-2 ${inputClass} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-scarlet px-6 py-3 font-display text-sm font-semibold tracking-wide text-cream uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-scarlet-light hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>

        <p aria-live="polite" className="text-sm">
          {status === "error" && (
            <span className="text-scarlet">
              Something went wrong. Please email{" "}
              <a href={`mailto:${email}`} className="underline">
                {email}
              </a>{" "}
              or call {phone}.
            </span>
          )}
          {status === "unconfigured" && (
            <span className="text-navy/70">
              Our online form isn&rsquo;t connected yet. Please email{" "}
              <a href={`mailto:${email}`} className="text-scarlet underline">
                {email}
              </a>{" "}
              or call {phone}.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
