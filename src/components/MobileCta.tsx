"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Phone-only sticky bar with the two actions that matter most: join and
 * meeting info. Slides in once the visitor has scrolled past the hero, and
 * stays off the Join and Events pages themselves.
 */
export default function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/get-involved" || pathname === "/events" || pathname === "/contact") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-navy/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <Link
          href="/get-involved"
          className="flex-1 rounded-sm bg-gold py-3 text-center font-display text-sm font-semibold tracking-wide uppercase text-navy"
        >
          Join the League
        </Link>
        <Link
          href="/events"
          className="flex-1 rounded-sm border-2 border-cream/70 py-3 text-center font-display text-sm font-semibold tracking-wide uppercase text-cream"
        >
          Meetings
        </Link>
      </div>
    </div>
  );
}
