import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { publicFileExists } from "@/lib/files";
import { golf, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Golf Tournament",
  description: `Detachment 725's annual fundraising golf tournament: ${golf.date} at ${golf.course}, Wentzville. Four-person scramble benefiting scholarships, Focus Marines, Toys for Tots, and the Young Marines.`,
  alternates: { canonical: "/golf/" },
};

const details = [
  ["Format", golf.format],
  ["Schedule", `${golf.registration}. ${golf.teeOff}.`],
  ["Entry", `${golf.teamFee}. ${golf.mulligans}.`],
  ["Flights", golf.flights],
  ["Food & drink", golf.food],
];

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${site.shortName} Annual Fundraising Golf Tournament`,
  startDate: "2026-09-19T12:15:00-05:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: golf.course,
    address: { "@type": "PostalAddress", streetAddress: "158 Bear Creek Dr", addressLocality: "Wentzville", addressRegion: "MO", postalCode: "63385", addressCountry: "US" },
  },
  organizer: { "@type": "Organization", name: `${site.name}, ${site.org}`, url: site.url },
  description: `${golf.format}. ${golf.teamFee}. Benefits ${golf.benefits}.`,
  offers: { "@type": "Offer", price: "480", priceCurrency: "USD", availability: golf.golfersSoldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock", url: `${site.url}/golf/` },
};

export default function GolfPage() {
  const hasFlyer = publicFileExists(golf.flyerFile);
  const registerHref = golf.registerUrl || "/contact";
  const sponsorHref = golf.sponsorUrl || "/contact";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <section className="bg-chevrons bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Annual Fundraiser"
            title="MCL 725 Golf Tournament"
            light
            description={`${golf.date} at ${golf.course}, ${golf.address}. Presented with ${golf.titleSponsor}, in support of ${golf.benefits}.`}
          />
          <div className="mt-8 flex flex-wrap gap-4">
            {golf.golfersSoldOut ? (
              <span className="inline-flex items-center rounded-sm border-2 border-gold px-6 py-3 font-display text-sm font-semibold tracking-wide uppercase text-gold">
                Golfer registration sold out
              </span>
            ) : (
              <Button href={registerHref} variant="gold" external={Boolean(golf.registerUrl)}>
                Register a team
              </Button>
            )}
            <Button href={sponsorHref} variant="outline" external={Boolean(golf.sponsorUrl)}>
              Become a sponsor
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Tournament Details
              </h2>
              <dl className="mt-4 divide-y divide-navy/10 rounded-sm border border-navy/10 bg-white">
                {details.map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr]">
                    <dt className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-scarlet">
                      {k}
                    </dt>
                    <dd className="text-sm text-navy/80">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-navy/70">
                Single players: call {golf.director.name} at{" "}
                <a href={`tel:${golf.director.phone.replace(/\D/g, "")}`} className="underline">
                  {golf.director.phone}
                </a>{" "}
                to be placed on the waiting list to join a team.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Prizes
              </h2>
              <ul className="mt-4 space-y-2">
                {golf.prizes.map((p) => (
                  <li key={p} className="flex gap-3 text-navy/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scarlet" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-navy/60">{golf.prizesNote}</p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Sponsorship Opportunities
              </h2>
              <p className="mt-3 text-sm text-navy/70">
                Every sponsor gets a Marine from the detachment as a liaison for sign ordering and
                anything else before the tournament.
              </p>
              <ul className="mt-4 divide-y divide-navy/10 rounded-sm border border-navy/10 bg-white">
                {golf.sponsorships.map((t) => (
                  <li
                    key={t.name}
                    className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${
                      t.soldOut ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-display text-base font-semibold uppercase tracking-wide text-navy">
                        {t.name}
                        {t.soldOut && (
                          <span className="ml-3 rounded-sm bg-scarlet px-2 py-0.5 font-display text-[0.65rem] font-semibold tracking-[0.15em] text-cream uppercase">
                            Sold out
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-navy/70">{t.perk}</p>
                    </div>
                    <span className="font-display text-xl font-bold tabular-nums text-navy">{t.price}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Golfers and Sponsors, Please Read
              </h2>
              <p className="mt-4 max-w-prose leading-relaxed text-navy/80">
                When signing up and paying through PayPal, please list the player names in the
                notes section of the checkout if you know them at the time of payment. It helps us
                at registration. Sponsors with questions or special requests, contact Tournament
                Director {golf.director.name} at{" "}
                <a href={`tel:${golf.director.phone.replace(/\D/g, "")}`} className="underline">
                  {golf.director.phone}
                </a>
                .
              </p>
              <p className="mt-4 max-w-prose leading-relaxed text-navy/80">
                If paying by check, make it payable to <strong>Marine Corps League Detachment 725</strong>{" "}
                and mail to {site.mail.line1}, {site.mail.line2}.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Tournament Flyer
              </h2>
              <figure className="mt-4 max-w-md overflow-hidden rounded-sm border border-navy/10 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={golf.flyerImage} alt={`${golf.date} tournament flyer`} className="w-full" />
              </figure>
              {hasFlyer && (
                <div className="mt-4">
                  <Button href={`/${golf.flyerFile}`} variant="outline-dark" external>
                    Download flyer (PDF)
                  </Button>
                </div>
              )}
            </Reveal>
          </div>

          <Reveal delay={150}>
            <Card>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-scarlet">
                Hole Sponsor
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-navy">{golf.holeSponsor}</p>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">{golf.holeSponsorNote}</p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href={sponsorHref} variant="primary" external={Boolean(golf.sponsorUrl)}>
                  {golf.sponsorUrl ? "Buy a hole sponsorship" : "Ask about sponsoring"}
                </Button>
                <Button href={golf.mapsUrl} variant="outline-dark" external>
                  Directions to {golf.course}
                </Button>
              </div>
              <p className="mt-4 text-xs text-navy/60">
                {golf.course} · {golf.coursePhone}
              </p>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
