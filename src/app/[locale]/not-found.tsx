import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-page flex-col items-start justify-center gap-6 px-gutter py-section">
      <BrandMark className="size-12" />
      <h1 className="text-h1">{t("title")}</h1>
      <p className="max-w-xl text-lead text-muted-foreground">{t("description")}</p>
      <Link href="/" className={cn(buttonVariants({ size: "cta" }), "group/back")}>
        <ArrowLeft aria-hidden className="transition-transform duration-(--duration-base) ease-brand group-hover/back:-translate-x-1" />
        {t("backHome")}
      </Link>
    </main>
  );
}
