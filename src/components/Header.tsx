"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, type NavEntry, type NavLink } from "@/lib/site";

type NavGroup = { label: string; children: NavLink[] };

function isGroup(n: NavEntry): n is NavGroup {
  return "children" in n;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setOpenGroup(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close an open dropdown on outside click or Escape.
  useEffect(() => {
    if (!openGroup) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  const linkClass = (active: boolean) =>
    `group relative whitespace-nowrap py-1 font-display text-sm font-medium tracking-wide uppercase transition-colors ${
      active ? "text-gold" : "text-cream/90 hover:text-gold"
    }`;
  const underline = (active: boolean) => (
    <span
      className={`absolute -bottom-0.5 left-0 h-0.5 bg-gold transition-all duration-300 ${
        active ? "w-full" : "w-0 group-hover:w-full"
      }`}
    />
  );
  const menuItemClass = (active: boolean) =>
    `block rounded px-4 py-2 font-display text-sm font-medium tracking-wide uppercase transition-colors ${
      active ? "bg-navy-light text-gold" : "text-cream/90 hover:bg-navy-light hover:text-gold"
    }`;

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

        <nav ref={navRef} className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {site.nav.map((item) => {
            if (isGroup(item)) {
              const groupActive = item.children.some((c) => c.href === pathname);
              const isOpen = openGroup === item.label;
              return (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onClick={() => setOpenGroup(isOpen ? null : item.label)}
                    className={`${linkClass(groupActive)} flex items-center gap-1`}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {underline(groupActive)}
                  </button>
                  {isOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-3 w-60 rounded-sm border border-gold/30 bg-navy py-2 shadow-xl shadow-black/40"
                    >
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          role="menuitem"
                          aria-current={pathname === c.href ? "page" : undefined}
                          className={menuItemClass(pathname === c.href)}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
              >
                {item.label}
                {underline(active)}
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
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-cream transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <nav
        aria-label="Main"
        className={`overflow-hidden transition-all duration-300 ease-in-out xl:hidden ${
          open ? "max-h-[60rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-gold/20 px-4 pb-4">
          {site.nav.map((item) => {
            if (isGroup(item)) {
              return (
                <div key={item.label} className="mt-2">
                  <p className="px-2 pb-1 font-display text-xs font-semibold tracking-[0.15em] uppercase text-gold/80">
                    {item.label}
                  </p>
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      aria-current={pathname === c.href ? "page" : undefined}
                      className={menuItemClass(pathname === c.href)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              );
            }
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
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
