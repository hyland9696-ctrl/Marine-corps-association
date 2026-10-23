"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up from zero when it scrolls into view. Non-numeric values
 * (like "$1,200") render as-is. Reduced-motion users see the final value.
 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const [shown, setShown] = useState<string>(target === null ? value : "0");

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setShown(value);
          return;
        }
        const start = performance.now();
        const dur = 1400;
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(String(Math.round(target * eased)));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
