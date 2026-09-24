import { Archivo } from "next/font/google";

/**
 * One family for the whole page. The contrast between display and body comes
 * from the width axis, not from a second typeface: `expanded` widens the
 * wordmark, the margin labels and the table figures; everything else runs at
 * the normal width.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const displayFont = archivo;
export const bodyFont = archivo;
