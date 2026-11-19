import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Our Detachment in Action";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Gallery", title: "Our Detachment in Action", subtitle: "Photos from around St. Charles County" });
}
