import { ImageResponse } from "next/og";
import { BrandMarkImage } from "@/components/brand/brand-mark-image";
import { tokenHex } from "@/lib/tokens.server";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: tokenHex("primary") }}>
        <BrandMarkImage size={132} fill={tokenHex("primary")} stroke={tokenHex("primary-foreground")} />
      </div>
    ),
    size,
  );
}
