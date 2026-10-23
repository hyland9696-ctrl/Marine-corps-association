"use client";

import { useEffect, useState } from "react";
import { nextMeeting } from "@/lib/meeting";

const fmt = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

/**
 * Live countdown to the next detachment meeting. Renders nothing until
 * mounted so the server output never disagrees with the visitor's clock.
 */
export default function Countdown() {
  const [state, setState] = useState<{ days: number; hours: number; mins: number; label: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const target = nextMeeting();
      const diff = Math.max(0, target.getTime() - Date.now());
      const days = Math.floor(diff / 86_400_000);
      const hours = Math.floor((diff % 86_400_000) / 3_600_000);
      const mins = Math.floor((diff % 3_600_000) / 60_000);
      setState({ days, hours, mins, label: fmt.format(target) });
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) {
    return <div className="h-[4.5rem]" aria-hidden="true" />;
  }

  const cell = (n: number, unit: string) => (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl font-bold tabular-nums text-cream sm:text-4xl">
        {String(n).padStart(2, "0")}
      </span>
      <span className="font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-gold">
        {unit}
      </span>
    </div>
  );

  return (
    <div>
      <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-gold">
        Next meeting · {state.label}
      </p>
      <div className="mt-2 flex items-start gap-4" role="timer" aria-live="off">
        {cell(state.days, "days")}
        <span className="pt-1 font-display text-3xl text-gold/60">:</span>
        {cell(state.hours, "hours")}
        <span className="pt-1 font-display text-3xl text-gold/60">:</span>
        {cell(state.mins, "min")}
      </div>
    </div>
  );
}
