"use client";

import { useEffect, useState } from "react";

const FOUNDED = 1775;

/** Days until the next Marine Corps Birthday (November 10) and which one it is. */
export default function BirthdayCountdown() {
  const [state, setState] = useState<{ days: number; nth: number } | null>(null);

  useEffect(() => {
    // Computed on the client so the day count matches the visitor's clock.
    const tick = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let bday = new Date(today.getFullYear(), 10, 10);
      if (bday.getTime() < today.getTime()) bday = new Date(today.getFullYear() + 1, 10, 10);
      const days = Math.round((bday.getTime() - today.getTime()) / 86_400_000);
      setState({ days, nth: bday.getFullYear() - FOUNDED });
    };
    const id = window.setTimeout(tick, 0);
    const daily = window.setInterval(tick, 3_600_000);
    return () => {
      window.clearTimeout(id);
      window.clearInterval(daily);
    };
  }, []);

  if (!state) return <div className="h-16" aria-hidden="true" />;

  const suffix = (n: number) => {
    const v = n % 100;
    if (v >= 11 && v <= 13) return "th";
    return ["th", "st", "nd", "rd"][n % 10] ?? "th";
  };

  return (
    <div>
      <p className="font-display text-4xl font-bold tabular-nums text-cream sm:text-5xl">
        {state.days === 0 ? "Today" : `${state.days} days`}
      </p>
      <p className="mt-1 text-sm text-cream/80">
        until the Corps&rsquo; {state.nth}
        {suffix(state.nth)} birthday on November 10
      </p>
    </div>
  );
}
