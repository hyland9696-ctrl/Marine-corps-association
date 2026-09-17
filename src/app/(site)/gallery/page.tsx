import type { Metadata } from "next";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from St. Charles County Detachment 725 — Toys for Tots, funeral honors, the Marine Corps Birthday Ball, and life in the detachment.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-navy py-16 text-cream sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title="Our Detachment in Action"
            light
            description="Moments from our meetings, ceremonies, and community service around St. Charles County."
          />
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container>
          {photos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, i) => (
                <Reveal key={photo.src} delay={(i % 3) * 80}>
                  <figure className="group overflow-hidden rounded-sm border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm text-navy/70">
                      {photo.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <Card className="mx-auto max-w-2xl text-center">
                <p className="font-display text-5xl" aria-hidden="true">
                  🎖️
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-navy">
                  Photos Coming Soon
                </h2>
                <p className="mx-auto mt-3 max-w-md text-navy/70">
                  We&rsquo;re gathering photos from our events and ceremonies. In the meantime, the
                  latest pictures from the detachment are always on our Facebook page and YouTube
                  channel.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Button href={site.social.facebook} variant="primary" external>
                    Photos on Facebook
                  </Button>
                  <Button href={site.social.youtube} variant="outline-dark" external>
                    Watch on YouTube
                  </Button>
                </div>
              </Card>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
