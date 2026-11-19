import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Eat Well. Do Good.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "BBQ & Food Sales", title: "Eat Well. Do Good.", subtitle: "Cookouts that fund our veterans' programs" });
}
