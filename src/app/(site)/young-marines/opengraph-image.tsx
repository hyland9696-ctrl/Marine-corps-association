import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "St. Charles County Young Marines";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Youth Program", title: "St. Charles County Young Marines", subtitle: "Largest unit in Missouri, founded by Detachment 725" });
}
