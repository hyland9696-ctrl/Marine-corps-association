import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "The Scuttlebutt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Newsletter", title: "The Scuttlebutt", subtitle: "Monthly news from Detachment 725" });
}
