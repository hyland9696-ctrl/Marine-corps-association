import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "MCL 725 Golf Tournament";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Annual Fundraiser", title: "MCL 725 Golf Tournament", subtitle: "September 19, 2026 · Bear Creek Golf Club, Wentzville" });
}
