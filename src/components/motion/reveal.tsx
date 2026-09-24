"use client";

import { m } from "motion/react";
import { motionTokens } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right" | "none";
  delay?: number;
};

const offset = (from: RevealProps["from"]) => {
  const d = motionTokens.distance.reveal;
  if (from === "left") return { x: -d };
  if (from === "right") return { x: d };
  if (from === "none") return {};
  return { y: d };
};

export function Reveal({ children, className, from = "bottom", delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, ...offset(from) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: motionTokens.viewport.margin }}
      transition={{ duration: motionTokens.duration.enter, ease: motionTokens.ease.enter, delay }}
    >
      {children}
    </m.div>
  );
}
