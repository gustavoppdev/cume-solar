"use client";

import { m, type Variants } from "motion/react";
import { motionTokens } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: motionTokens.stagger.children } },
};

const item: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.reveal },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.enter, ease: motionTokens.ease.enter },
  },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "tbody";
}) {
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: motionTokens.viewport.margin }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "tr";
}) {
  const Component = m[as];
  return (
    <Component data-reveal className={className} variants={item}>
      {children}
    </Component>
  );
}
