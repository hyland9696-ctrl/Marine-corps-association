import { Button, Card, Container, Eyebrow, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { programs, site } from "@/lib/site";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-cream">
        <div
          className="animate-drift pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--color-gold) 0px, var(--color-gold) 1px, transparent 1px, transparent 40px)",
          }}
        />
        <Container className="relative py-24 sm:py-32">
          <p className="font-display text-sm font-semibold tracking-[0.3em] text-gold uppercase">
            Semper Fidelis
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-wide uppercase sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-2 font-display text-xl text-gold-light sm:text-2xl">
            {site.org}, {site.location}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Marines never stop serving. We&rsquo;re a home for Marines, FMF Corpsmen, and their
            families in St. Charles County, carrying the Corps&rsquo; traditions into our
            community through fellowship, charity, and service to fellow veterans.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/get-involved">Join the League</Button>
            <Button href="/events" variant="outline">
              Meeting Info
            </Button>
          </div>
        </Container>
        <div className="h-2 w-full bg-scarlet" />
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Our Mission</Eyebrow>
            <p className="mt-4 font-display text-2xl leading-snug text-navy sm:text-3xl">
              &ldquo;To promote the interests and preserve the traditions of the United States
              Marine Corps, to strengthen the fraternity of Marines and their families, and to
              foster love of country and fidelity to the Corps.&rdquo;
            </p>
            <p className="mt-6 text-navy/70">
              We&rsquo;re committed to serving Marines, FMF Corpsmen, veterans, and our community
              through charitable work, patriotic service, and fellowship.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Serving Marines &amp; Our Community"
              description="From honoring our fallen to raising up the next generation, here's how Detachment 725 keeps the Corps' traditions alive."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <Card>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/70">{p.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-light py-14 text-cream">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Reveal>
            <p className="font-display text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              Next Meeting
            </p>
            <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {site.meeting.schedule}
            </p>
            <p className="mt-1 text-cream/80">
              {site.meeting.venue}, {site.meeting.address}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Button href="/events" variant="gold">
              Full Meeting Details
            </Button>
          </Reveal>
        </Container>
      </section>

      <section className="bg-scarlet py-16 text-cream sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal className="flex flex-col items-center gap-6">
            <h2 className="font-display text-3xl font-bold tracking-wide uppercase sm:text-4xl">
              Ready to Stand With Us?
            </h2>
            <p className="max-w-xl text-cream/90">
              Whether you&rsquo;re a Marine, an FMF Corpsman, or a community member who wants to
              support our mission. There&rsquo;s a place for you at Detachment 725.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/get-involved" variant="gold">
                Become a Member
              </Button>
              <Button href="/support" variant="outline">
                Support Us
              </Button>
            </div>
            <p className="text-sm text-cream/70">
              Questions?{" "}
              <Link href="/contact" className="underline hover:text-gold-light">
                Get in touch
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
