import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Help Us Serve";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Support Us", title: "Help Us Serve", subtitle: "Toys for Tots, scholarships, honors, and more" });
}
