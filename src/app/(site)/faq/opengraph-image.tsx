import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Questions, Answered";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "FAQ", title: "Questions, Answered", subtitle: "Joining, meetings, honors, and giving" });
}
