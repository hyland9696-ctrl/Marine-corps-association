import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const title = "St. Charles County Detachment 725 | Marine Corps League";
const description =
  "Marine Corps League Detachment 725 in St. Charles County, MO: Marines and FMF Corpsmen serving veterans and the community. Meets third Thursday, O'Fallon.";

export const viewport = { themeColor: "#0a1220" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s | MCL Detachment 725",
  },
  description,
  applicationName: `${site.name}, ${site.org}`,
  keywords: [
    "Marine Corps League",
    "Detachment 725",
    "St. Charles County",
    "O'Fallon Missouri",
    "Marines",
    "veterans",
    "Young Marines",
    "Toys for Tots",
    "Marine Corps Birthday Ball",
    "FMF Corpsmen",
  ],
  // Title, description, and image fall back to each page's own metadata and
  // its opengraph-image.tsx, so every page gets a distinct share card.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${site.name}, ${site.org}`,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <head>
        {/* Without JS, scroll-reveal elements must not stay hidden. */}
        <noscript>
          <style>{`.opacity-0{opacity:1!important}.translate-y-8,.translate-y-6,.translate-y-4{transform:none!important}.animate-page-fade{animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
