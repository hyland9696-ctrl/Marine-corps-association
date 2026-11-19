import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "About Detachment 725";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Who We Are", title: "About Detachment 725", subtitle: "Marines & FMF Corpsmen, St. Charles County, MO" });
}
