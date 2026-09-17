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
  "St. Charles County Detachment 725 of the Marine Corps League, serving Marines, FMF Corpsmen, veterans, and the St. Charles County, Missouri community through fellowship, charitable work, and patriotic service.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s | Detachment 725 Marine Corps League",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name}, ${site.org}`,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
