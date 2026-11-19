import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Meetings & Gatherings";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Events", title: "Meetings & Gatherings", subtitle: "Third Thursday, 7:00 PM, O'Fallon Elks Lodge" });
}
