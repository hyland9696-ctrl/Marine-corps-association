import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "How to join St. Charles County Detachment 725 of the Marine Corps League.",
};

const steps = [
  {
    title: "Come to a Meeting",
    description: `Join us the first Wednesday of the month at 7:00 PM, ${site.meeting.venue}. Guests and prospective members are welcome.`,
  },
  {
    title: "Talk With Our Paymaster",
    description: `${site.contacts.paymaster.name} can walk you through eligibility, dues, and paperwork.`,
  },
  {
    title: "Get Sworn In",
    description: "Once your application is processed, you'll be welcomed into the detachment at an upcoming meeting.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Membership"
            title="Get Involved"
            light
            description="There's a place in Detachment 725 for every Marine, FMF Corpsman, and community supporter."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
              Who Can Join
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <Reveal>
                <Card>
                  <h3 className="font-display text-base font-semibold uppercase tracking-wide text-navy">
                    Regular Membership
                  </h3>
                  <p className="mt-2 text-sm text-navy/70">
                    Open to Marines and FMF Corpsmen (Navy corpsmen who served with the Marine
                    Corps) who received an honorable discharge, or who are currently serving.
                  </p>
                </Card>
              </Reveal>
              <Reveal delay={80}>
                <Card>
                  <h3 className="font-display text-base font-semibold uppercase tracking-wide text-navy">
                    Associate Membership
                  </h3>
                  <p className="mt-2 text-sm text-navy/70">
                    Open to family members and community supporters who want to help the
                    detachment carry out its mission, without prior Marine Corps service.
                  </p>
                </Card>
              </Reveal>
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
              How to Join
            </h2>
            <div className="mt-4 space-y-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <Card className="flex gap-4">
                    <span className="font-display text-2xl font-bold text-scarlet">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-navy">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm text-navy/70">{s.description}</p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Dues
              </h2>
              <p className="mt-4 text-navy/80 leading-relaxed">
                Dues can be paid in person at a meeting (cash, check, or credit card)
                to our Paymaster, {site.contacts.paymaster.name}. Contact us for current
                dues amounts and online payment options.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Ready to Join Us?
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                Reach out and we&rsquo;ll get you connected before your first meeting.
              </p>
              <div className="mt-6">
                <Button href="/contact">Contact Us</Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
