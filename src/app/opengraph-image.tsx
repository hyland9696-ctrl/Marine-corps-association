import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.org}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens mirrored from globals.css
const NAVY = "#0a1220";
const NAVY_LIGHT = "#12203a";
const GOLD = "#c9a349";
const SCARLET = "#8a1538";
const CREAM = "#f6f3ea";

export default function OpengraphImage() {
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
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top row: badge + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 108,
              height: 108,
              borderRadius: "50%",
              border: `4px solid ${GOLD}`,
              color: GOLD,
              fontSize: 42,
              fontWeight: 700,
            }}
          >
            725
          </div>
          <div
            style={{
              display: "flex",
              color: GOLD,
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Semper Fidelis
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: CREAM,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            St. Charles County Detachment 725
          </div>
          <div
            style={{
              display: "flex",
              color: GOLD,
              fontSize: 34,
              marginTop: 20,
            }}
          >
            {site.org} — {site.location}
          </div>
        </div>

        {/* Bottom bar: meeting info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            borderTop: `4px solid ${SCARLET}`,
            paddingTop: 28,
            color: CREAM,
            fontSize: 26,
          }}
        >
          <span style={{ display: "flex", color: GOLD }}>▪</span>
          <span style={{ display: "flex" }}>{site.meeting.schedule}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
