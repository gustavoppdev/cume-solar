export const simulate = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
