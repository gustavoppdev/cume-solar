export type ConversionType = "whatsapp" | "lead" | "sale";

export const site = {
  conversion: "lead" as ConversionType,
  sections: ["calculator", "system", "installs", "process", "contact"],
  leadAnchor: "contact",
} as const;

export type SectionId = (typeof site.sections)[number];

const _leadAnchorIsASection: SectionId = site.leadAnchor;
void _leadAnchorIsASection;
