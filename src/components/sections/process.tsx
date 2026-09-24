import { getTranslations } from "next-intl/server";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { processSteps } from "@/content/data";
import { cn } from "@/lib/utils";
import { SectionFrame } from "./section-frame";

const totalDays = processSteps.reduce((sum, step) => sum + step.days, 0);

const ownerFill = {
  us: "bg-foreground",
  utility: "border border-foreground bg-[repeating-linear-gradient(135deg,var(--foreground)_0_1px,transparent_1px_6px)]",
} as const;

function Span({ start, days, owner }: { start: number; days: number; owner: keyof typeof ownerFill }) {
  return (
    <div aria-hidden className="relative h-4">
      <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
      <div
        className={cn("absolute inset-y-0 min-w-1", ownerFill[owner])}
        style={{ left: `${(start / totalDays) * 100}%`, width: `${(days / totalDays) * 100}%` }}
      />
    </div>
  );
}

export async function Process() {
  const t = await getTranslations("Process");
  const starts = processSteps.map((_, index) => processSteps.slice(0, index).reduce((sum, step) => sum + step.days, 0));

  return (
    <SectionFrame id="process" label={t("label")} title={t("title")} lead={t("lead")}>
      <div aria-hidden className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-small text-muted-foreground lg:mt-16">
        <span className="flex items-center gap-2">
          <span className={cn("h-3 w-6", ownerFill.us)} />
          {t("legendUs")}
        </span>
        <span className="flex items-center gap-2">
          <span className={cn("h-3 w-6", ownerFill.utility)} />
          {t("legendUtility")}
        </span>
      </div>

      <table className="mt-6 w-full table-fixed border-collapse text-left">
        <thead>
          <tr className="border-b border-foreground">
            <th scope="col" className="label-margin pb-3 font-semibold sm:w-[42%]">
              {t("headStep")}
            </th>
            <td aria-hidden className="hidden pb-3 sm:table-cell" />
            <th scope="col" className="label-margin w-28 pb-3 text-right font-semibold">
              {t("headDays")}
            </th>
          </tr>
        </thead>
        <Stagger as="tbody">
          {processSteps.map((step, index) => (
            <StaggerItem
              as="tr"
              key={step.key}
              className="border-b border-border transition-colors duration-(--duration-base) ease-brand hover:border-foreground"
            >
              <th scope="row" className="py-5 pr-6 align-top font-normal">
                <span className="block text-h3">{t(`steps.${step.key}.name`)}</span>
                <span className="mt-1 block text-small text-muted-foreground">{t(`steps.${step.key}.detail`)}</span>
                <span className="mt-4 block sm:hidden">
                  <Span start={starts[index] ?? 0} days={step.days} owner={step.owner} />
                </span>
              </th>
              <td className="hidden py-5 pr-8 align-top sm:table-cell">
                <div className="pt-1.5">
                  <Span start={starts[index] ?? 0} days={step.days} owner={step.owner} />
                </div>
              </td>
              <td className="py-5 text-right align-top whitespace-nowrap">
                <span className="expanded text-h3">{t("days", { days: step.days })}</span>
              </td>
            </StaggerItem>
          ))}
        </Stagger>
        <tfoot>
          <tr>
            <th scope="row" className="pt-5 font-normal text-muted-foreground">
              {t("total")}
            </th>
            <td aria-hidden className="hidden sm:table-cell" />
            <td className="pt-5 text-right whitespace-nowrap">
              <span className="expanded text-h3">{t("days", { days: totalDays })}</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <p className="mt-8 max-w-2xl text-small text-muted-foreground">{t("note")}</p>
    </SectionFrame>
  );
}
