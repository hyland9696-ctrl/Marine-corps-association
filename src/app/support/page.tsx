import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
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

      <section className="bg-navy-light py-12 text-cream">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
            Make a Donation
          </h2>
          <p className="max-w-2xl text-cream/80">
            Your gift funds Toys for Tots, scholarships for Marine-connected students, funeral
            honors, and the community programs that keep Detachment 725 serving.
          </p>
          {site.donateUrl ? (
            <Button href={site.donateUrl} variant="gold" external>
              Donate Now
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Button href="/contact" variant="gold">
                Contact Us to Give
              </Button>
              <p className="max-w-xl text-sm text-cream/60">
                Online giving is coming soon. To donate today, reach out through our contact page
                or mail a check to {site.mail.line1}, {site.mail.line2}.
              </p>
            </div>
          )}
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
