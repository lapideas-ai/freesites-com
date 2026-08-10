import { Barlow_Condensed, Source_Sans_3, JetBrains_Mono } from "next/font/google";

// Electrical · Fast Response type system: Barlow Condensed for a tall,
// urgent condensed display face; Source Sans 3 for a clean, highly legible
// body face; JetBrains Mono for the live-readout numerics (response time,
// ratings).
export const displayFont = Barlow_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--efr-font-display",
});

export const bodyFont = Source_Sans_3({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--efr-font-body",
});

export const monoFont = JetBrains_Mono({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--efr-font-mono",
});
