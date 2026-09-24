"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState, type ReactNode } from "react";
import { GrowFromBase, GrowItem } from "@/components/motion/grow-from-base";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { billRange, type Connection } from "@/content/data";
import { getEstimate, setBill, setConnection, useEstimate, type Estimate } from "./estimate";
import { LiveFigure } from "./live-figure";

const connections: Connection[] = ["single", "twoPhase", "threePhase"];

export function useFigures() {
  const locale = useLocale();
  return useMemo(() => {
    const brl = new Intl.NumberFormat(locale, { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
    const whole = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const tenth = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return {
      brl: (value: number) => brl.format(value),
      whole: (value: number) => whole.format(Math.round(value)),
      tenth: (value: number) => tenth.format(value),
    };
  }, [locale]);
}

export function CalculatorPanel({ cta }: { cta: ReactNode }) {
  const t = useTranslations("Calculator");
  const figures = useFigures();
  const result = useEstimate();
  const [editing, setEditing] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const announce = (next: Estimate) =>
    setAnnouncement(
      `${t("generatedLabel")}: ${figures.brl(next.generated)}. ${t("fixedLabel")}: ${t("fixedFrom")} ${figures.brl(next.fixed)}.`,
    );

  return (
    <div className="mt-12 lg:mt-16">
      <div className="border-t border-foreground pt-4">
        <div className="flex items-baseline justify-between gap-6">
          <p className="text-h3">{t("sliderLabel")}</p>
          <p className="expanded text-stat">{figures.brl(result.bill)}</p>
        </div>
        <Slider
          className="mt-4"
          value={result.bill}
          min={billRange.min}
          max={billRange.max}
          step={billRange.step}
          largeStep={100}
          onValueChange={(value) => setBill(value)}
          onValueCommitted={() => announce(getEstimate())}
          getAriaLabel={() => t("sliderLabel")}
          getAriaValueText={(_, value) => figures.brl(value)}
        />
        <div aria-hidden className="flex justify-between text-small text-muted-foreground">
          <span>{figures.brl(billRange.min)}</span>
          <span>{figures.brl(billRange.max)}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-small">
        <p className="text-muted-foreground">{t(`assumption.${result.connection}`)}</p>
        <button
          type="button"
          aria-expanded={editing}
          aria-controls="calculator-connection"
          onClick={() => setEditing((open) => !open)}
          className="py-1 font-medium underline decoration-input underline-offset-4 transition-colors duration-(--duration-fast) hover:decoration-foreground"
        >
          {t("change")}
        </button>
      </div>

      {editing && (
        <div id="calculator-connection" className="mt-5 max-w-xl">
          <p id="calculator-connection-label" className="text-small font-medium">
            {t("connectionLabel")}
          </p>
          <RadioGroup
            aria-labelledby="calculator-connection-label"
            value={result.connection}
            onValueChange={(value) => {
              setConnection(value as Connection);
              announce(getEstimate());
            }}
            className="mt-3 grid grid-cols-3 gap-0 border border-foreground"
          >
            {connections.map((connection) => (
              <label
                key={connection}
                className="flex min-h-11 cursor-pointer items-center justify-center border-l border-foreground px-2 text-small transition-colors duration-(--duration-fast) first:border-l-0 hover:bg-muted has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-ring has-data-checked:bg-foreground has-data-checked:text-background"
              >
                <RadioGroupItem value={connection} className="sr-only" />
                {t(`connection.${connection}`)}
              </label>
            ))}
          </RadioGroup>
          <p className="mt-3 text-small text-muted-foreground">{t("connectionHelp")}</p>
        </div>
      )}

      <div className="mt-12 border-t border-border pt-8">
        <GrowFromBase className="flex h-3 items-end gap-0.5">
          <GrowItem
            className="h-full basis-0 bg-foreground transition-[flex-grow] duration-(--duration-base) ease-brand"
            style={{ flexGrow: result.generated }}
          />
          <GrowItem
            className="h-full min-w-1 basis-0 bg-primary transition-[flex-grow] duration-(--duration-base) ease-brand"
            style={{ flexGrow: result.fixed }}
          />
        </GrowFromBase>

        <dl className="mt-6 divide-y divide-border border-b border-border">
          <div className="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[minmax(0,1fr)_auto]">
            <dt className="flex items-center gap-3 text-h3">
              <span aria-hidden className="size-3 shrink-0 bg-foreground" />
              {t("generatedLabel")}
            </dt>
            <dd className="expanded text-right text-stat sm:row-span-2">
              <LiveFigure value={result.generated} format={figures.brl} />
            </dd>
            <dd className="max-w-md text-small text-muted-foreground">{t("generatedHelp")}</dd>
          </div>
          <div className="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[minmax(0,1fr)_auto]">
            <dt className="flex items-center gap-3 text-h3">
              <span aria-hidden className="size-3 shrink-0 bg-primary" />
              {t("fixedLabel")}
            </dt>
            <dd className="text-right text-primary sm:row-span-2">
              <span className="mr-3 text-small">{t("fixedFrom")}</span>
              <LiveFigure value={result.fixed} format={figures.brl} className="expanded text-stat" />
            </dd>
            <dd className="max-w-md text-small text-muted-foreground">
              {t("fixedHelp")} <span className="text-foreground">{t("fixedExtra")}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-small text-muted-foreground">{t("systemLabel")}</p>
          <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <div className="flex flex-row-reverse items-baseline gap-2">
              <dt className="text-small text-muted-foreground">{t("units.modules")}</dt>
              <dd className="expanded text-h3">
                <LiveFigure value={result.modules} format={figures.whole} />
              </dd>
            </div>
            <div className="flex flex-row-reverse items-baseline gap-2">
              <dt className="text-small text-muted-foreground">{t("units.area")}</dt>
              <dd className="expanded text-h3">
                <LiveFigure value={result.areaM2} format={figures.whole} />
              </dd>
            </div>
            <div className="flex flex-row-reverse items-baseline gap-2 text-small text-muted-foreground">
              <dt>{t("units.power")}</dt>
              <dd className="expanded">
                <LiveFigure value={result.kwp} format={figures.tenth} />
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-2 border-t border-border pt-6 sm:grid-cols-[minmax(0,1fr)_auto]">
          <p className="font-medium">{t("investmentLabel")}</p>
          <p className="expanded text-h3 sm:row-span-2 sm:text-right">
            {t.rich("investmentRange", {
              low: () => <LiveFigure value={result.investment.low} format={figures.brl} />,
              high: () => <LiveFigure value={result.investment.high} format={figures.brl} />,
            })}
          </p>
          <p className="max-w-md text-small text-muted-foreground">{t("investmentHelp")}</p>
        </div>

        <div className="mt-10">{cta}</div>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
