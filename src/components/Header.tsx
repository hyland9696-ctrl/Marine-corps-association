"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b text-cream transition-all duration-300 ${
        scrolled
          ? "border-gold/30 bg-navy/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "border-gold/20 bg-navy"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-navy-light transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
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
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative py-1 font-display text-sm font-medium tracking-wide uppercase transition-colors ${
                  active ? "text-gold" : "text-cream/90 hover:text-gold"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/get-involved"
            className="group relative overflow-hidden rounded-sm bg-scarlet px-4 py-2 font-display text-sm font-semibold tracking-wide uppercase text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-scarlet-light hover:shadow-lg hover:shadow-scarlet/40"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative">Join</span>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-cream transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <nav
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-gold/20 px-4 pb-4">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-2 py-2 font-display text-sm font-medium tracking-wide uppercase transition-colors ${
                  active ? "bg-navy-light text-gold" : "text-cream/90 hover:bg-navy-light hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/get-involved"
            className="mt-2 rounded-sm bg-scarlet px-4 py-2 text-center font-display text-sm font-semibold tracking-wide uppercase text-cream transition-colors duration-300 hover:bg-scarlet-light"
          >
            Join
          </Link>
        </div>
      </nav>
    </header>
  );
}
