import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { publicFileExists } from "@/lib/files";
import { downloads, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uniform Overview",
  description:
    "Marine Corps League uniform overview for Detachment 725 members: the national Uniform Class presentation and where to find the official uniform code.",
  alternates: { canonical: "/uniforms/" },
};

export default function UniformsPage() {
  const hasPdf = publicFileExists(downloads.uniformOverview);
  const href = `/${downloads.uniformOverview}`;

  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Members"
            title="Uniform Overview"
            light
            description="What to wear, and when, as a member of the Marine Corps League. The reference is the national Uniform Class presented at the 2023 National Mid-Winter Conference by Craig Reeling, National Uniform Committee Chairman."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Uniform Class Presentation
              </h2>
              {hasPdf ? (
                <Card className="mt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-display text-lg font-semibold text-navy">
                      Gain, Train, Retain: Uniform Class (17 pages)
                    </p>
                    <Button href={href} variant="primary" external>
                      Download PDF
                    </Button>
                  </div>
                  <object
                    data={href}
                    type="application/pdf"
                    className="mt-4 h-[70vh] w-full rounded-sm border border-navy/10 bg-white"
                    aria-label="Uniform Class presentation"
                  >
                    <p className="p-4 text-sm text-navy/70">
                      Your browser can&rsquo;t show the PDF here.{" "}
                      <a href={href} className="underline">
                        Open the presentation
                      </a>
                      .
                    </p>
                  </object>
                </Card>
              ) : (
                <Card className="mt-4">
                  <p className="font-display text-lg font-semibold text-navy">
                    Presentation coming soon
                  </p>
                  <p className="mt-2 text-sm text-navy/70">
                    Until it&rsquo;s posted here, ask at a meeting or contact the detachment and
                    we&rsquo;ll send it to you.
                  </p>
                  <div className="mt-4">
                    <Button href="/contact" variant="primary">
                      Contact us
                    </Button>
                  </div>
                </Card>
              )}
            </Reveal>
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Questions?
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                Our Sergeant at Arms oversees protocol and ceremonies. Ask at any meeting, or
                reach the detachment at{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
                .
              </p>
              <p className="mt-3 text-sm text-navy/70">
                The official uniform code is published by Marine Corps League National
                Headquarters.
              </p>
              <div className="mt-5">
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
