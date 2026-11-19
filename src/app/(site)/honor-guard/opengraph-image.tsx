import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Standing the Last Watch";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Honor Guard & Color Guard", title: "Standing the Last Watch", subtitle: "Military honors for fallen Marines and veterans" });
}
