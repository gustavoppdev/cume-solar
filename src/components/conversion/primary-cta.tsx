import { ArrowDownRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type PrimaryCtaProps = {
  size?: "cta" | "default";
  variant?: "default" | "secondary" | "outline";
  className?: string;
};

export async function PrimaryCta({ size = "cta", variant = "default", className }: PrimaryCtaProps) {
  const t = await getTranslations("Conversion.lead");
  return (
    <a href={`#${site.leadAnchor}`} className={cn(buttonVariants({ size, variant }), "group/cta", className)}>
      {t("submit")}
      <ArrowDownRight aria-hidden className="transition-transform duration-(--duration-base) ease-brand group-hover/cta:translate-x-0.5 group-hover/cta:translate-y-0.5" />
    </a>
  );
}
