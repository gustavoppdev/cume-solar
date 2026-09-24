import { getTranslations } from "next-intl/server";
import { Wordmark } from "@/components/brand/wordmark";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const demo = await getTranslations("Demo");

  return (
    <footer aria-label={t("label")} className="border-t border-border">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-gutter py-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <Wordmark />
          <p className="text-small text-muted-foreground">{demo("footerNotice")}</p>
        </div>
        <div className="flex flex-col gap-2 text-small text-muted-foreground lg:items-end">
          <Link href="/privacy" className="py-0.5 underline-offset-4 hover:text-foreground hover:underline">
              {t("privacy")}
            </Link>
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
