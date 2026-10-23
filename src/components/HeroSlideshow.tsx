"use client";

import { useEffect, useState } from "react";

/**
 * Full-bleed background slideshow for the home hero. Crossfades between the
 * detachment's own photos with a slow Ken Burns drift. Decorative only: the
 * hero text sits on top, and reduced-motion users get a single still frame.
 */
export default function HeroSlideshow({ photos, interval = 6000 }: { photos: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), interval);
    // Deferring the flag keeps the first frame identical to the server render.
    const raf = window.requestAnimationFrame(() => setAnimate(true));
    return () => {
      window.clearInterval(id);
      window.cancelAnimationFrame(raf);
    };
  }, [photos.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {photos.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          } ${animate && i === index ? "animate-kenburns" : ""}`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
    </div>
  );
}
