import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { JsonLd } from "@/components/seo/json-ld";
import { bodyFont, displayFont } from "@/config/fonts";
import { publicPath, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-url";
import { tokenHex } from "@/lib/tokens.server";
import "../globals.css";

const noScriptCss = "[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    applicationName: t("siteName"),
    alternates: {
      canonical: publicPath(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, publicPath(l)])),
        "x-default": publicPath(routing.defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("title"),
      description: t("description"),
      locale: locale.replace("-", "_"),
      url: publicPath(locale),
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export const viewport: Viewport = {
  themeColor: tokenHex("background"),
  colorScheme: "light",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
      </head>
      <body>
        <NextIntlClientProvider>
          <MotionProvider>
            <SkipLink />
            {children}
          </MotionProvider>
        </NextIntlClientProvider>
        <JsonLd locale={locale} url={`${siteUrl}${publicPath(locale)}`} />
      </body>
    </html>
  );
}
