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
    primary: "bg-scarlet text-cream hover:bg-scarlet-light",
    outline: "border-2 border-cream text-cream hover:bg-cream hover:text-navy",
    "outline-dark": "border-2 border-navy text-navy hover:bg-navy hover:text-cream",
    gold: "bg-gold text-navy hover:bg-gold-light",
  };

  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      {...externalProps}
      className={`inline-flex items-center justify-center rounded-sm px-6 py-3 font-display text-sm font-semibold tracking-wide uppercase transition ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-sm border border-navy/10 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
