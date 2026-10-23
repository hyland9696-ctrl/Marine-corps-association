import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { publicFileExists } from "@/lib/files";
import { downloads, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Welcome Packet",
  description:
    "New-member welcome packet for St. Charles County Detachment 725: our mission, what we do, detachment staff positions, the Devil Dogs, Color Guard and Honor Guard, and meetings.",
  alternates: { canonical: "/welcome-packet/" },
};

const positions = [
  ["Commandant", "Provides overall leadership and direction for the detachment, ensuring all programs and activities uphold the values of the Marine Corps League."],
  ["Senior Vice Commandant", "Assists the Commandant and oversees membership growth and internal operations; assumes command in the Commandant's absence."],
  ["Junior Vice Commandant", "Focuses on recruitment, retention, and public relations to promote the League within the community."],
  ["Judge Advocate", "Advises the detachment on legal, bylaw, and procedural matters to ensure all activities remain compliant and fair."],
  ["Paymaster", "Manages all financial accounts, dues, and records with accuracy and transparency."],
  ["Adjutant", "Handles meeting minutes, correspondence, and administrative documentation for the detachment."],
  ["Chaplain", "Provides spiritual guidance and support for members and their families, and offers prayers at meetings and ceremonies."],
  ["Sergeant-at-Arms", "Maintains order at meetings, oversees protocol and ceremonies, and ensures proper display of the colors."],
  ["Public Relations Officer", "Promotes detachment events and activities through media, community outreach, and social platforms."],
  ["Trustees", "Serve as advisors and ensure financial accountability, reviewing books and activities on behalf of the membership."],
];

const activities = [
  "O'Fallon Celebration of Lights",
  "Toys for Tots",
  "BBQ Fundraisers",
  "Annual Golf Tournament for Scholarships",
  "Support of the Focus Marines Foundation",
  "Family BBQ for Members",
  "Hosting of the Marine Corps Birthday Ball",
  "Military Colors and Funeral Honors",
];

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 font-display text-2xl font-semibold uppercase tracking-wide text-navy first:mt-0">
      {children}
    </h2>
  );
}

export default function WelcomePacketPage() {
  const hasPdf = publicFileExists(downloads.welcomePacket);

  return (
    <>
      <section className="bg-chevrons bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="New Members"
            title="Welcome Packet"
            light
            description={`${site.org}, ${site.shortName} serves St. Charles County, Missouri, uniting Marines, FMF Corpsmen, and friends of the Corps through camaraderie, service, and tradition.`}
          />
          {hasPdf && (
            <div className="mt-8">
              <Button href={`/${downloads.welcomePacket}`} variant="gold" external>
                Download the packet (PDF)
              </Button>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="max-w-prose lg:col-span-2">
            <Reveal>
              <H2>Marine Corps League Mission Statement</H2>
              <p className="mt-4 leading-relaxed text-navy/80">
                The mission of the Marine Corps League is to promote the interest and preserve the
                traditions of the United States Marine Corps, to strengthen the fraternity of
                Marines and their families, and to foster love of country and fidelity to the
                Corps.
              </p>
              <p className="mt-4 leading-relaxed text-navy/80">
                The League is committed to serving Marines, FMF Corpsmen, veterans, and their
                communities through charitable work, patriotic service, and fellowship.
              </p>
            </Reveal>

            <Reveal>
              <H2>What We Do</H2>
              <p className="mt-4 leading-relaxed text-navy/80">
                Our detachment actively participates in events that support both our members and
                the community through these service activities, including:
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {activities.map((a) => (
                  <li key={a} className="flex gap-3 text-navy/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scarlet" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <H2>Detachment Staff Positions</H2>
              <p className="mt-4 leading-relaxed text-navy/80">
                Our detachment operates through the dedication of elected and appointed officers
                who ensure the success and strength of our organization:
              </p>
              <dl className="mt-4 divide-y divide-navy/10 rounded-sm border border-navy/10 bg-white">
                {positions.map(([role, desc]) => (
                  <div key={role} className="px-5 py-4">
                    <dt className="font-display text-sm font-semibold uppercase tracking-wide text-navy">
                      {role}
                    </dt>
                    <dd className="mt-1 text-sm text-navy/70">{desc}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-navy/70">
                These officers work together to maintain the traditions, integrity, and mission
                of the Marine Corps League. The current roster is on the{" "}
                <Link href="/contact" className="underline">
                  Contact page
                </Link>
                .
              </p>
            </Reveal>

            <Reveal>
              <H2>Military Order of the Devil Dogs (MODD)</H2>
              <p className="mt-4 leading-relaxed text-navy/80">
                The Military Order of the Devil Dogs (MODD) is the fun and honor society of the
                Marine Corps League. Membership is by invitation only and limited to League
                members in good standing.
              </p>
              <p className="mt-4 leading-relaxed text-navy/80">
                The MODD promotes camaraderie through good-natured humor while also supporting
                charitable causes such as children&rsquo;s hospitals and veterans&rsquo; programs.
                Our local Pound, the <strong>St. Charles County Dogs, Pound 086</strong>, carries
                on this proud tradition with dedication and spirit.
              </p>
            </Reveal>

            <Reveal>
              <H2>Color Guard &amp; Honor Guard</H2>
              <p className="mt-4 leading-relaxed text-navy/80">
                Our <strong>Color Guard</strong> proudly presents the colors at public events,
                parades, and ceremonies, representing the Marine Corps League with distinction.
              </p>
              <p className="mt-4 leading-relaxed text-navy/80">
                The <strong>Honor Guard</strong> provides military honors for our fallen Marines
                and veterans, ensuring that their service is recognized with dignity and respect.
              </p>
              <p className="mt-4 leading-relaxed text-navy/80">
                These teams uphold the highest traditions of the Marine Corps and the League.
                Both are looking for a few good men and women; see the{" "}
                <Link href="/about" className="underline">
                  About page
                </Link>{" "}
                to volunteer.
              </p>
            </Reveal>

            <Reveal>
              <H2>Meetings &amp; Membership</H2>
              <p className="mt-4 leading-relaxed text-navy/80">
                We meet on the <strong>{site.meeting.schedule}</strong> at {site.meeting.venue},{" "}
                {site.meeting.address}. {site.meeting.changeNote}
              </p>
            </Reveal>

            <Reveal>
              <H2>Online Resources</H2>
              <p className="mt-4 leading-relaxed text-navy/80">
                Stay connected with your fellow Marines and keep up with League news, events, and
                resources through these official websites:
              </p>
              <ul className="mt-3 space-y-2">
                {site.orgLinks.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-scarlet underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <Card>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                New Here?
              </h3>
              <p className="mt-3 text-sm text-navy/70">
                Bring your signed application, {site.dues.annual}, and a copy of your DD-214 to
                your first meeting. That&rsquo;s all it takes.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href="/get-involved" variant="primary">
                  How to join
                </Button>
                <Button href="/scuttlebutt" variant="outline-dark">
                  Read the Scuttlebutt
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
