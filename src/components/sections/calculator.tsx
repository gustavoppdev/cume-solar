import { ChevronDown } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { PrimaryCta } from "@/components/conversion/primary-cta";
import { Reveal } from "@/components/motion/reveal";
import { premises } from "@/content/data";
import { CalculatorPanel } from "./calculator-panel";
import { SectionFrame } from "./section-frame";

export async function Calculator() {
  const t = await getTranslations("Calculator");
  const format = await getFormatter();
  const tariff = format.number(premises.tariffPerKwh, { style: "currency", currency: "BRL" });

  return (
    <SectionFrame id="calculator" rule={false} label={t("label")} title={t("title")} lead={t("lead")}>
      <CalculatorPanel cta={<PrimaryCta />} />

      <Reveal className="mt-16 lg:mt-20">
        <p className="max-w-2xl text-body">{t("estimateNotice")}</p>
        <details className="group mt-8 border-y border-border">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-4 transition-colors duration-(--duration-fast) hover:text-foreground [&::-webkit-details-marker]:hidden">
            <span className="text-h3">{t("premisesTitle")}</span>
            <span className="flex items-center gap-3 text-small text-muted-foreground">
              <span className="hidden sm:inline">{t("premisesDate")}</span>
              <ChevronDown
                aria-hidden
                className="size-5 text-foreground transition-transform duration-(--duration-base) ease-brand group-open:rotate-180"
              />
            </span>
          </summary>
          <div className="gap-12 pt-2 pb-8 text-small text-muted-foreground md:columns-2 [&>p]:mb-4 [&>p]:break-inside-avoid">
            <p>{t("premiseTariff", { tariff })}</p>
            <p>{t("premiseMinimum")}</p>
            <p>{t("premiseYield", { yield: premises.yieldKwhPerKwp })}</p>
            <p>
              {t("premiseInvestment", {
                low: format.number(premises.priceBrlPerWp.low, { style: "currency", currency: "BRL" }),
                high: format.number(premises.priceBrlPerWp.high, { style: "currency", currency: "BRL" }),
              })}
            </p>
            <p>{t("premiseOthers")}</p>
            <p className="sm:hidden">{t("premisesDate")}</p>
          </div>
        </details>
      </Reveal>
    </SectionFrame>
  );
}
