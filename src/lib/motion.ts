export const motionTokens = {
  duration: { enter: 0.55, hero: 0.7 },
  ease: { enter: [0.2, 0.8, 0.2, 1] as [number, number, number, number] },
  distance: { reveal: 16 },
  stagger: { children: 0.06, hero: 0.1 },
  viewport: { margin: "0px 0px -14% 0px" },
  press: { scale: 0.985 },
} as const;
