import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Young Marines",
  description:
    "The St. Charles County Young Marines is a youth leadership program founded by members of Detachment 725.",
};

const pillars = [
  {
    title: "Leadership",
    description: "Structured, disciplined activities that build confidence, teamwork, and character.",
  },
  {
    title: "Drug-Free Living",
    description: "A lifelong commitment to a healthy, drug-free lifestyle instilled from day one.",
  },
  {
    title: "Citizenship",
    description: "Community service and civic engagement that grow young people into community leaders.",
  },
];

export default function YoungMarinesPage() {
  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Youth Program"
            title="St. Charles County Young Marines"
            light
            description="A national youth education and service program, brought to life locally by Detachment 725."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-navy/80 leading-relaxed">
                The St. Charles County Young Marines was founded by three members of Detachment
                725 and one civilian volunteer. What began as a local effort has grown into the
                largest Young Marines unit in Missouri and one of the top-ranked units in the
                Midwest Regiment.
              </p>
              <p className="mt-4 text-navy/80 leading-relaxed">
                The Young Marines is a national nonprofit youth education program for boys and
                girls, promoting a physically fit, drug-free lifestyle alongside leadership and
                good citizenship. Our unit gives young people in St. Charles County the chance to
                build discipline, confidence, and community connection in a structured, mentor-led
                environment.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <Card>
                    <h3 className="font-display text-base font-semibold uppercase tracking-wide text-navy">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy/70">{p.description}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                Interested in Enrolling?
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                Get in touch with the detachment or connect with us on Facebook to learn about
                enrollment, meeting times, and how the Young Marines program can support your
                family.
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
