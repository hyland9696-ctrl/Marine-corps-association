import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Focus Marines Foundation";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Partner", title: "Focus Marines Foundation", subtitle: "Free transition program for veterans" });
}
