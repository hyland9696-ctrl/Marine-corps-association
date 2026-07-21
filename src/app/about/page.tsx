import type { Metadata } from "next";
import { Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About St. Charles County Detachment 725 of the Marine Corps League and its leadership.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="About Us"
            title="Once a Marine, Always a Marine"
            light
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
              Who We Are
            </h2>
            <p className="mt-4 text-navy/80 leading-relaxed">
              {site.name} is a local chapter, or &ldquo;detachment,&rdquo; of the {site.org} &mdash;
              a national veterans organization chartered by an Act of Congress in 1937. We bring
              that national mission home to {site.location}, giving Marines, FMF Corpsmen, and
              their families a place to stay connected to the Corps and to each other long after
              their service ends.
            </p>
            <p className="mt-4 text-navy/80 leading-relaxed">
              Our detachment is built on fellowship and service. We gather monthly, support one
              another, and put &ldquo;Semper Fidelis&rdquo; into action through community programs
              like Toys for Tots, funeral honors for departed veterans, scholarships for
              Marine-connected students, and the St. Charles County Young Marines &mdash; a youth
              program our members founded that has grown into the largest unit in Missouri.
            </p>
            <p className="mt-4 text-navy/80 leading-relaxed">
              If you&rsquo;re a Marine or FMF Corpsman looking for your next formation, or a
              community member who wants to support veterans in St. Charles County, we&rsquo;d like
              to meet you.
            </p>

            <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
              Our Mission
            </h2>
            <blockquote className="mt-4 border-l-4 border-scarlet pl-6 text-navy/80 italic leading-relaxed">
              To promote the interests and preserve the traditions of the United States Marine
              Corps, to strengthen the fraternity of Marines and their families, and to foster
              love of country and fidelity to the Corps &mdash; serving Marines, FMF Corpsmen,
              veterans, and our community through charitable work, patriotic service, and
              fellowship.
            </blockquote>
          </Reveal>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Detachment Contacts
              </h3>
              <div className="mt-4 space-y-4 text-sm text-navy/70">
                <div>
                  <p className="font-semibold text-navy">{site.contacts.paymaster.role}</p>
                  <p>{site.contacts.paymaster.name}</p>
                  <p>{site.contacts.paymaster.note}</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">{site.contacts.editor.role}</p>
                  <p>{site.contacts.editor.name}</p>
                  <p>{site.contacts.editor.note}</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-navy/50">
                Looking for a specific officer or committee chair? Reach out through our{" "}
                <a href={site.social.facebook} className="underline" target="_blank" rel="noopener noreferrer">
                  Facebook page
                </a>{" "}
                or visit a meeting.
              </p>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
