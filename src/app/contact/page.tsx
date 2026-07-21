import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for St. Charles County Detachment 725, Marine Corps League.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading eyebrow="Contact" title="Get In Touch" light />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Mailing Address
              </h3>
              <p className="mt-3 text-navy/80">
                {site.name}
                <br />
                {site.mail.line1}
                <br />
                {site.mail.line2}
              </p>
              <h3 className="mt-6 font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Phone
              </h3>
              <p className="mt-3 text-navy/80">
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="hover:text-scarlet">
                  {site.phone}
                </a>
              </p>
              <h3 className="mt-6 font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Follow Us
              </h3>
              <div className="mt-3 flex gap-4">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-scarlet underline"
                >
                  Facebook
                </a>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-scarlet underline"
                >
                  YouTube
                </a>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={80}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                {site.contacts.paymaster.role}
              </h3>
              <p className="mt-3 text-navy/80">{site.contacts.paymaster.name}</p>
              <p className="text-sm text-navy/60">{site.contacts.paymaster.note}</p>

              <h3 className="mt-6 font-display text-lg font-semibold uppercase tracking-wide text-navy">
                {site.contacts.editor.role}
              </h3>
              <p className="mt-3 text-navy/80">{site.contacts.editor.name}</p>
              <p className="text-sm text-navy/60">{site.contacts.editor.note}</p>
              <p className="mt-2 text-sm">
                <a href={`mailto:${site.contacts.editor.email}`} className="text-scarlet underline">
                  {site.contacts.editor.email}
                </a>
              </p>
              <p className="text-sm text-navy/80">{site.contacts.editor.phone}</p>
            </Card>
          </Reveal>

          <Reveal delay={160} className="md:col-span-2">
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Come See Us
              </h3>
              <p className="mt-3 text-navy/80">
                {site.meeting.schedule} at {site.meeting.venue}, {site.meeting.address}.
              </p>
              <div className="mt-4">
                <Button href={site.meeting.mapsUrl} external>
                  Get Directions
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
