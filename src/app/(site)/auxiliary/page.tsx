import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Auxiliary",
  description:
    "The Marine Corps League Auxiliary welcomes family members of Marines and FMF Corpsmen who want to support the detachment's work in St. Charles County.",
  alternates: { canonical: "/auxiliary/" },
};

export default function AuxiliaryPage() {
  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Family"
            title="Marine Corps League Auxiliary"
            light
            description="For the spouses, parents, children, and grandchildren of Marines and FMF Corpsmen who want to serve alongside them."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="max-w-prose lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Who It&rsquo;s For
              </h2>
              <p className="mt-4 leading-relaxed text-navy/80">
                The Marine Corps League Auxiliary is the League&rsquo;s organization for family
                members. Membership is open to family of Marines and FMF Corpsmen, whether or not
                the Marine is a League member.
              </p>
              <p className="mt-4 leading-relaxed text-navy/80">
                Auxiliary members are part of everything the detachment does: Toys for Tots, the
                golf tournament, BBQ fundraisers, the Birthday Ball, and the Celebration of
                Lights. If you have ever stood beside a Marine at one of our events, you already
                know the work.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                How to Join
              </h2>
              <p className="mt-4 leading-relaxed text-navy/80">
                Come to a detachment meeting ({site.meeting.schedule}, {site.meeting.venue}) and
                introduce yourself, or email the detachment and we&rsquo;ll connect you with the
                Auxiliary.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Get in Touch
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                Email{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>{" "}
                or use the contact form.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href="/contact" variant="primary">
                  Contact us
                </Button>
                <Button href={site.orgLinks[0].url} variant="outline-dark" external>
                  MCL National
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
