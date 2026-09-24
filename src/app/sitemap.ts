import type { MetadataRoute } from "next";
import { publicPath, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-url";

const paths = ["", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${publicPath(locale, path)}`,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}${publicPath(l, path)}`])),
      },
    })),
  );
}
