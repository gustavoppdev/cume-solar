import { getTranslations } from "next-intl/server";
import { LandingImage } from "@/components/media/landing-image";
import { LeadForm } from "@/components/conversion/lead/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { states } from "@/content/data";
import { EstimateSummary } from "./estimate-summary";
import { SectionFrame } from "./section-frame";

const stateOptions = states.map(([value, name]) => ({ value, label: name }));

export async function Contact() {
  const t = await getTranslations("Contact");
  const lead = await getTranslations("Conversion.lead");

  return (
    <SectionFrame
      id="contact"
      label={t("label")}
      title={t("title")}
      lead={t("lead")}
      closing={<LandingImage name="contact" alt={t("imageAlt")} sizes="100vw" className="w-full" />}
    >
      <Reveal className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-12">
        <div className="lg:sticky lg:top-24">
          <EstimateSummary />
        </div>
        <div>
          <p className="mb-8 max-w-xl text-body">{lead("fields.choice.help")}</p>
          <LeadForm options={stateOptions} variant="bare" />
        </div>
      </Reveal>
    </SectionFrame>
  );
}
