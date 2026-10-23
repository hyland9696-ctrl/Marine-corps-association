import fs from "node:fs";
import path from "node:path";

// Build-time helpers for files the detachment drops into `public/`. The site
// is a static export, so these run once at build and the pages are frozen
// with whatever files existed then. Server components only.

const PUBLIC = path.join(process.cwd(), "public");

/** True if `public/<rel>` exists. `rel` has no leading slash. */
export function publicFileExists(rel: string): boolean {
  return fs.existsSync(path.join(PUBLIC, rel));
}

export type Issue = { href: string; year: number; month: number; label: string };

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Scuttlebutt issues in `public/newsletters/`, newest first. Filenames must
 * start with the issue month as `MM-YY` (the detachment's own convention, e.g.
 * `12-25 Scuttlebutt FINAL.pdf`) or `YYYY-MM`. Anything else is ignored.
 */
export function listNewsletters(): Issue[] {
  const dir = path.join(PUBLIC, "newsletters");
  if (!fs.existsSync(dir)) return [];
  const issues: Issue[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.toLowerCase().endsWith(".pdf")) continue;
    let year: number | undefined;
    let month: number | undefined;
    let m = /^(\d{2})-(\d{2})\b/.exec(file);
    if (m) {
      month = Number(m[1]);
      year = 2000 + Number(m[2]);
    } else if ((m = /^(\d{4})-(\d{2})\b/.exec(file))) {
      year = Number(m[1]);
      month = Number(m[2]);
    }
    if (!year || !month || month < 1 || month > 12) continue;
    issues.push({
      href: `/newsletters/${encodeURIComponent(file)}`,
      year,
      month,
      label: `${MONTHS[month - 1]} ${year}`,
    });
  }
  return issues.sort((a, b) => b.year - a.year || b.month - a.month);
}
