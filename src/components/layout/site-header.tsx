import { getTranslations } from "next-intl/server";
import { Wordmark } from "@/components/brand/wordmark";
import { PrimaryCta } from "@/components/conversion/primary-cta";
import { cn } from "@/lib/utils";
import { HeaderShell } from "./header-shell";
import { MobileMenu } from "./mobile-menu";
import { SectionNav } from "./section-nav";

/**
 * `overlay` renders the header transparent over a full-bleed first section on the
 * server, so it does not flash solid before hydration, and pulls that section up
 * under it. Mark the section with `data-header-overlay` and give its content room
 * at the top; the shell goes solid once it scrolls past.
 */
export async function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const t = await getTranslations("Nav");

  return (
    <HeaderShell
      overlay={overlay}
      className={cn(
        overlay && "-mb-[calc(4rem+1px)]",
        "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md transition-colors duration-(--duration-base) ease-brand data-overlay:border-transparent data-overlay:bg-transparent data-overlay:backdrop-blur-none",
      )}
    >
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-gutter">
        <a href="#top" aria-label={t("home")} className="press -m-1 rounded-control p-1">
          <Wordmark />
        </a>
        <nav aria-label={t("label")} className="hidden lg:block">
          <SectionNav />
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <PrimaryCta size="default" />
          </div>
          <MobileMenu cta={<PrimaryCta />} />
        </div>
      </div>
    </HeaderShell>
  );
}
