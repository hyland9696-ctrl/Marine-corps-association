import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Join Detachment 725";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Membership", title: "Join Detachment 725", subtitle: "Bring your DD-214 and $35. That's it." });
}
