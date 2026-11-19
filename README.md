# St. Charles County Detachment 725 — Marine Corps League

Marketing website for St. Charles County Detachment 725 of the Marine Corps League (St. Charles County, Missouri).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS. Fully static content — no database or backend required.

## Getting started

```bash
npm install
npm run dev
```

## Content

Site copy and contact details live in `src/lib/site.ts`. Update that file to change meeting times, contacts, or program descriptions site-wide.

## Private HQ page

The officers' page lives at an unlisted URL (`site.hqPath` in `src/lib/site.ts`; change it to rotate). It is excluded from the sitemap and marked noindex. **Add a real password** once on GoDaddy: cPanel → Files → Directory Privacy → the `hq-725-x9k4m` folder → "Password protect this directory" → add a user. cPanel writes the auth lines into that folder's `.htaccess`. The newsletter send itself is protected separately by the send secret (see `newsletter-engine/README.md`).

## Files and links to fill in

- **Photos:** drop JPGs into `public/photos/`, then run `npm run photos` once. It writes WebP copies (full size and 800px) plus `manifest.json` so pages can serve the small, fast version and never shift while loading. Commit the generated files with the JPG.
- **Newsletters:** drop Scuttlebutt PDFs into `public/newsletters/` (see its README for the filename rule). The Scuttlebutt page builds its archive from that folder.
- **Downloads:** `public/downloads/` holds the membership application, welcome packet, uniform deck, scholarship application, and golf flyer (see its README). A link only appears once the file exists.
- **Payment and social links** (all optional env vars, or paste into `src/lib/site.ts`): `NEXT_PUBLIC_PAYPAL_DUES_URL` (Pay Dues button), `NEXT_PUBLIC_GOLF_REGISTER_URL` and `NEXT_PUBLIC_GOLF_SPONSOR_URL` (golf PayPal checkouts), `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_DONATE_URL`, `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, `NEXT_PUBLIC_NEWSLETTER_ENDPOINT`.
- **Golf tournament:** update the `golf` block in `src/lib/site.ts` each year (date, fees, `golfersSoldOut`) and replace `public/photos/golf-flyer-2026.jpg`.

## BBQ page

Add upcoming cookouts to `bbqUpcoming` in `src/lib/site.ts` (and move finished ones to `bbqRecent`). While `bbqUpcoming` is empty, the BBQ page tells visitors where dates get posted.

## Deploying

The site is a static export (`output: "export"`) hosted on GoDaddy. Run `npm run build`, then upload the contents of the `out/` folder (it includes `.htaccess` with the security headers). The build needs no network access.
