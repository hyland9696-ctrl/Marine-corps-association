import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Lets phones "Add to Home Screen" with a proper name and icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, ${site.org}`,
    short_name: "MCL 725",
    description: "St. Charles County Detachment 725, Marine Corps League.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1220",
    theme_color: "#0a1220",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }, { src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
