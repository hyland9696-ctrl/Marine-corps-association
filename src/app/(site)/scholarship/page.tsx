import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { publicFileExists } from "@/lib/files";
import { golf, scholarship, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scholarship",
  description: `Detachment 725 awards ${scholarship.amount} scholarships to qualified applicants pursuing full-time undergraduate or technical training.`,
  alternates: { canonical: "/scholarship/" },
};

export default function ScholarshipPage() {
  const hasApplication = publicFileExists(scholarship.applicationFile);

  return (
    <>
      <section className="bg-chevrons bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Scholarship"
            title={`St. Charles County MCL Detachment 725 Scholarship`}
            light
            description={scholarship.purpose}
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                How to Apply
              </h2>
              <Card className="mt-4">
                {hasApplication ? (
                  <>
                    <p className="font-display text-lg font-semibold text-navy">
                      {scholarship.applicationLabel}
                    </p>
                    <p className="mt-2 text-sm text-navy/70">
                      Download the application, complete it, and return it to the detachment by
                      email or at a meeting.
                    </p>
                    <div className="mt-4">
                      <Button href={`/${scholarship.applicationFile}`} variant="primary" external>
                        Download application
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-display text-lg font-semibold text-navy">
                      Applications open each year
                    </p>
                    <p className="mt-2 text-sm text-navy/70">
                      Contact the detachment for the current application and deadline.
                    </p>
                    <div className="mt-4">
                      <Button href="/contact" variant="primary">
                        Contact us
                      </Button>
                    </div>
                  </>
                )}
              </Card>
              <p className="mt-4 text-sm text-navy/60">
                Questions about eligibility or the deadline? Email{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
                .
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Where the Money Comes From
              </h2>
              <p className="mt-4 max-w-prose leading-relaxed text-navy/80">
                The scholarship fund is raised by the detachment&rsquo;s annual golf tournament,
                held each September at {golf.course}. Every team entry and hole sponsorship goes
                toward the next round of awards.
              </p>
              <div className="mt-4">
                <Button href="/golf" variant="outline-dark">
                  About the golf tournament
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
          <Reveal delay={220}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Scholarship Fund Donation
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                Give any amount to the scholarship fund. Every dollar goes to the next round of
                awards.
              </p>
              <div className="mt-5">
                {site.donateUrl ? (
                  <Button href={site.donateUrl} variant="primary" external>
                    Donate now
                  </Button>
                ) : (
                  <Button href="/support" variant="primary">
                    Ways to give
                  </Button>
                )}
              </div>
            </Card>
          </Reveal>
          <Reveal delay={150}>
            <Card>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-scarlet">
                Award
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-navy">{scholarship.amount}</p>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                For full-time undergraduate or technical training at an accredited, recognized
                institution.
              </p>
            </Card>
          </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
