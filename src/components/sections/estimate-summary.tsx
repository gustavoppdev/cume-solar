"use client";

import { useTranslations } from "next-intl";
import { useFigures } from "./calculator-panel";
import { useEstimate } from "./estimate";

export function EstimateSummary() {
  const t = useTranslations("Calculator");
  const contact = useTranslations("Contact");
  const figures = useFigures();
  const result = useEstimate();

  const rows = [
    { label: t("sliderLabel"), value: figures.brl(result.bill) },
    { label: t("connectionLabel"), value: t(`connection.${result.connection}`) },
    { label: t("generatedLabel"), value: figures.brl(result.generated) },
    { label: t("fixedLabel"), value: `${t("fixedFrom")} ${figures.brl(result.fixed)}`, accent: true },
    {
      label: t("systemLabel"),
      value: `${result.modules}\u00a0${t("units.modules")} · ${figures.tenth(result.kwp)}\u00a0${t("units.power")}`,
    },
    {
      label: t("investmentLabel"),
      value: t.rich("investmentRange", {
        low: () => figures.brl(result.investment.low),
        high: () => figures.brl(result.investment.high),
      }),
    },
  ];

  return (
    <div className="bg-card p-6 shadow-card sm:p-8">
      <h3 className="text-h3">{contact("summaryTitle")}</h3>
      <dl className="mt-5 border-t border-foreground">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 border-b border-border py-3 min-[28rem]:flex-row min-[28rem]:items-baseline min-[28rem]:justify-between min-[28rem]:gap-6">
            <dt className="text-small text-muted-foreground">{row.label}</dt>
            <dd className={row.accent ? "expanded font-semibold whitespace-nowrap text-primary min-[28rem]:text-right" : "expanded font-semibold whitespace-nowrap min-[28rem]:text-right"}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-small text-muted-foreground">
        {contact.rich("summaryNote", {
          link: (chunks) => (
            <a href="#calculator" className="font-medium text-foreground underline decoration-input underline-offset-4 transition-colors duration-(--duration-fast) hover:decoration-foreground">
              {chunks}
            </a>
          ),
        })}
      </p>
    </div>
  );
}
