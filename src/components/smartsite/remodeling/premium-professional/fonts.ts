import { Fraunces, Public_Sans, JetBrains_Mono } from "next/font/google";

// Remodeling · Premium Professional type system: Fraunces for an elegant,
// architectural serif display with real presence, Public Sans for a clean
// civic-feeling body face, and JetBrains Mono for understated numeric
// readouts.
export const displayFont = Fraunces({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--rmpp-font-display",
});

export const bodyFont = Public_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--rmpp-font-body",
});

export const monoFont = JetBrains_Mono({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--rmpp-font-mono",
});
