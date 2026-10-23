import Link from "next/link";
import { Button, Card, Container, Eyebrow, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import HeroSlideshow from "@/components/HeroSlideshow";
import Countdown from "@/components/Countdown";
import { listNewsletters } from "@/lib/files";
import { golf, photos, programs, scholarship, site } from "@/lib/site";

const heroPhotos = [
  "/photos/honor-guard.jpg",
  "/photos/celebration-of-lights.jpg",
  "/photos/camaraderie.jpg",
  "/photos/toys-for-tots.jpg",
];

const stats = [
  { value: "1775", label: "Marine Corps founded" },
  { value: "1937", label: "League chartered by Congress" },
  { value: "2021", label: "Young Marines unit chartered" },
  { value: scholarship.amount, label: "Scholarships awarded" },
];

const features = [
  {
    href: "/about",
    photo: "/photos/honor-guard.jpg",
    eyebrow: "Honor Guard",
    title: "The last salute, done right",
    text: "Our certified Honor Guard renders military honors for fallen Marines and veterans across St. Charles County.",
  },
  {
    href: "/golf",
    photo: "/photos/golf-flyer-2026.jpg",
    eyebrow: golf.date,
    title: "Annual fundraising golf tournament",
    text: `Four-person scramble at ${golf.course}. Every team and hole sponsor funds scholarships, Focus Marines, Toys for Tots, and the Young Marines.`,
  },
  {
    href: "/young-marines",
    photo: "/photos/family-picnic.jpg",
    eyebrow: "Youth Program",
    title: "Largest Young Marines unit in Missouri",
    text: "Founded by three of our members in 2021 and now one of the top-ranked units in the Midwest Regiment.",
  },
];

export default function HomePage() {
  const latest = listNewsletters()[0];
  const marquee = [...photos, ...photos];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-navy text-cream">
        <HeroSlideshow photos={heroPhotos} />
        <Container className="relative flex min-h-[88vh] flex-col justify-end pb-16 pt-28 sm:pb-24">
          <Reveal>
            <p className="font-display text-sm font-semibold tracking-[0.3em] text-gold uppercase">
              {site.name} · {site.org}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.95] uppercase tracking-wide sm:text-7xl lg:text-8xl">
              Once a Marine,
              <br />
              <span className="text-gold">Always a Marine.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              Marines, FMF Corpsmen, and their families in St. Charles County, Missouri, still
              serving: honors for the fallen, toys for kids, scholarships for students, and a
              formation that shows up for each other.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/get-involved" variant="gold">
                Join the League
              </Button>
              <Button href="/events" variant="outline">
                Meeting Info
              </Button>
            </div>
          </Reveal>
          <Reveal delay={200} className="mt-12 border-t border-gold/30 pt-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Countdown />
              <p className="max-w-sm text-sm text-cream/75">
                {site.meeting.schedule} · {site.meeting.venue}, {site.meeting.address}
                <span className="mt-1 block text-gold-light">{site.meeting.changeNote}</span>
              </p>
            </div>
          </Reveal>
        </Container>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-scarlet via-gold to-scarlet" />
      </section>

      {/* Stat band */}
      <section className="bg-chevrons bg-navy-light py-10 text-cream">
        <Container>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="border-l-2 border-gold pl-4">
                  <dd className="font-display text-4xl font-bold tabular-nums text-cream sm:text-5xl">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-sm text-cream/70">{s.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Mission */}
      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Our Mission</Eyebrow>
            <p className="mt-5 font-display text-2xl leading-snug text-navy sm:text-4xl">
              &ldquo;To promote the interests and preserve the traditions of the United States
              Marine Corps, to strengthen the fraternity of Marines and their families, and to
              foster love of country and fidelity to the Corps.&rdquo;
            </p>
            <p className="mt-6 text-navy/70">
              We serve Marines, FMF Corpsmen, veterans, and our community through charitable work,
              patriotic service, and fellowship.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Feature trio */}
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="On the Ground"
              title="This Is What We Do"
              description="Three of the ways Detachment 725 shows up for St. Charles County."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.href} delay={i * 100}>
                <Link
                  href={f.href}
                  className="group block h-full overflow-hidden rounded-sm bg-navy text-cream shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.photo}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                    <p className="absolute bottom-4 left-5 font-display text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                      {f.eyebrow}
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/75">{f.text}</p>
                    <span className="mt-5 inline-block font-display text-xs font-semibold tracking-[0.2em] text-gold uppercase transition-transform duration-300 group-hover:translate-x-1">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Photo marquee */}
      <section className="overflow-hidden bg-navy py-6" aria-label="Photos from the detachment">
        <div className="animate-marquee flex w-max gap-4">
          {marquee.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${p.src}-${i}`}
              src={p.src}
              alt={i < photos.length ? p.caption : ""}
              loading="lazy"
              className="h-40 w-auto rounded-sm border border-gold/20 object-cover sm:h-56"
            />
          ))}
        </div>
      </section>

      {/* All programs */}
      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Programs"
              title="Everything We Put Our Name On"
              description="From honoring our fallen to raising up the next generation, here's how Detachment 725 keeps the Corps' traditions alive."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <Link href={p.href} className="block h-full">
                  <Card className="h-full">
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy/70">{p.description}</p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Scuttlebutt + Join */}
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-sm border border-gold/30 bg-navy-light p-8">
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                The Scuttlebutt
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide">
                {latest ? `${latest.label} issue is out` : "Our monthly newsletter"}
              </h3>
              <p className="mt-3 text-cream/75">
                Meeting notes, the Commandant&rsquo;s message, upcoming events, and news from
                around the detachment, every month.
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Button href={latest ? latest.href : "/scuttlebutt"} variant="gold" external={Boolean(latest)}>
                  {latest ? "Read the latest issue" : "Read the Scuttlebutt"}
                </Button>
                <Button href="/scuttlebutt" variant="outline">
                  Archive &amp; signup
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-sm bg-scarlet p-8">
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
                Ready to Stand With Us?
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide">
                All you need is your DD-214
              </h3>
              <p className="mt-3 text-cream/85">
                Bring your signed application, {site.dues.annual}, and proof of honorable service
                to your first meeting. Community supporters are welcome as Associate members.
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Button href="/get-involved" variant="gold">
                  How to join
                </Button>
                <Button href="/support" variant="outline">
                  Support us
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
