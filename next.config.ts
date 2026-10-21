import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optional separate build folder (e.g. for a local QA build running beside
  // another build); defaults to the standard .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  images: {
    // Photographs are served as WebP at high quality (90). With 90 the only
    // allowed value, every image request — including the default 75 — is
    // raised to it, so nothing ships soft or blocky.
    formats: ["image/webp"],
    qualities: [90],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
