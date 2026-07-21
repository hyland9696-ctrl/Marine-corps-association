import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-sm font-semibold tracking-[0.2em] text-scarlet uppercase">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p
          className={`font-display text-sm font-semibold tracking-[0.2em] uppercase ${
            light ? "text-gold" : "text-scarlet"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-3xl font-bold tracking-wide uppercase sm:text-4xl ${
          light ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-cream/80" : "text-navy/70"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-dark" | "gold";
  external?: boolean;
}) {
  const styles: Record<string, string> = {
    primary: "bg-scarlet text-cream hover:bg-scarlet-light hover:shadow-scarlet/40",
    outline: "border-2 border-cream text-cream hover:bg-cream hover:text-navy hover:shadow-cream/20",
    "outline-dark": "border-2 border-navy text-navy hover:bg-navy hover:text-cream hover:shadow-navy/20",
    gold: "bg-gold text-navy hover:bg-gold-light hover:shadow-gold/40",
  };

  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      {...externalProps}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-6 py-3 font-display text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-none ${styles[variant]}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-sm border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-scarlet/20 hover:shadow-xl ${className}`}
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-scarlet via-gold to-scarlet transition-transform duration-500 ease-out group-hover:scale-x-100" />
      {children}
    </div>
  );
}
