import { getFormatter, getTranslations } from "next-intl/server";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { installs } from "@/content/data";
import { SectionFrame } from "./section-frame";

export async function Installs() {
  const t = await getTranslations("Installs");
  const units = await getTranslations("Calculator.units");
  const format = await getFormatter();

  return (
    <SectionFrame id="installs" label={t("label")} title={t("title")} lead={t("lead")}>
      <table className="mt-12 w-full border-collapse text-left lg:mt-16">
        <thead>
          <tr className="border-b border-foreground">
            <th scope="col" className="label-margin pb-3 font-semibold">
              {t("headCity")}
            </th>
            <th scope="col" className="label-margin hidden pb-3 font-semibold sm:table-cell">
              {t("headDate")}
            </th>
            <th scope="col" className="label-margin pb-3 text-right font-semibold">
              {t("headPower")}
            </th>
          </tr>
        </thead>
        <Stagger as="tbody">
          {installs.map((install) => {
            const date = new Date(`${install.date}-15T12:00:00Z`);
            const month = `${format.dateTime(date, { month: "short" }).replace(".", "")}/${date.getUTCFullYear()}`;
            return (
              <StaggerItem
                as="tr"
                key={install.city}
                className="border-b border-border transition-colors duration-(--duration-base) ease-brand hover:border-foreground"
              >
                <th scope="row" className="py-5 pr-6 align-baseline font-normal">
                  <span className="text-h3">{install.city}</span>
                  <span className="mt-1 block text-small text-muted-foreground sm:hidden">{month}</span>
                </th>
                <td className="hidden py-5 pr-6 align-baseline text-muted-foreground sm:table-cell">{month}</td>
                <td className="py-5 text-right align-baseline whitespace-nowrap">
                  <span className="expanded text-h3">{format.number(install.kwp, { minimumFractionDigits: 1 })}</span>{" "}
                  <span className="ml-1 text-small text-muted-foreground">{units("power")}</span>
                </td>
              </StaggerItem>
            );
          })}
        </Stagger>
      </table>
      <p className="mt-6 max-w-2xl text-small text-muted-foreground">{t("note")}</p>
    </SectionFrame>
  );
}
