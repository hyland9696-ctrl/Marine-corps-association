import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageFade from "@/components/PageFade";
import BackToTop from "@/components/BackToTop";
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

export const metadata: Metadata = {
  title: {
    default: "St. Charles County Detachment 725 | Marine Corps League",
    template: "%s | Detachment 725 Marine Corps League",
  },
  description:
    "St. Charles County Detachment 725 of the Marine Corps League — serving Marines, FMF Corpsmen, veterans, and the St. Charles County, Missouri community through fellowship, charitable work, and patriotic service.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
