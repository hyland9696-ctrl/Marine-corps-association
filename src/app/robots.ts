import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // The officers' HQ page is deliberately NOT listed here: a Disallow line
    // would publish its unlisted path. It is kept out of search with a noindex
    // meta tag and an X-Robots-Tag header from its own .htaccess instead.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
