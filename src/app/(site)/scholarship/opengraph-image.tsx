import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "$1,200 Scholarships";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Scholarship", title: "$1,200 Scholarships", subtitle: "For full-time undergraduate or technical training" });
}
