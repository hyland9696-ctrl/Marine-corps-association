import { ogImage, OG_SIZE } from "@/lib/ogImage";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${site.name}, ${site.org}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({ eyebrow: "Semper Fidelis", title: "Once a Marine, Always a Marine.", subtitle: `${site.org}, ${site.location}` });
}
