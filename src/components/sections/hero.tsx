import { getTranslations } from "next-intl/server";
import { LandingImage } from "@/components/media/landing-image";
import { HeroItem, HeroSequence } from "@/components/motion/hero-sequence";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section id="hero" data-header-overlay aria-labelledby="hero-title">
      <div className="mx-auto max-w-page px-gutter pt-24 lg:pt-28">
        <HeroSequence>
          <HeroItem lcp>
            <h1
              id="hero-title"
              translate="no"
              className="expanded text-display uppercase"
            >
              {t("title")}
            </h1>
          </HeroItem>
          <HeroItem className="mt-8 flex flex-col gap-3 border-t border-foreground pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
            <span className="label-margin pt-1">{t("secondary")}</span>
            <p className="max-w-sm text-lead sm:text-right">{t("lead")}</p>
          </HeroItem>
        </HeroSequence>
      </div>
      <LandingImage
        name="hero"
        alt={t("imageAlt")}
        priority
        sizes="100vw"
        className="mt-10 w-full lg:mt-14"
      />
    </section>
  );
}
