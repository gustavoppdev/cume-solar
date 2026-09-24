import hero from "@/assets/images/hero.webp";
import systemRoof from "@/assets/images/system-roof.webp";
import systemInverter from "@/assets/images/system-inverter.webp";
import contact from "@/assets/images/contact.webp";
import type { StaticImageData } from "next/image";

export type ImageSlot = {
  ratio: `${number}/${number}`;
  role: "hero" | "full" | "primary" | "card" | "avatar";
  src: StaticImageData | null;
};

export const images = {
  "hero": { ratio: "21/9", role: "hero", src: hero },
  "system-roof": { ratio: "4/5", role: "primary", src: systemRoof },
  "system-inverter": { ratio: "4/5", role: "primary", src: systemInverter },
  "contact": { ratio: "21/9", role: "full", src: contact },
} satisfies Record<string, ImageSlot>;

export type ImageName = keyof typeof images;
