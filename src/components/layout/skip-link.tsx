import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("Nav");
  return (
    <a
      href="#main"
      className="sr-only rounded-control bg-primary px-4 py-3 text-small font-medium text-primary-foreground shadow-overlay focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100]"
    >
      {t("skipToContent")}
    </a>
  );
}
