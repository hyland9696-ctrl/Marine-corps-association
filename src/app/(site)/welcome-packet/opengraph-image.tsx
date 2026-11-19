import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Welcome Packet";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "New Members", title: "Welcome Packet", subtitle: "Mission, officers, Devil Dogs, Honor Guard, meetings" });
}
