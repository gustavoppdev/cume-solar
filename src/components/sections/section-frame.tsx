import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { SectionId } from "@/config/site";
import { cn } from "@/lib/utils";

type SectionFrameProps = {
  id: SectionId;
  label: ReactNode;
  title: string;
  lead?: string;
  children: ReactNode;
  /** The hairline above the section. Off only where the document begins. */
  rule?: boolean;
  /** Full-bleed media that closes the section, below the margin and the column. */
  closing?: ReactNode;
  className?: string;
};

/** A section of the drawing: the unit it measures in the margin, the content in the column. */
export function SectionFrame({ id, label, title, lead, children, rule = true, closing, className }: SectionFrameProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn(rule && "border-t border-border")}>
      <div
        className={cn(
          "mx-auto max-w-page px-gutter py-section lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-12",
          className,
        )}
      >
        <p className="label-margin mb-4 lg:mb-0 lg:pt-3">{label}</p>
        <div className="min-w-0">
          <Reveal>
            <h2 id={`${id}-title`} className="max-w-3xl text-h2">
              {title}
            </h2>
            {lead && <p className="mt-5 max-w-2xl text-lead text-muted-foreground">{lead}</p>}
          </Reveal>
          {children}
        </div>
      </div>
      {closing}
    </section>
  );
}

/** Units keep their own case inside an uppercase label: kWp, not KWP. */
export const labelChunks = {
  unit: (chunks: ReactNode) => <span className="normal-case">{chunks}</span>,
};
