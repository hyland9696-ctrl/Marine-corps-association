"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-navy-light">
            <span className="font-display text-lg font-bold text-gold">725</span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold tracking-wide uppercase sm:text-lg">
              {site.name}
            </span>
            <span className="text-xs text-gold-light">{site.org}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-medium tracking-wide uppercase text-cream/90 transition hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-involved"
            className="rounded-sm bg-scarlet px-4 py-2 font-display text-sm font-semibold tracking-wide uppercase text-cream transition hover:bg-scarlet-light"
          >
            Join
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-cream transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-cream transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-cream transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-gold/20 px-4 pb-4 lg:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2 font-display text-sm font-medium tracking-wide uppercase text-cream/90 hover:bg-navy-light hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-involved"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-sm bg-scarlet px-4 py-2 text-center font-display text-sm font-semibold tracking-wide uppercase text-cream"
          >
            Join
          </Link>
        </nav>
      )}
    </header>
  );
}
