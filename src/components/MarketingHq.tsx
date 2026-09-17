"use client";

import { useState, type ReactNode } from "react";
import { site } from "@/lib/site";
import NewsletterComposer from "@/components/NewsletterComposer";

/* ---------- small helpers ---------- */

function useCopied(): [boolean, (t: string) => void] {
  const [copied, setCopied] = useState(false);
  const copy = (t: string) => {
    try {
      navigator.clipboard.writeText(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return [copied, copy];
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, copy] = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className="rounded-sm border border-gold/40 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide text-gold transition hover:bg-gold hover:text-navy"
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  const [copied, copy] = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(hex)}
      className="group flex flex-col overflow-hidden rounded-sm border border-cream/10 text-left transition hover:-translate-y-0.5"
      title={`Click to copy ${hex}`}
    >
      <span className="h-16 w-full" style={{ backgroundColor: hex }} />
      <span className="flex items-center justify-between gap-2 bg-navy-light px-3 py-2">
        <span className="font-display text-xs uppercase tracking-wide text-cream/90">{name}</span>
        <span className="font-mono text-xs text-gold">{copied ? "Copied" : hex}</span>
      </span>
    </button>
  );
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <section className="rounded-sm border border-cream/10 bg-navy-light/40 p-6 sm:p-8">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-cream">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ToolCard({
  title,
  desc,
  href,
  cta,
  setup,
}: {
  title: string;
  desc: string;
  href?: string;
  cta: string;
  setup?: string;
}) {
  const enabled = !!href;
  return (
    <div className="flex flex-col rounded-sm border border-cream/10 bg-navy p-5">
      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-cream">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-cream/60">{desc}</p>
      {enabled ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-sm bg-scarlet px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-scarlet-light"
        >
          {cta} ↗
        </a>
      ) : (
        <span className="mt-4 rounded-sm border border-dashed border-gold/40 px-4 py-2 text-center font-display text-xs uppercase tracking-wide text-gold/80">
          {setup || "Set up to enable"}
        </span>
      )}
    </div>
  );
}

/* ---------- content ---------- */

const colors = [
  ["Navy", "#0a1220"],
  ["Navy Light", "#12203a"],
  ["Scarlet", "#8a1538"],
  ["Scarlet Light", "#b0243f"],
  ["Gold", "#c9a349"],
  ["Gold Light", "#e0c37a"],
  ["Cream", "#f6f3ea"],
];

const boilerplate = [
  {
    label: "Short blurb (social bios, listings)",
    text: `St. Charles County Detachment 725 of the Marine Corps League — serving Marines, FMF Corpsmen, veterans, and our community in St. Charles County, Missouri. Once a Marine, Always a Marine.`,
  },
  {
    label: "Long blurb (about sections, press)",
    text: `St. Charles County Detachment 725 is a local chapter of the Marine Corps League, a national veterans organization chartered by an Act of Congress. We bring that national mission home to St. Charles County, Missouri — giving Marines, FMF Corpsmen, and their families a place to stay connected to the Corps and to each other long after their service ends. Through Toys for Tots, military funeral honors, scholarships, the Young Marines, and our annual Marine Corps Birthday Ball, we put "Semper Fidelis" into action for our community.`,
  },
  {
    label: "Meeting details",
    text: `${site.meeting.schedule}\n${site.meeting.venue}, ${site.meeting.address}`,
  },
];

const templates = [
  {
    label: "Social post — monthly meeting",
    text: `📣 Marines, mark your calendars! Detachment 725 meets ${site.meeting.schedule} at the ${site.meeting.venue} (${site.meeting.address}).\n\nProspective members and guests are always welcome — come see what the League is about. Once a Marine, Always a Marine. 🇺🇸\n\n#MarineCorpsLeague #Detachment725 #StCharlesCounty`,
  },
  {
    label: "Social post — recruitment",
    text: `Are you a Marine or FMF Corpsman in the St. Charles County area? You've still got a formation to fall into. 🎖️\n\nDetachment 725 is Marines serving Marines — fellowship, funeral honors, Toys for Tots, scholarships, and more. Join us at our next meeting or message us to learn more.\n\n#OnceAMarine #MarineCorpsLeague`,
  },
  {
    label: "Newsletter intro",
    text: `Marines, family, and friends of Detachment 725,\n\nThank you for standing with us. Here's what's happening in the detachment this month — upcoming meetings, community events, and ways to get involved. As always, Semper Fidelis.`,
  },
];

