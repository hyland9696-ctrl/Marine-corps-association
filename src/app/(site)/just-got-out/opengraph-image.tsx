import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "The EAS is the start, not the end.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Recently separated?", title: "The EAS is the start, not the end.", subtitle: "Marines in St. Charles County who still show up" });
}
