import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageFade from "@/components/PageFade";
import BackToTop from "@/components/BackToTop";
import { site } from "@/lib/site";

const description =
  "St. Charles County Detachment 725 of the Marine Corps League, serving Marines, FMF Corpsmen, veterans, and the St. Charles County, Missouri community through fellowship, charitable work, and patriotic service.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: `${site.name}, ${site.org}`,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/icon`,
  description,
  slogan: site.tagline,
  email: site.email,
  sameAs: [site.social.facebook, site.social.youtube],
  address: {
    "@type": "PostalAddress",
    postOfficeBoxNumber: site.mail.line1,
    addressLocality: "St. Peters",
    addressRegion: "MO",
    postalCode: "63376-0023",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: site.location,
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-scarlet focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:uppercase focus:tracking-wide focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1">
        <PageFade>{children}</PageFade>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
