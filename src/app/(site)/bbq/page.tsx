import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import NewsletterSignup from "@/components/NewsletterSignup";
import { bbqRecent, bbqUpcoming, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "BBQ & Food Sales",
  description:
    "Barbecue sales, cookouts, and family nights hosted by St. Charles County Detachment 725 to fund veterans, Toys for Tots, and community programs.",
  alternates: { canonical: "/bbq/" },
};

export default function BbqPage() {
  return (
    <>
      <section className="bg-chevrons bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="BBQ & Food Sales"
            title="Eat Well. Do Good."
            light
            description="Our cookouts and food sales are how Detachment 725 pays for the work you read about on this site. Come hungry, bring family, and say hello to a few Marines."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Next Cookout
              </h2>
              {bbqUpcoming.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {bbqUpcoming.map((c) => (
                    <Card key={`${c.date}-${c.place}`}>
                      <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-scarlet">
                        {c.date}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold text-navy">{c.what}</p>
                      <p className="mt-1 text-sm text-navy/70">{c.place}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="mt-4">
                  <p className="font-display text-lg font-semibold text-navy">
                    The next date isn&rsquo;t posted yet.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    We announce each sale in the Scuttlebutt newsletter and on Facebook, usually a
                    couple of weeks ahead. Sign up below and the date lands in your inbox.
                  </p>
                  <div className="mt-5 max-w-md">
                    <NewsletterSignup endpoint={site.newsletterEndpoint} />
                  </div>
                  <div className="mt-4">
                    <Button href={site.social.facebook} variant="outline-dark" external>
                      Watch Facebook for dates
                    </Button>
                  </div>
                </Card>
              )}
            </Reveal>

            <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
              Recent Cookouts
            </h2>
            <div className="mt-4 space-y-4">
              {bbqRecent.map((c, i) => (
                <Reveal key={`${c.date}-${c.place}`} delay={i * 70}>
                  <Card className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-navy">
                        {c.what}
                      </h3>
                      <p className="mt-1 text-sm text-navy/70">{c.place}</p>
                    </div>
                    <span className="font-display text-sm font-semibold uppercase tracking-wide whitespace-nowrap text-scarlet">
                      {c.date}
                    </span>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Member Family BBQ
              </h2>
              <p className="mt-4 max-w-prose leading-relaxed text-navy/80">
                Beyond the public sales, the detachment holds a family BBQ for members and their
                families. It&rsquo;s a relaxed afternoon, and a good way to meet the people behind
                the League before you join.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Where the money goes
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                Proceeds support the detachment&rsquo;s charitable work: Toys for Tots, military
                funeral honors, scholarships, and the St. Charles County Young Marines.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href="/support" variant="primary">
                  Other ways to help
                </Button>
                <Button href="/contact" variant="outline-dark">
                  Ask about a sale
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
