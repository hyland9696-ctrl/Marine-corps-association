import type { NextConfig } from "next";

// This site is deployed as a static export (plain HTML/CSS/JS) to GoDaddy
// shared hosting. Static export runs without a Node server, so the security
// HTTP headers that used to live in `headers()` here are now served by Apache
// via `public/.htaccess` (which is copied into the export output).
//
// `trailingSlash: true` makes every route emit a folder with an index.html
// (e.g. `about/index.html`), which Apache serves natively at `/about/` with
// no rewrite rules required.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
