import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import NewsletterSignup from "@/components/NewsletterSignup";
import { listNewsletters } from "@/lib/files";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scuttlebutt Newsletter",
  description:
    "The Scuttlebutt, the monthly newsletter of St. Charles County Detachment 725, Marine Corps League. Read the latest issue and browse the archive.",
  alternates: { canonical: "/scuttlebutt/" },
};

export default function ScuttlebuttPage() {
  const issues = listNewsletters();
  const latest = issues[0];
  const years = Array.from(new Set(issues.map((i) => i.year)));

  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Newsletter"
            title="The Scuttlebutt"
            light
            description="Meeting notes, upcoming events, the Commandant's message, and news from around the detachment, every month."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Latest Issue
              </h2>
              {latest ? (
                <Card className="mt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-display text-xl font-semibold text-navy">{latest.label}</p>
                    <Button href={latest.href} variant="primary" external>
                      Download PDF
                    </Button>
                  </div>
                  <object
                    data={latest.href}
                    type="application/pdf"
                    className="mt-4 h-[70vh] w-full rounded-sm border border-navy/10 bg-white"
                    aria-label={`Scuttlebutt, ${latest.label}`}
                  >
                    <p className="p-4 text-sm text-navy/70">
                      Your browser can&rsquo;t show the PDF here.{" "}
                      <a href={latest.href} className="underline">
                        Open the {latest.label} issue
                      </a>
                      .
                    </p>
                  </object>
                </Card>
              ) : (
                <Card className="mt-4">
                  <p className="font-display text-lg font-semibold text-navy">
                    The archive is being moved over.
                  </p>
                  <p className="mt-2 text-sm text-navy/70">
                    Sign up below to get each new issue by email as soon as it goes out.
                  </p>
                </Card>
              )}
            </Reveal>

            {years.length > 0 && (
              <Reveal>
                <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                  Archive
                </h2>
                {years.map((year) => (
                  <div key={year} className="mt-6">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-scarlet">
                      {year}
                    </h3>
                    <ul className="mt-2 divide-y divide-navy/10 rounded-sm border border-navy/10 bg-white">
                      {issues
                        .filter((i) => i.year === year)
                        .map((i) => (
                          <li key={i.href}>
                            <a
                              href={i.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-4 px-5 py-3 text-sm text-navy transition-colors hover:bg-cream"
                            >
                              <span>{i.label}</span>
                              <span className="font-display text-xs font-semibold uppercase tracking-wide text-scarlet">
                                PDF
                              </span>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </Reveal>
            )}
          </div>

          <div className="space-y-6">
            <Reveal delay={150}>
              <Card>
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                  Get It by Email
                </h3>
                <p className="mt-3 text-sm text-navy/70">
                  Each issue lands in your inbox the day it goes out.
                </p>
                <div className="mt-5">
                  <NewsletterSignup endpoint={site.newsletterEndpoint} />
                </div>
              </Card>
            </Reveal>
            <Reveal delay={220}>
              <Card>
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                  Submit to the Scuttlebutt
                </h3>
                <p className="mt-3 text-sm text-navy/70">
                  {site.contacts.editor.note}: contact {site.contacts.editor.role}{" "}
                  {site.contacts.editor.name} at{" "}
                  <a href={`mailto:${site.contacts.editor.email}`} className="underline">
                    {site.contacts.editor.email}
                  </a>
                  .
                </p>
                <p className="mt-3 text-xs text-navy/60">
                  Opinions and comments that appear in the newsletter are not necessarily those of
                  the Marine Corps League or of Detachment 725 official policy.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
