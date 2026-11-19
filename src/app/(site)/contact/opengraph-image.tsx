import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Get In Touch";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Contact", title: "Get In Touch", subtitle: "Officers, email, mail, and where we meet" });
}
