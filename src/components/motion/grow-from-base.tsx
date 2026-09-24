"use client";

import { m, type Variants } from "motion/react";
import { motionTokens } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: motionTokens.stagger.children } },
};

const bar: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: motionTokens.duration.enter, ease: motionTokens.ease.enter },
  },
};

/** Elements that grow out of a shared baseline, one after the other: chart
 *  bars, rules, dividers, an empty frame.
 *
 *  Only for elements with no text inside. `scaleY` scales the children too, so
 *  a number or a label in there is squashed flat and stretches back over the
 *  whole entrance, which reads as a broken render rather than an animation.
 *  Text that belongs with the bars goes outside this component, in a `Reveal`
 *  or a `Stagger`.
 *
 *  The row keeps its own height because only the children scale, so nothing
 *  below it moves while the animation runs. */
export function GrowFromBase({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: motionTokens.viewport.margin }}
    >
      {children}
    </m.div>
  );
}

export function GrowItem({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <m.div
      data-reveal
      className={className}
      style={{ ...style, originY: 1 }}
      variants={bar}
      aria-hidden
    />
  );
}
