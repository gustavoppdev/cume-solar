import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Calculator } from "@/components/sections/calculator";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Installs } from "@/components/sections/installs";
import { Process } from "@/components/sections/process";
import { System } from "@/components/sections/system";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <div id="top" />
      <SiteHeader overlay />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Calculator />
        <System />
        <Installs />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
