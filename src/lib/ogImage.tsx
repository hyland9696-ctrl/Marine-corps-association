import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

// Brand tokens mirrored from globals.css
const NAVY = "#0a1220";
const NAVY_LIGHT = "#12203a";
const GOLD = "#c9a349";
const SCARLET = "#8a1538";
const CREAM = "#f6f3ea";

/**
 * Social share card shared by every page: badge + eyebrow on top, the page
 * title big in the middle, meeting line along the bottom. Pages pass just
 * their own words. Renders at build time (static export), no fonts fetched.
 */
export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const titleSize = title.length > 40 ? 56 : title.length > 26 ? 66 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_LIGHT} 100%)`,
          padding: "64px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: `4px solid ${GOLD}`,
              color: GOLD,
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            725
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: GOLD, fontSize: 24, letterSpacing: 6, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
            <div style={{ display: "flex", color: CREAM, fontSize: 22, marginTop: 6, opacity: 0.8 }}>
              {site.name} · {site.org}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: CREAM,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.05,
              textTransform: "uppercase",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", color: GOLD, fontSize: 30, marginTop: 18, maxWidth: 1040 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            borderTop: `4px solid ${SCARLET}`,
            paddingTop: 24,
            color: CREAM,
            fontSize: 24,
          }}
        >
          <span style={{ display: "flex", width: 10, height: 10, background: GOLD }} />
          <span style={{ display: "flex" }}>{site.meeting.schedule} · {site.meeting.venue}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
