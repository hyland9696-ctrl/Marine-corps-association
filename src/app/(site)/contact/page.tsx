import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
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
          <Reveal className="md:col-span-2">
            <Card id="message">
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Send Us a Message
              </h3>
              <p className="mt-2 mb-6 text-navy/70">
                Questions about membership, events, or getting involved? Send us a note and
                we&rsquo;ll be in touch.
              </p>
              <ContactForm endpoint={site.formEndpoint} email={site.email} />
            </Card>
          </Reveal>

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
                Email
              </h3>
              <p className="mt-3 text-navy/80">
                <a href={`mailto:${site.email}`} className="text-scarlet underline">
                  {site.email}
                </a>
              </p>
              <h3 className="mt-6 font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Follow Us
              </h3>
              <div className="mt-3 flex gap-4">
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-scarlet underline">
                  Facebook
                </a>
                <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="text-scarlet underline">
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
              <p className="mt-2 text-sm">
                <a href={`mailto:${site.contacts.paymaster.email}`} className="text-scarlet underline">
                  {site.contacts.paymaster.email}
                </a>
              </p>

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
            </Card>
          </Reveal>

          {/* Leadership roster */}
          <Reveal delay={120} className="md:col-span-2">
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Detachment Officers
              </h3>
              <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {site.officers.map((o) => (
                  <div key={o.role} className="flex justify-between gap-4 border-b border-navy/10 py-1.5">
                    <dt className="text-sm text-navy/60">{o.role}</dt>
                    <dd className="text-sm font-semibold text-navy">{o.name}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>

          <Reveal delay={160} className="md:col-span-2">
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Come See Us
              </h3>
              <p className="mt-3 text-navy/80">
                <strong>Detachment meeting:</strong> {site.meeting.schedule} at {site.meeting.venue},{" "}
                {site.meeting.address}.
              </p>
              <p className="mt-2 text-navy/80">
                <strong>Staff meeting:</strong> {site.staffMeeting.schedule} at{" "}
                {site.staffMeeting.venue}, {site.staffMeeting.address}.
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
