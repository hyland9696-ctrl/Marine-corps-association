import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { golf, scholarship, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about joining and supporting St. Charles County Detachment 725, Marine Corps League: eligibility, dues, meetings, honors, and more.",
  alternates: { canonical: "/faq/" },
};

type QA = { q: string; a: React.ReactNode };

const groups: { title: string; items: QA[] }[] = [
  {
    title: "Joining",
    items: [
      {
        q: "Who can join?",
        a: (
          <>
            Regular membership is for Marines and FMF Corpsmen who are serving or were honorably
            discharged. Associate membership is for family members and community supporters who
            want to help without prior Marine Corps service. Details on the{" "}
            <Link href="/get-involved" className="underline">
              Join page
            </Link>
            .
          </>
        ),
      },
      {
        q: "What do I need to bring?",
        a: `Your signed application, ${site.dues.annual} for first-year dues, and a copy of your DD-214. Proof of honorable service is the only requirement.`,
      },
      {
        q: "How much are dues?",
        a: `Annual dues are ${site.dues.annual}, payable at a meeting by cash, check, or card, or online for ${site.dues.annualOnline} (${site.dues.annualOnlineNote}). Life memberships are a one-time fee by age; talk with the Paymaster.`,
      },
      {
        q: "I was never a Marine. Can I still be part of this?",
        a: "Yes. Associate members are part of everything we do, from Toys for Tots to the golf tournament. Come to a meeting and introduce yourself.",
      },
      {
        q: "Do I have to wear a uniform?",
        a: (
          <>
            Not to join or attend meetings. Members who take part in ceremonies and Color Guard
            events wear the League uniform; the{" "}
            <Link href="/uniforms" className="underline">
              Uniform Overview
            </Link>{" "}
            explains it.
          </>
        ),
      },
    ],
  },
  {
    title: "Meetings",
    items: [
      {
        q: "When and where do you meet?",
        a: `${site.meeting.schedule} at ${site.meeting.venue}, ${site.meeting.address}. ${site.meeting.changeNote}`,
      },
      {
        q: "Can I show up without being a member?",
        a: "Yes. Prospective members and guests are always welcome. Just come by, or reach out ahead of time so someone can meet you at the door.",
      },
      {
        q: "What is the staff meeting?",
        a: `The officers meet separately on the ${site.staffMeeting.schedule.toLowerCase()} at ${site.staffMeeting.venue}, ${site.staffMeeting.address}, to plan detachment business.`,
      },
    ],
  },
  {
    title: "Honors and service",
    items: [
      {
        q: "How do I request the Honor Guard for a funeral or ceremony?",
        a: (
          <>
            Contact Color Guard Commander {site.colorGuard.commander} at{" "}
            <a href={`mailto:${site.colorGuard.email}`} className="underline">
              {site.colorGuard.email}
            </a>{" "}
            with the date, location, and service details. See the{" "}
            <Link href="/honor-guard" className="underline">
              Honor Guard page
            </Link>
            .
          </>
        ),
      },
      {
        q: "How do I join the Color Guard or Honor Guard?",
        a: "Any member in good standing can volunteer. Many events fall on weekdays, weekends, or holidays, so retirees and anyone with a flexible schedule are especially welcome. Reach out to the Color Guard Commander.",
      },
      {
        q: "What is the Young Marines, and who can join it?",
        a: (
          <>
            A national youth education and service program for boys and girls from age 8 through
            high school. The St. Charles County unit was founded by our members in 2021. See the{" "}
            <Link href="/young-marines" className="underline">
              Young Marines page
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "Giving",
    items: [
      {
        q: "How do I sponsor or play in the golf tournament?",
        a: (
          <>
            The tournament is {golf.date} at {golf.course}. Teams are {golf.teamFee.toLowerCase()}; hole
            sponsorships start at {golf.holeSponsor}. Everything is on the{" "}
            <Link href="/golf" className="underline">
              Golf Tournament page
            </Link>
            , or call {golf.director.name} at {golf.director.phone}.
          </>
        ),
      },
      {
        q: "Who gets the scholarship?",
        a: `Qualified applicants pursuing full-time undergraduate or technical training at an accredited institution. Awards are ${scholarship.amount}.`,
      },
      {
        q: "Can I donate without joining?",
        a: (
          <>
            Yes. Donate to the scholarship fund, bring toys for Toys for Tots, or buy lunch at a
            BBQ sale. See{" "}
            <Link href="/support" className="underline">
              Support Us
            </Link>
            .
          </>
        ),
      },
      {
        q: "Where do I mail a check?",
        a: `Make checks payable to Marine Corps League Detachment 725 and mail to ${site.mail.line1}, ${site.mail.line2}.`,
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-chevrons bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, Answered"
            light
            description="Everything people ask us before they come to a meeting, in one place."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {groups.map((g, gi) => (
              <div key={g.title} className={gi > 0 ? "mt-12" : ""}>
                <Reveal>
                  <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                    {g.title}
                  </h2>
                </Reveal>
                <div className="mt-4 space-y-3">
                  {g.items.map((item, i) => (
                    <Reveal key={item.q} delay={i * 60}>
                      <details className="group rounded-sm border border-navy/10 bg-white shadow-sm transition-shadow open:shadow-md">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-base font-semibold uppercase tracking-wide text-navy [&::-webkit-details-marker]:hidden">
                          {item.q}
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold text-gold transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <div className="border-t border-navy/10 px-5 py-4 text-sm leading-relaxed text-navy/80">
                          {item.a}
                        </div>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Didn&rsquo;t find it?
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                Ask us directly. Email{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>{" "}
                or use the contact form, and a Marine will get back to you.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href="/contact" variant="primary">
                  Contact us
                </Button>
                <Button href="/get-involved" variant="outline-dark">
                  How to join
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
