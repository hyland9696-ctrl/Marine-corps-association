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

## BBQ page

Add upcoming cookouts to `bbqUpcoming` in `src/lib/site.ts` (and move finished ones to `bbqRecent`). While `bbqUpcoming` is empty, the BBQ page tells visitors where dates get posted.

## Deploying

The site is a static export (`output: "export"`) hosted on GoDaddy. Run `npm run build`, then upload the contents of the `out/` folder (it includes `.htaccess` with the security headers). The build needs no network access.
