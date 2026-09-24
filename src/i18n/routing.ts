import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-BR"],
  defaultLocale: "pt-BR",
  localePrefix: "never",
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];

/** The public path of a page. With the prefix never shown, the locale is not part of the URL. */
export function publicPath(locale: Locale, path = "") {
  return routing.localePrefix === "never" ? path || "/" : `/${locale}${path}`;
}
