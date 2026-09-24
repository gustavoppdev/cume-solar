"use client";

import { m, type Variants } from "motion/react";
import { motionTokens } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: motionTokens.stagger.hero } },
};

const item: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.reveal },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.hero, ease: motionTokens.ease.enter },
  },
};

const anchor: Variants = {
  hidden: { y: motionTokens.distance.reveal / 2 },
  visible: {
    y: 0,
    transition: { duration: motionTokens.duration.hero, ease: motionTokens.ease.enter },
  },
};

export function HeroSequence({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div className={className} variants={container} initial="hidden" animate="visible">
      {children}
    </m.div>
  );
}

export function HeroItem({
  children,
  className,
  lcp = false,
}: {
  children: React.ReactNode;
  className?: string;
  lcp?: boolean;
}) {
  return (
    <m.div data-reveal className={className} variants={lcp ? anchor : item}>
      {children}
    </m.div>
  );
}
