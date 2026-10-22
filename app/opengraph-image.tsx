import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Level141 | Growth Architecture for People & Organizations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const svg = await readFile(path.join(process.cwd(), "public/brand/level141-lockup-white.svg"), "utf8");
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg.replace(/#000000/g, "#FFFFFF")).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#FFFFFF",
          padding: "72px 80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={420} height={66} alt="Level141" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, letterSpacing: -3, lineHeight: 1.02 }}>Growth Architecture</div>
          <div style={{ fontSize: 76, letterSpacing: -3, lineHeight: 1.02, color: "#FFFFFF" }}>
            for People &amp; Organizations.
          </div>
        </div>
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255, 255, 255, 0.64)" }}>
          Level141 — Growth by Design
        </div>
      </div>
    ),
    size,
  );
}
