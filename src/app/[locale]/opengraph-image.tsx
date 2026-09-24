import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { createTranslator, hasLocale } from "next-intl";
import { BrandMarkImage } from "@/components/brand/brand-mark-image";
import { images } from "@/content/images";
import { routing } from "@/i18n/routing";
import { tokenHex } from "@/lib/tokens.server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function translators(requested: string | undefined) {
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    meta: createTranslator({ locale, messages, namespace: "Metadata" }),
    hero: createTranslator({ locale, messages, namespace: "Hero" }),
  };
}

/**
 * `pnpm images` writes a 1200x630 JPEG beside every hero slot, because next/og
 * cannot decode WebP. When it is there the card carries the photograph; until
 * then, and for landings whose essence is not photographic, it stays flat.
 */
async function heroPhoto() {
  const name = Object.entries(images).find(([, slot]) => slot.role === "hero" && slot.src)?.[0];
  if (!name) return null;
  try {
    const file = await readFile(join(process.cwd(), "src", "assets", "images", `${name}.og.jpg`));
    return `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function generateImageMetadata({ params }: { params?: { locale?: string } }) {
  const { meta } = await translators(params?.locale);
  return [{ id: "og", alt: meta("ogImageAlt"), size, contentType }];
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const { meta: t, hero } = await translators(locale);
  const photo = await heroPhoto();

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: tokenHex("background"),
          color: photo ? tokenHex("primary-foreground") : tokenHex("foreground"),
        }}
      >
        {photo && (
          <img src={photo} width={size.width} height={size.height} style={{ position: "absolute", top: 0, left: 0 }} alt="" />
        )}
        {photo && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: size.width,
              height: size.height,
              // A flat scrim, not a gradient: the wordmark sits at the top, the
              // headline in the middle, and both have to hold over any photo.
              background: `${tokenHex("foreground")}99`,
            }}
          />
        )}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 20 }}>
          <BrandMarkImage size={64} fill={tokenHex("primary")} stroke={tokenHex("primary-foreground")} />
          <span style={{ fontSize: 36, fontWeight: 600 }}>{t("siteName")}</span>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 960,
          }}
        >
          {hero("title")}
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            height: 12,
            width: 160,
            borderRadius: 6,
            background: photo ? tokenHex("primary-foreground") : tokenHex("primary"),
          }}
        />
      </div>
    ),
    size,
  );
}
