import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Meeting schedule and annual events for St. Charles County Detachment 725.",
};

const annualEvents = [
  {
    title: "Toys for Tots Campaign",
    when: "Holiday Season",
    description: "Collecting and distributing toys to children across St. Charles County.",
  },
  {
    title: "Scholarship Golf Tournament",
    when: "Annually",
    description: "Our signature fundraiser supporting scholarships for Marine-connected students.",
  },
  {
    title: "Family BBQ Fundraisers",
    when: "Throughout the Year",
    description: "Fellowship and fundraising, open to members and their families.",
  },
  {
    title: "Marine Corps Birthday Ball",
    when: "November",
    description: "Honoring the founding of the United States Marine Corps in 1775.",
  },
];

export default function EventsPage() {
  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading eyebrow="Events" title="Meetings &amp; Gatherings" light />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Monthly Meeting
              </h2>
              <Card className="mt-4">
                <p className="font-display text-xl font-semibold text-navy">{site.meeting.schedule}</p>
                <p className="mt-2 text-navy/70">{site.meeting.venue}</p>
                <p className="text-navy/70">{site.meeting.address}</p>
                <div className="mt-4">
                  <Button href={site.meeting.mapsUrl} variant="outline-dark" external>
                    Get Directions
                  </Button>
                </div>
              </Card>
              <p className="mt-4 text-sm text-navy/60">
                New to the detachment? Prospective members and guests are always welcome. Just
                come by, or reach out ahead of time on our{" "}
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="underline">
                  Facebook page
                </a>
                .
              </p>
            </Reveal>

            <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
              Annual Events
            </h2>
            <div className="mt-4 space-y-4">
              {annualEvents.map((e, i) => (
                <Reveal key={e.title} delay={i * 70}>
                  <Card className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-navy">
                        {e.title}
                      </h3>
                      <p className="mt-1 text-sm text-navy/70">{e.description}</p>
                    </div>
                    <span className="font-display text-sm font-semibold tracking-wide text-scarlet uppercase whitespace-nowrap">
                      {e.when}
                    </span>
                  </Card>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-sm text-navy/60">
              Exact dates are announced closer to each event. Follow our{" "}
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="underline">
                Facebook
              </a>{" "}
              page for the latest schedule.
            </p>
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Stay in the Loop
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                Our &ldquo;Scuttlebutt&rdquo; newsletter and Facebook page carry the latest on
                meetings, events, and detachment news.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={site.social.facebook} variant="outline-dark" external>
                  Follow on Facebook
                </Button>
                <Button href="/contact" variant="primary">
                  Get the Newsletter
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
