import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { downloads, site } from "@/lib/site";
import { publicFileExists } from "@/lib/files";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "How to join St. Charles County Detachment 725 of the Marine Corps League.",
};

const steps = [
  {
    title: "Come to a Meeting",
    description: `Join us the third Thursday of the month at 7:00 PM, ${site.meeting.venue}. Guests and prospective members are welcome.`,
  },
  {
    title: "Bring Three Things",
    description: `Your signed application, ${site.dues.annual} for first-year dues, and a copy of your DD-214. That's all you need; proof of honorable service is the only requirement.`,
  },
  {
    title: "Get Sworn In",
    description: "Once your application is processed, you'll be welcomed into the detachment at an upcoming meeting.",
  },
];

export default function GetInvolvedPage() {
  const hasApplication = publicFileExists(downloads.membershipApplication);
  return (
    <>
      <section className="bg-chevrons bg-navy py-16 text-cream sm:py-24">
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
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Why Bother?
              </h2>
              <p className="mt-4 max-w-prose leading-relaxed text-navy/80">
                Straight answer: because the people who get it are here. Nobody asks you to
                explain. You get a formation that shows up, work that matters, and a reason to put
                the cover back on a few times a year.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["Your people", "Marines and Docs from every era, one room, once a month. Bring your family."],
                  ["Real work", "Honors for the fallen, toys for kids, scholarships, a youth unit we built from scratch."],
                  ["Your terms", "No minimum hours. Show up when you can; the door is open when you can't."],
                ].map(([t, d]) => (
                  <div key={t} className="border-l-2 border-gold pl-4">
                    <p className="font-display text-base font-semibold uppercase tracking-wide text-navy">{t}</p>
                    <p className="mt-1 text-sm text-navy/70">{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
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
                Membership Application
              </h2>
              <Card className="mt-4">
                <p className="font-display text-lg font-semibold text-navy">
                  Marine Corps League Application for Membership
                </p>
                <p className="mt-2 text-sm text-navy/70">
                  Print it, fill it out, and bring it to your first meeting with {site.dues.annual}{" "}
                  and your DD-214. Apply to the <strong>St. Charles County #725</strong> Detachment.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {hasApplication ? (
                    <Button href={`/${downloads.membershipApplication}`} variant="primary" external>
                      Download application (PDF)
                    </Button>
                  ) : (
                    <Button href="/contact" variant="primary">
                      Request an application
                    </Button>
                  )}
                  <Button href="/welcome-packet" variant="outline-dark">
                    Read the welcome packet
                  </Button>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                Dues
              </h2>
              <p className="mt-4 text-navy/80 leading-relaxed">
                Annual dues are <strong>{site.dues.annual}</strong>, payable at a meeting by cash,
                check, or credit card, or online by PayPal for {site.dues.annualOnline} (
                {site.dues.annualOnlineNote}). To upgrade to a life membership, talk with our
                Paymaster, {site.contacts.paymaster.name}.
              </p>
              {site.dues.payUrl && (
                <div className="mt-4">
                  <Button href={site.dues.payUrl} variant="primary" external>
                    Pay dues online ({site.dues.annualOnline})
                  </Button>
                </div>
              )}
              <h3 className="mt-6 font-display text-base font-semibold uppercase tracking-wide text-navy">
                Life Membership (one-time fee)
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {site.dues.rows.map(([age, fee]) => (
                  <div key={age} className="rounded-sm border border-navy/10 bg-white p-3 text-center">
                    <div className="text-xs text-navy/70">Age {age}</div>
                    <div className="font-display text-lg font-bold text-navy">{fee}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={150}>
              <Card>
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                  Ready to Join Us?
                </h3>
                <p className="mt-3 text-sm text-navy/70">
                  For information, contact {site.recruiting.role} {site.recruiting.name} at{" "}
                  <a href={`tel:${site.recruiting.phone.replace(/\D/g, "")}`} className="underline">
                    {site.recruiting.phone}
                  </a>
                  , or send us a note.
                </p>
                <div className="mt-6">
                  <Button href="/contact">Contact Us</Button>
                </div>
              </Card>
            </Reveal>
            <Reveal delay={220}>
              <figure className="overflow-hidden rounded-sm border border-navy/10 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/recruiting-poster.jpg"
                  alt={`I want you for the Marine Corps League. For information contact ${site.recruiting.role} ${site.recruiting.name}, ${site.recruiting.phone}. Once a Marine, always a Marine.`}
                  className="w-full"
                  loading="lazy"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
