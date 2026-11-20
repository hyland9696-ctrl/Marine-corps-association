"use client";

import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/lib/site";
import { nextMeeting, nextStaffMeeting } from "@/lib/meeting";
import { KEYS, readKey } from "@/lib/minutes";
import NewsletterComposer from "@/components/NewsletterComposer";
import MeetingMinutes from "@/components/MeetingMinutes";

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
      className="shrink-0 rounded-sm border border-gold/40 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide text-gold transition hover:bg-gold hover:text-navy"
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
      <span className="h-14 w-full" style={{ backgroundColor: hex }} />
      <span className="flex items-center justify-between gap-2 bg-navy-light px-3 py-2">
        <span className="font-display text-xs uppercase tracking-wide text-cream/90">{name}</span>
        <span className="font-mono text-xs text-gold">{copied ? "Copied" : hex}</span>
      </span>
    </button>
  );
}

function Panel({ title, eyebrow, children, intro }: { title: string; eyebrow: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-sm border border-cream/10 bg-navy-light/40 p-5 sm:p-8">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">{title}</h2>
      {intro && <div className="mt-3 max-w-3xl text-sm leading-relaxed text-cream/65">{intro}</div>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ToolCard({ title, desc, href, cta, setup, icon }: { title: string; desc: string; href?: string; cta: string; setup?: string; icon: string }) {
  const enabled = !!href;
  return (
    <div className="group flex flex-col rounded-sm border border-cream/10 bg-navy p-5 transition hover:border-gold/40">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy-light font-display text-base text-gold">{icon}</span>
        <h3 className="font-display text-base font-semibold uppercase tracking-wide text-cream">{title}</h3>
      </div>
      <p className="mt-3 flex-1 text-sm text-cream/60">{desc}</p>
      {enabled ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center rounded-sm bg-scarlet px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-scarlet-light">
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

function AssetCard({ href, file, title, desc, preview }: { href: string; file: string; title: string; desc: string; preview?: string }) {
  return (
    <div className="flex flex-col rounded-sm border border-cream/10 bg-navy p-5">
      {preview && (
        <div className="mb-4 flex h-24 items-center justify-center rounded-sm bg-cream p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="" className="max-h-full max-w-full" loading="lazy" />
        </div>
      )}
      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-cream">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-cream/60">{desc}</p>
      <a href={href} download={file} className="mt-4 inline-flex items-center justify-center rounded-sm bg-gold px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-navy transition hover:bg-gold-light">
        ↓ Download
      </a>
    </div>
  );
}

function CopyCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-sm border border-cream/10 bg-navy p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="font-display text-xs font-semibold uppercase tracking-wide text-gold">{label}</span>
        <CopyButton text={text} />
      </div>
      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-cream/80">{text}</pre>
    </div>
  );
}

function StatusTile({ label, value, ok, hint }: { label: string; value: string; ok?: boolean; hint?: string }) {
  return (
    <div className="rounded-sm border border-cream/10 bg-navy-light/40 px-4 py-3">
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/50">{label}</p>
      <p className="mt-1 flex items-center gap-2 font-display text-lg font-semibold text-cream">
        {ok !== undefined && <span className={`h-2 w-2 rounded-full ${ok ? "bg-emerald-400" : "bg-gold"}`} />}
        {value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-cream/45">{hint}</p>}
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
    label: "Social post — just got out",
    text: `Got out of the Corps in the last few years and landed in St. Charles County? There are Marines here who did the same thing, and a formation that meets once a month. No minimum hours. Jeans and a shirt.\n\n${site.url}/just-got-out/\n\n#OnceAMarine #MarineVeterans #StCharlesCounty`,
  },
  {
    label: "Newsletter intro",
    text: `Marines, family, and friends of Detachment 725,\n\nThank you for standing with us. Here's what's happening in the detachment this month — upcoming meetings, community events, and ways to get involved. As always, Semper Fidelis.`,
  },
  {
    label: "Text message — meeting reminder",
    text: `Reminder: Det 725 meets this Thursday, 7 PM, O'Fallon Elks Lodge (1163 Tom Ginnever Ave). Guests welcome. Semper Fi.`,
  },
];

type TabId = "newsletter" | "minutes" | "launchpad" | "brand" | "templates";
const tabs: { id: TabId; label: string; short: string }[] = [
  { id: "newsletter", label: "Scuttlebutt", short: "News" },
  { id: "minutes", label: "Meeting Minutes", short: "Minutes" },
  { id: "launchpad", label: "Launchpad", short: "Links" },
  { id: "brand", label: "Brand Kit", short: "Brand" },
  { id: "templates", label: "Templates", short: "Posts" },
];
const TAB_KEY = "mcl725-hq-tab";
const fmtDate = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });

/* ---------- page ---------- */

export default function MarketingHq() {
  const [tab, setTab] = useState<TabId>("newsletter");
  const [status, setStatus] = useState<{ minutesReady: boolean; meeting: string; staff: string } | null>(null);

  // Restore the last tab (or a #hash deep link) after hydration.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const fromHash = window.location.hash.replace("#", "");
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(TAB_KEY);
      } catch {
        /* ignore */
      }
      const pick = tabs.find((t) => t.id === fromHash)?.id ?? tabs.find((t) => t.id === saved)?.id ?? "newsletter";
      setTab(pick);
      const now = new Date();
      setStatus({
        minutesReady: !!readKey(KEYS.deepgram) && !!readKey(KEYS.anthropic),
        meeting: fmtDate.format(nextMeeting(now)),
        staff: fmtDate.format(nextStaffMeeting(now)),
      });
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function go(id: TabId) {
    setTab(id);
    try {
      localStorage.setItem(TAB_KEY, id);
      history.replaceState(null, "", `#${id}`);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-screen bg-navy text-cream">
      {/* Sticky top bar with tabs */}
      <div className="sticky top-0 z-40 border-b border-cream/10 bg-navy/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6">
          <div className="flex shrink-0 items-center gap-2 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold font-display text-xs font-bold text-gold">725</span>
            <span className="hidden font-display text-sm font-semibold uppercase tracking-wide sm:inline">HQ</span>
          </div>
          <nav className="-mb-px flex flex-1 gap-1 overflow-x-auto" aria-label="HQ sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.id)}
                aria-current={tab === t.id ? "page" : undefined}
                className={`whitespace-nowrap border-b-2 px-3 py-3.5 font-display text-xs font-semibold uppercase tracking-wide transition sm:text-sm ${
                  tab === t.id ? "border-gold text-gold" : "border-transparent text-cream/60 hover:text-cream"
                }`}
              >
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </nav>
          <span className="hidden shrink-0 items-center gap-1 rounded-sm border border-scarlet/40 bg-scarlet/10 px-2 py-1 font-display text-[10px] font-semibold uppercase tracking-wide text-cream/70 md:inline-flex" title="Unlisted URL. Add a cPanel password for real protection.">
            🔒 Private
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Header + status */}
        <header className="mb-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">Internal · Officers only</p>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide sm:text-5xl">Detachment 725 Command Center</h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatusTile label="Next meeting" value={status?.meeting ?? "…"} hint="7:00 PM, Elks Lodge" />
            <StatusTile label="Staff meeting" value={status?.staff ?? "…"} hint="Second Monday" />
            <StatusTile label="Newsletter engine" value={site.newsletterEndpoint ? "Connected" : "Not connected"} ok={!!site.newsletterEndpoint} hint={site.newsletterEndpoint ? "Signup + send are live" : "Deploy the script, send me the URL"} />
            <StatusTile label="Minutes AI" value={status ? (status.minutesReady ? "Ready" : "Keys needed") : "…"} ok={status?.minutesReady} hint="Keys live in this browser" />
          </div>
        </header>

        <main>
          {tab === "newsletter" && (
            <Panel
              eyebrow="Newsletter"
              title="The Scuttlebutt"
              intro={
                <>
                  Issue and meeting dates are pre-filled. Write the column, add events and photos,{" "}
                  <em>Send test to me</em>, then <em>Send to all subscribers</em>. Free, sent from your Gmail.{" "}
                  <a href="https://github.com/hyland9696-ctrl/Marine-corps-association/blob/main/newsletter-engine/README.md" target="_blank" rel="noopener noreferrer" className="text-gold underline">
                    One-time setup instructions
                  </a>
                  .
                </>
              }
            >
              <NewsletterComposer />
            </Panel>
          )}

          {tab === "minutes" && (
            <Panel
              eyebrow="Adjutant"
              title="Meeting Minutes"
              intro="Record the meeting on a phone, or upload a recording afterward. The recorder transcribes it and drafts full minutes in Marine Corps League order: attendance, reports, old and new business, motions and votes, action items, upcoming dates, and a recap ready for the Scuttlebutt. Review, edit, file."
            >
              <MeetingMinutes />
            </Panel>
          )}

          {tab === "launchpad" && (
            <Panel eyebrow="Toolkit" title="Launchpad" intro="Everything the detachment runs online, one click away. Grey tiles light up once that service is connected.">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ToolCard icon="✉" title="Subscriber List" desc="The Google Sheet that holds every newsletter subscriber and the send log." href={site.tools.emailDashboardUrl || undefined} cta="Open Sheet" setup="Send me the Sheet link" />
                <ToolCard icon="▦" title="Website Analytics" desc="How many people visit the site, from where, and which pages they read." href={site.tools.analyticsUrl || undefined} cta="Open Analytics" setup="Connect analytics" />
                <ToolCard icon="✎" title="Contact Inbox" desc="Messages submitted through the website's contact form." href={site.formEndpoint ? "https://formspree.io/forms" : undefined} cta="Open Inbox" setup="Connect contact form" />
                <ToolCard icon="f" title="Facebook Page" desc="Post updates, photos, and events to your followers." href={site.social.facebook} cta="Open Facebook" />
                <ToolCard icon="▶" title="YouTube Channel" desc="Upload and manage the detachment's videos." href={site.social.youtube} cta="Open YouTube" />
                <ToolCard icon="$" title="Donations" desc="Your giving page for dues, sponsorships, and Toys for Tots." href={site.donateUrl || undefined} cta="Open Giving Page" setup="Connect PayPal link" />
                <ToolCard icon="⌂" title="GoDaddy Hosting" desc="cPanel: upload the site, manage the HQ password, email accounts." href="https://sso.godaddy.com/" cta="Open GoDaddy" />
                <ToolCard icon="G" title="Google Business Profile" desc="The listing that shows on Google Maps and local search. Keep hours and the meeting address current." href="https://business.google.com/" cta="Open Profile" />
                <ToolCard icon="☰" title="Website Source" desc="The code and files behind the site. Where new photos and PDFs get added." href="https://github.com/hyland9696-ctrl/Marine-corps-association" cta="Open Repository" />
              </div>
            </Panel>
          )}

          {tab === "brand" && (
            <div className="space-y-6">
              <Panel eyebrow="Brand Kit" title="Files" intro="Logo, badge, share banner, and QR codes. The SVGs scale to any size for print.">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <AssetCard preview="/brand/detachment-725-logo.svg" href="/brand/detachment-725-logo.svg" file="detachment-725-logo.svg" title="Logo (horizontal)" desc="Full lockup, scalable SVG, for letterheads, flyers, websites." />
                  <AssetCard preview="/brand/detachment-725-badge.svg" href="/brand/detachment-725-badge.svg" file="detachment-725-badge.svg" title="Badge" desc="Square 725 badge, great for social profile pictures." />
                  <AssetCard href="/opengraph-image" file="detachment-725-social-banner.png" title="Social Banner" desc="1200×630 image for Facebook and link previews." />
                  <AssetCard preview="/brand/qr-join.svg" href="/brand/qr-join.svg" file="qr-join.svg" title="QR: Join page" desc="Scan-to-join code for BBQ tables, flyers, and the recruiting poster." />
                  <AssetCard preview="/brand/qr-golf.svg" href="/brand/qr-golf.svg" file="qr-golf.svg" title="QR: Golf Tournament" desc="Put it on sponsor packets and the tournament flyer." />
                  <AssetCard preview="/brand/qr-site.svg" href="/brand/qr-site.svg" file="qr-site.svg" title="QR: Home page" desc="General-purpose code for business cards and banners." />
                </div>
              </Panel>
              <Panel eyebrow="Brand Kit" title="Colors & Type" intro="Click a swatch to copy its hex code.">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                  {colors.map(([name, hex]) => (
                    <Swatch key={hex} name={name} hex={hex} />
                  ))}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-sm border border-cream/10 bg-navy p-5">
                    <p className="font-display text-4xl font-bold uppercase tracking-wide">Oswald</p>
                    <p className="mt-2 text-sm text-cream/60">Headings and labels: bold, condensed, uppercase.</p>
                    <div className="mt-3"><CopyButton text="Oswald (Google Fonts)" label="Copy font name" /></div>
                  </div>
                  <div className="rounded-sm border border-cream/10 bg-navy p-5">
                    <p className="text-3xl" style={{ fontFamily: "var(--font-inter)" }}>Inter</p>
                    <p className="mt-2 text-sm text-cream/60">Body text: clean and readable at any size.</p>
                    <div className="mt-3"><CopyButton text="Inter (Google Fonts)" label="Copy font name" /></div>
                  </div>
                </div>
              </Panel>
              <Panel eyebrow="Brand Kit" title="Ready-to-Paste Copy">
                <div className="grid gap-4 lg:grid-cols-2">
                  {boilerplate.map((b) => (
                    <CopyCard key={b.label} label={b.label} text={b.text} />
                  ))}
                </div>
              </Panel>
            </div>
          )}

          {tab === "templates" && (
            <Panel eyebrow="Toolkit" title="Post & Message Templates" intro="Copy, tweak the date, post. Written for Facebook, the newsletter, and group texts.">
              <div className="grid gap-4 lg:grid-cols-2">
                {templates.map((t) => (
                  <CopyCard key={t.label} label={t.label} text={t.text} />
                ))}
              </div>
            </Panel>
          )}
        </main>

        <footer className="mt-10 border-t border-cream/10 pt-6 text-center text-xs text-cream/50">
          Command Center · {site.name} · Internal use only · This URL is unlisted; add a cPanel password for real protection.
        </footer>
      </div>
    </div>
  );
}
