// Generates WebP versions (full size + 800px wide) of every JPG/PNG in
// public/photos, and writes public/photos/manifest.json with dimensions.
// Run after adding photos:  npm run photos
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = "public/photos";
const manifest = {};
for (const f of readdirSync(dir).sort()) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const base = f.replace(/\.(jpe?g|png)$/i, "");
  const src = join(dir, f);
  const { width, height } = await sharp(src).metadata();
  await sharp(src).webp({ quality: 78 }).toFile(join(dir, `${base}.webp`));
  await sharp(src).resize({ width: Math.min(800, width) }).webp({ quality: 74 }).toFile(join(dir, `${base}-800.webp`));
  manifest[`/photos/${f}`] = { width, height };
  console.log(f, `${width}x${height}`, Math.round(statSync(src).size / 1024) + "KB ->", Math.round(statSync(join(dir, `${base}.webp`)).size / 1024) + "KB webp");
}
writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
