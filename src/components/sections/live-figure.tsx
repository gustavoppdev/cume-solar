"use client";

import { animate, m, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { motionTokens } from "@/lib/motion";

type LiveFigureProps = {
  value: number;
  format: (value: number) => string;
  className?: string;
};

/** A calculated figure: counts up when it first enters, then follows the slider. */
export function LiveFigure({ value, format, className }: LiveFigureProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: motionTokens.viewport.margin });
  const reduced = useReducedMotion();
  const entered = useRef(false);
  const motionValue = useMotionValue(value);
  const text = useTransform(motionValue, format);

  useEffect(() => {
    if (reduced || !inView) {
      motionValue.jump(value);
      return;
    }
    const first = !entered.current;
    entered.current = true;
    if (first) motionValue.jump(0);
    const controls = animate(motionValue, value, {
      duration: first ? motionTokens.duration.enter : 0.22,
      ease: motionTokens.ease.enter,
    });
    return () => controls.stop();
  }, [inView, reduced, value, motionValue]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{format(value)}</span>
      <m.span aria-hidden="true" className="tabular-nums">
        {text}
      </m.span>
    </span>
  );
}
