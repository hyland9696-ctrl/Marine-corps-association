import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Focus Marines",
  description:
    "Detachment 725 supports the Focus Marines Foundation, a St. Louis-area nonprofit that runs a free, week-long program helping veterans transition to civilian life.",
  alternates: { canonical: "/focus-marines/" },
};

const FOCUS_URL = "https://www.focusmarines.org";

export default function FocusMarinesPage() {
  return (
    <>
      <section className="bg-chevrons bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Partner"
            title="Focus Marines Foundation"
            light
            description="A St. Louis-area nonprofit, founded in 2010 by Marines, that helps veterans of every branch find their footing after service."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="max-w-prose lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                What Focus Marines Does
              </h2>
              <p className="mt-4 leading-relaxed text-navy/80">
                Focus Marines runs a free, week-long program for veterans making the transition
                to civilian life. Classes are small, held several times a year, and cover the hard
                questions: who you are now, what you want to do, and how to get there. Travel,
                lodging, and meals are covered, and graduates stay connected to mentors and to a
                network of veteran organizations afterward.
              </p>
              <p className="mt-4 leading-relaxed text-navy/80">
                The program is open to veterans of any branch, not only Marines. More than a
                thousand have gone through it.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                How Detachment 725 Helps
              </h2>
              <p className="mt-4 leading-relaxed text-navy/80">
                Focus Marines is one of the causes our annual golf tournament supports, and the
                detachment backs its work throughout the year. If you know a veteran who is
                struggling with the transition, point them to the foundation.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href={FOCUS_URL} variant="primary" external>
                  Visit focusmarines.org
                </Button>
                <Button href="/golf" variant="outline-dark">
                  The golf tournament
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Know a Veteran Who Needs It?
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                The program costs participants nothing. Applications and class dates are on the
                foundation&rsquo;s website.
              </p>
              <div className="mt-5">
                <Button href={FOCUS_URL} variant="outline-dark" external>
                  Apply or refer someone
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
