import { getTranslations } from "next-intl/server";
import { LandingImage } from "@/components/media/landing-image";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { systemSpec } from "@/content/data";
import type { ImageName } from "@/content/images";
import { labelChunks, SectionFrame } from "./section-frame";

const figures: { image: ImageName; alt: "roofAlt" | "inverterAlt"; notes: ("modules" | "mounting" | "inverter" | "meter")[] }[] = [
  { image: "system-roof", alt: "roofAlt", notes: ["modules", "mounting"] },
  { image: "system-inverter", alt: "inverterAlt", notes: ["inverter", "meter"] },
];

export async function System() {
  const t = await getTranslations("System");

  return (
    <SectionFrame id="system" label={t.rich("label", labelChunks)} title={t("title")} lead={t("lead")}>
      <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:mt-16">
        {figures.map((figure, index) => (
          <Reveal key={figure.image} delay={index * 0.08}>
            <figure>
              <LandingImage name={figure.image} alt={t(figure.alt)} sizes="(min-width: 1280px) 30rem, (min-width: 640px) 45vw, 100vw" />
              <figcaption>
                <ol start={index * figure.notes.length + 1} className="mt-5 flex flex-col gap-3">
                  {figure.notes.map((note, noteIndex) => {
                    const number = index * figure.notes.length + noteIndex + 1;
                    return (
                      <li key={note} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-t border-border pt-3 text-small">
                        <span aria-hidden className="expanded font-semibold">
                          {String(number).padStart(2, "0")}
                        </span>
                        <span className="text-muted-foreground">{t(`notes.${note}`)}</span>
                      </li>
                    );
                  })}
                </ol>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <table className="mt-16 w-full border-collapse text-left lg:mt-20">
        <thead>
          <tr className="border-b border-foreground">
            <th scope="col" className="label-margin pb-3 font-semibold">
              {t("tableHeadItem")}
            </th>
            <th scope="col" className="label-margin pb-3 text-right font-semibold">
              {t("tableHeadSpec")}
            </th>
          </tr>
        </thead>
        <Stagger as="tbody">
          {systemSpec.map((row) => (
            <StaggerItem
              as="tr"
              key={row.key}
              className="border-b border-border transition-colors duration-(--duration-base) ease-brand hover:border-foreground"
            >
              <th scope="row" className="py-4 pr-6 align-baseline font-normal text-muted-foreground">
                {t(`spec.${row.key}`)}
              </th>
              <td className="py-4 text-right align-baseline font-medium">{row.value}</td>
            </StaggerItem>
          ))}
        </Stagger>
      </table>
      <p className="mt-6 max-w-2xl text-small text-muted-foreground">{t("note")}</p>
    </SectionFrame>
  );
}