/* ---------- page ---------- */

export default function MarketingHq() {
  const bannerHref = "/opengraph-image";
  return (
    <div className="min-h-screen bg-navy px-4 py-12 text-cream sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <header>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Internal · Marketing HQ
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            Detachment 725 Command Center
          </h1>
          <div className="mt-4 rounded-sm border border-scarlet/40 bg-scarlet/10 px-4 py-3 text-sm text-cream/80">
            🔒 <strong>Private page.</strong> This URL is unlisted and hidden from search engines,
            but anyone with the link can open it. For real protection, password-protect this folder
            in GoDaddy cPanel → <em>Directory Privacy</em>. Don&rsquo;t post the link publicly.
          </div>
        </header>

        {/* Brand kit — colors */}
        <Panel eyebrow="Brand Kit" title="Colors">
          <p className="mb-4 text-sm text-cream/60">Click any swatch to copy its hex code.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {colors.map(([name, hex]) => (
              <Swatch key={hex} name={name} hex={hex} />
            ))}
          </div>
        </Panel>

        {/* Typography */}
        <Panel eyebrow="Brand Kit" title="Typography">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm border border-cream/10 bg-navy p-5">
              <p className="font-display text-4xl font-bold uppercase tracking-wide">Oswald</p>
              <p className="mt-2 text-sm text-cream/60">
                Display / headings — bold, condensed, uppercase. Used for every title and label.
              </p>
              <CopyButtonRow text="Oswald (Google Fonts)" />
            </div>
            <div className="rounded-sm border border-cream/10 bg-navy p-5">
              <p className="text-3xl" style={{ fontFamily: "var(--font-inter)" }}>
                Inter
              </p>
              <p className="mt-2 text-sm text-cream/60">
                Body text — clean and highly readable at any size. Used for all paragraphs.
              </p>
              <CopyButtonRow text="Inter (Google Fonts)" />
            </div>
          </div>
        </Panel>

        {/* Boilerplate copy */}
        <Panel eyebrow="Brand Kit" title="Ready-to-Paste Copy">
          <div className="space-y-4">
            {boilerplate.map((b) => (
              <div key={b.label} className="rounded-sm border border-cream/10 bg-navy p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-display text-xs font-semibold uppercase tracking-wide text-gold">
                    {b.label}
                  </span>
                  <CopyButton text={b.text} />
                </div>
                <p className="whitespace-pre-wrap text-sm text-cream/80">{b.text}</p>
              </div>
            ))}
          </div>
        </Panel>

        {/* Downloadable assets */}
        <Panel eyebrow="Assets" title="Downloadable Brand Files">
          <div className="grid gap-4 sm:grid-cols-3">
            <AssetCard
              href="/brand/detachment-725-logo.svg"
              file="detachment-725-logo.svg"
              title="Logo (horizontal)"
              desc="Full lockup, scalable SVG — for letterheads, flyers, websites."
            />
            <AssetCard
              href="/brand/detachment-725-badge.svg"
              file="detachment-725-badge.svg"
              title="Badge"
              desc="Square 725 badge — great for social profile pictures."
            />
            <AssetCard
              href={bannerHref}
              file="detachment-725-social-banner.png"
              title="Social Banner"
              desc="1200×630 image — for Facebook/link previews and posts."
            />
          </div>
          <p className="mt-4 text-xs text-cream/50">
            Want photos, flyers, or a print-ready logo added here? Drop the files in and I&rsquo;ll
            list them — or ask me to generate them.
          </p>
        </Panel>

        {/* Marketing toolkit */}
        <Panel eyebrow="Toolkit" title="Marketing Launchpad">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              title="Email Campaign"
              desc="Compose and send a newsletter or announcement to your subscribers."
              href={site.tools.emailDashboardUrl || undefined}
              cta="New Campaign"
              setup="Connect email platform"
            />
            <ToolCard
              title="Website Analytics"
              desc="See how many people visit the site and which pages they read."
              href={site.tools.analyticsUrl || undefined}
              cta="Open Analytics"
              setup="Connect analytics"
            />
            <ToolCard
              title="Contact Inbox"
              desc="Messages submitted through the website's contact form."
              href={site.formEndpoint ? "https://formspree.io/forms" : undefined}
              cta="Open Inbox"
              setup="Connect contact form"
            />
            <ToolCard
              title="Facebook Page"
              desc="Post updates, photos, and events to your followers."
              href={site.social.facebook}
              cta="Open Facebook"
            />
            <ToolCard
              title="YouTube Channel"
              desc="Upload and manage the detachment's videos."
              href={site.social.youtube}
              cta="Open YouTube"
            />
            <ToolCard
              title="Donations"
              desc="Your giving page for dues, sponsorships, and Toys for Tots."
              href={site.donateUrl || undefined}
              cta="Open Giving Page"
              setup="Connect donation link"
            />
          </div>
        </Panel>

        {/* Newsletter */}
        <Panel eyebrow="Newsletter" title="Monthly Newsletter">
          <div className="mb-6 rounded-sm border border-gold/25 bg-gold/5 p-4 text-sm text-cream/75">
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-gold">
              How it works — free, sent from your Gmail
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>
                <strong>One-time setup:</strong> create a Google Sheet, then add the send script.{" "}
                <a href="/newsletter/README.md" target="_blank" rel="noopener noreferrer" className="text-gold underline">
                  Full instructions
                </a>{" "}
                ·{" "}
                <a href="/newsletter/Code.gs" download className="text-gold underline">
                  Download the script (Code.gs)
                </a>{" "}
                ·{" "}
                <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-gold underline">
                  New Google Sheet
                </a>
              </li>
              <li>
                <strong>Each month:</strong> write the newsletter below, click{" "}
                <em>Copy subject</em> and <em>Copy email HTML</em>.
              </li>
              <li>
                <strong>Send:</strong> paste both into your sheet&rsquo;s <em>Compose</em> tab and
                use its <strong>📣 Newsletter → Send</strong> menu. Everyone gets it with a working
                unsubscribe link.
              </li>
            </ol>
            <p className="mt-3 text-cream/55">
              Subscribers collect automatically from the website&rsquo;s signup form into your
              Google Sheet.{" "}
              {site.newsletterEndpoint ? "Signup is connected ✓" : "Signup not connected yet — send me your Web App URL."}
            </p>
          </div>
          <NewsletterComposer />
        </Panel>

        {/* Copy-paste templates */}
        <Panel eyebrow="Toolkit" title="Post & Email Templates">
          <div className="space-y-4">
            {templates.map((t) => (
              <div key={t.label} className="rounded-sm border border-cream/10 bg-navy p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-display text-xs font-semibold uppercase tracking-wide text-gold">
                    {t.label}
                  </span>
                  <CopyButton text={t.text} />
                </div>
                <pre className="whitespace-pre-wrap font-sans text-sm text-cream/80">{t.text}</pre>
              </div>
            ))}
          </div>
        </Panel>

        <footer className="border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          Marketing HQ · {site.name} · Internal use only
        </footer>
      </div>
    </div>
  );
}

function CopyButtonRow({ text }: { text: string }) {
  return (
    <div className="mt-4">
      <CopyButton text={text} label="Copy font name" />
    </div>
  );
}

function AssetCard({
  href,
  file,
  title,
  desc,
}: {
  href: string;
  file: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col rounded-sm border border-cream/10 bg-navy p-5">
      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-cream">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-cream/60">{desc}</p>
      <a
        href={href}
        download={file}
        className="mt-4 inline-flex items-center justify-center rounded-sm bg-gold px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-navy transition hover:bg-gold-light"
      >
        ↓ Download
      </a>
    </div>
  );
}
