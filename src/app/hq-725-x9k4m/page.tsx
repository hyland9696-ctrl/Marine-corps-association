import type { Metadata } from "next";
import MarketingHq from "@/components/MarketingHq";

export const metadata: Metadata = {
  title: "Marketing HQ",
  description: "Private internal marketing hub for Detachment 725.",
  robots: { index: false, follow: false, nocache: true },
};

export default function MarketingHqPage() {
  return <MarketingHq />;
}
