import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1220",
          borderRadius: "50%",
          border: "2px solid #c9a349",
          color: "#c9a349",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        725
      </div>
    ),
    { ...size }
  );
}
