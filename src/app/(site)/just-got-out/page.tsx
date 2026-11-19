import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card, Container } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ShareBar from "@/components/ShareBar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Just Got Out? Start Here",
  description:
    "Recently separated Marine near St. Charles County or St. Louis? Detachment 725 is Marines who still show up for each other. No minimum hours. Bring your DD-214.",
  alternates: { canonical: "/just-got-out/" },
  keywords: [
    "Marine veterans St. Charles County",
    "veteran community O'Fallon MO",
    "Marine Corps League near me",
    "after the Marine Corps",
    "Marine veterans St. Louis",
    "veterans group St. Peters MO",
  ],
};

const straight = [
  {
    q: "Is this a bunch of old guys?",
    a: "Some, yes. Vietnam through Afghanistan, all in one room. The older Marines built most of what you'll read about on this site, and they want the next generation to take it over. That's you.",
  },
  {
    q: "What's the commitment?",
    a: "None, beyond annual dues. One meeting a month if you can make it. Show up to the events you care about. Nobody counts hours.",
  },
  {
    q: "Do I have to wear a uniform or salute anybody?",
    a: "No. Meetings are jeans and a shirt. The red cover and uniform are for members who choose to do Color Guard and ceremonies.",
  },
  {
    q: "I wasn't infantry. Does that matter?",
    a: "No. Marine is Marine. FMF Corpsmen too.",
  },
  {
    q: "What do I actually get out of it?",
    a: "People who don't need the backstory explained. A reason to be somewhere once a month. Work that matters: honors for the fallen, toys for kids, scholarships, the Young Marines. And a network across St. Charles County that opens doors for jobs, housing, and VA questions.",
  },
];

export default function JustGotOutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photos/camaraderie.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <Container className="relative py-24 sm:py-32">
          <Reveal>
            <p className="font-display text-sm font-semibold tracking-[0.3em] text-gold uppercase">
              Recently separated?
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[0.95] uppercase tracking-wide sm:text-7xl">
              The EAS is the start,
              <br />
              <span className="text-gold">not the end.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
              Got out in the last few years and landed in St. Charles County? There are Marines
              here who did the same thing, and a formation that meets once a month, no strings.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/get-involved" variant="gold">
                How to join
              </Button>
              <Button href="/events" variant="outline">
                Next meeting
              </Button>
            </div>
          </Reveal>
        </Container>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-scarlet via-gold to-scarlet" />
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="max-w-prose lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Straight Answers
              </h2>
            </Reveal>
            <div className="mt-4 space-y-4">
              {straight.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <div className="border-l-2 border-gold pl-5">
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                      {item.q}
                    </h3>
                    <p className="mt-2 leading-relaxed text-navy/80">{item.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                The First Visit
              </h2>
              <p className="mt-4 leading-relaxed text-navy/80">
                {site.meeting.schedule}, {site.meeting.venue}, {site.meeting.address}. Walk in,
                tell whoever is at the door you&rsquo;re new, and they&rsquo;ll sit you with
                somebody. You don&rsquo;t need to join that night. If you want to, bring your
                DD-214 and {site.dues.annual}; that&rsquo;s the whole process.
              </p>
              <p className="mt-4 leading-relaxed text-navy/80">
                Rather text first? Email{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>{" "}
                or message the{" "}
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="underline">
                  Facebook page
                </a>{" "}
                and a Marine will get back to you.
              </p>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={150}>
              <Card>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-scarlet">
                  Next step
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-navy">
                  Come to one meeting.
                </p>
                <p className="mt-2 text-sm text-navy/70">
                  That&rsquo;s the whole ask. Add it to your calendar so it actually happens.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button href="/events" variant="primary">
                    Meeting details &amp; calendar
                  </Button>
                  <Button href="/faq" variant="outline-dark">
                    More questions
                  </Button>
                </div>
              </Card>
            </Reveal>
            <Reveal delay={220}>
              <Card>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-scarlet">
                  Also worth knowing
                </p>
                <ul className="mt-3 space-y-2 text-sm text-navy/80">
                  <li>
                    <Link href="/focus-marines" className="underline">
                      Focus Marines
                    </Link>{" "}
                    runs a free week-long transition program near St. Louis.
                  </li>
                  <li>
                    <Link href="/scholarship" className="underline">
                      {site.shortName} scholarships
                    </Link>{" "}
                    pay toward school or trade training.
                  </li>
                  <li>
                    Family members can join as{" "}
                    <Link href="/get-involved" className="underline">
                      Associate members
                    </Link>
                    .
                  </li>
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-white py-8">
        <Container>
          <ShareBar title="Just got out of the Marine Corps? There's a formation in St. Charles County." />
        </Container>
      </section>
    </>
  );
}
