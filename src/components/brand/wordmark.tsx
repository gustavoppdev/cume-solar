import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";

export async function Wordmark({ className }: { className?: string }) {
  const t = await getTranslations("Metadata");
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark className="size-6" />
      <span translate="no" className="expanded text-h3 font-semibold tracking-[0.12em] uppercase">
        {t("siteName")}
      </span>
    </span>
  );
}
