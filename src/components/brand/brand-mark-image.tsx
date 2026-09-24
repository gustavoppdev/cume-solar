export function BrandMarkImage({ size, fill, stroke }: { size: number; fill: string; stroke: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" fill={fill} />
      <path d="M4 23 16 8l12 15" stroke={stroke} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M2 28h28" stroke={stroke} strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}
