import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Honor Guard",
  description:
    "Detachment 725's certified Honor Guard renders military honors for fallen Marines and veterans, and our Color Guard presents the colors at ceremonies across St. Charles County. Request honors or volunteer.",
  alternates: { canonical: "/honor-guard/" },
};

export default function HonorGuardPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/honor-guard.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30" />
        <Container className="relative py-24 sm:py-32">
          <SectionHeading
            eyebrow="Honor Guard &amp; Color Guard"
            title="Standing the Last Watch"
            light
            description="Our certified Honor Guard renders military honors for fallen Marines and veterans. Our Color Guard presents the colors at parades, dedications, and ceremonies across St. Charles County."
          />
        </Container>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-scarlet via-gold to-scarlet" />
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="max-w-prose lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Request Military Honors
              </h2>
              <p className="mt-4 leading-relaxed text-navy/80">
                If a Marine or veteran in your family has passed, our Honor Guard can render
                honors at the service: the flag, the colors, and the final salute, carried out
                with the dignity their service earned. There is no charge.
              </p>
              <p className="mt-4 leading-relaxed text-navy/80">
                Contact Color Guard Commander {site.colorGuard.commander} as early as you can with
                the date, time, location, and the name and branch of the deceased. We will confirm
                availability and coordinate with the funeral home.
              </p>
              <div className="mt-6">
                <Button href={`mailto:${site.colorGuard.email}?subject=Honor%20Guard%20request`} variant="primary" external>
                  Email {site.colorGuard.commander}
                </Button>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Request the Color Guard
              </h2>
              <p className="mt-4 leading-relaxed text-navy/80">
                Schools, cities, veterans&rsquo; organizations, and community events can request
                the Color Guard to present the colors. Send the event details to the Color Guard
                Commander and we will do our best to be there.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Join the Guard
              </h2>
              <p className="mt-4 leading-relaxed text-navy/80">
                We are looking for a few good men and women. Many of our current members are no
                longer able to participate, and the calls keep coming. If you are retired, or can
                get a day off once in a while, we could use you; many events fall on weekends and
                holidays. Any member in good standing can volunteer, and we will train you.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href={`mailto:${site.colorGuard.email}?subject=Joining%20the%20Color%20Guard`} variant="outline-dark" external>
                  Volunteer
                </Button>
                <Button href="/get-involved" variant="outline-dark">
                  Not a member yet?
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={150}>
              <Card>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-scarlet">
                  Color Guard Commander
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-navy">{site.colorGuard.commander}</p>
                <p className="mt-2 text-sm">
                  <a href={`mailto:${site.colorGuard.email}`} className="text-scarlet underline">
                    {site.colorGuard.email}
                  </a>
                </p>
                <p className="mt-4 text-xs text-navy/60">
                  Detachment mail: {site.mail.line1}, {site.mail.line2}
                </p>
              </Card>
            </Reveal>
            <Reveal delay={220}>
              <figure className="overflow-hidden rounded-sm border border-navy/10 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photos/honor-guard.jpg" alt="Detachment 725 Honor Guard presenting the colors" className="w-full" loading="lazy" />
                <figcaption className="px-4 py-3 text-xs text-navy/70">
                  The Honor Guard presenting the colors at a detachment event.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
