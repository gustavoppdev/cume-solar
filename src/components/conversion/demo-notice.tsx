import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function DemoNotice({ className }: { className?: string }) {
  const t = useTranslations("Demo");
  return (
    <p className={cn("flex items-center gap-2 text-small text-muted-foreground", className)}>
      <Info aria-hidden className="size-4 shrink-0" />
      {t("conversionNotice")}
    </p>
  );
}
