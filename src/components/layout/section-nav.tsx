"use client";

import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function SectionNav({
  className,
  onNavigate,
  orientation = "horizontal",
}: {
  className?: string;
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
}) {
  const t = useTranslations("Nav");
  const active = useActiveSection(site.sections);

  return (
    <ul className={cn("flex", orientation === "vertical" ? "flex-col gap-1" : "items-center gap-1", className)}>
      {site.sections.map((id) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={onNavigate}
            aria-current={active === id ? "location" : undefined}
            className={cn(
              "press relative block rounded-control opacity-70 transition-opacity hover:opacity-100 aria-[current=location]:opacity-100",
              orientation === "vertical" ? "px-3 py-3 text-h3" : "px-3 py-2 text-small font-medium",
            )}
          >
            {t(`links.${id}`)}
            {orientation === "horizontal" && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-(--duration-base) ease-brand [a:hover>&]:scale-x-100 [a[aria-current=location]>&]:scale-x-100"
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
