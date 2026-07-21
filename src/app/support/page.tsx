import type { Metadata } from "next";
import { Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support Us",
  description: "Ways to support St. Charles County Detachment 725 and the programs it runs.",
};

const ways = [
  {
    title: "Donate Toys or Time to Toys for Tots",
    description:
      "Every holiday season we collect and distribute toys to children across St. Charles County. Donated toys and volunteer hours both make a direct difference.",
  },
  {
    title: "Sponsor or Play in Our Golf Tournament",
    description:
      "Our annual Scholarship Golf Tournament funds scholarships for Marine-connected students. Sponsorships and player registrations directly support that fund.",
  },
  {
    title: "Attend a BBQ Fundraiser",
    description:
      "Throughout the year we host BBQ fundraisers that support the detachment's charitable work and community programs.",
  },
  {
    title: "Support the Focus Marine Foundation",
    description:
      "We partner with the Focus Marine Foundation, which helps combat veterans recover through fly-fishing and outdoor programs.",
  },
  {
    title: "Give Toward Funeral Honors",
    description:
      "Our Marines provide colors and funeral honors for departed veterans. Contributions help us keep this tradition of respect going.",
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Support Us"
            title="Help Us Serve"
            light
            description="Detachment 725 runs on the generosity of our members and community. Here's how you can help."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {ways.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <Card>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy/70">{w.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Ways to Give
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                To donate, sponsor an event, or coordinate a toy or volunteer contribution, contact
                us directly or send mail to:
              </p>
              <p className="mt-4 text-sm text-navy/80">
                {site.name}
                <br />
                {site.mail.line1}
                <br />
                {site.mail.line2}
              </p>
              <p className="mt-4 text-sm text-navy/70">
                You can also reach us by phone at{" "}
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="underline">
                  {site.phone}
                </a>{" "}
                or through our{" "}
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="underline">
                  Facebook page
                </a>
                .
              </p>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
