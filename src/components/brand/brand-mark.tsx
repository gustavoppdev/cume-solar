/**
 * The ridge: two slopes meeting at the highest line of a roof, over the eave
 * they both land on. Drawn in line, never filled, so it belongs to the same
 * hairline language as the tables.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 23 16 8l12 15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path d="M2 28h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}
