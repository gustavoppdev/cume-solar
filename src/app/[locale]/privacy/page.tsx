import type { Metadata } from "next";
import { publicPath, type Locale } from "@/i18n/routing";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { Wordmark } from "@/components/brand/wordmark";
import { SiteFooter } from "@/components/layout/site-footer";
import { Link } from "@/i18n/navigation";

const sections = ["what", "data", "cookies", "images", "numbers", "contact"] as const;
const UPDATED = new Date("2026-09-23");

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "Privacy" });
  return { title: t("title"), alternates: { canonical: publicPath(locale as Locale, "/privacy") } };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Privacy");
  const nav = await getTranslations("Nav");
  const format = await getFormatter();

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-page items-center px-gutter">
          <Link href="/" aria-label={nav("home")} className="press -m-1 rounded-control p-1">
            <Wordmark />
          </Link>
        </div>
      </header>
      <main id="main" className="mx-auto flex max-w-3xl flex-col gap-10 px-gutter py-section">
        <div className="flex flex-col gap-3">
          <h1 className="text-h1">{t("title")}</h1>
          <p className="text-muted-foreground">{t("updated", { date: format.dateTime(UPDATED, { dateStyle: "long" }) })}</p>
        </div>
        {sections.map((section) => (
          <section key={section} aria-labelledby={`privacy-${section}`} className="flex flex-col gap-3">
            <h2 id={`privacy-${section}`} className="text-h3">
              {t(`sections.${section}.title`)}
            </h2>
            <p className="text-muted-foreground">{t(`sections.${section}.body`)}</p>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
