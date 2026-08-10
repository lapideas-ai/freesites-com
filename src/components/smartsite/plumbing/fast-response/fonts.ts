import { Oswald, Inter, Roboto_Mono } from "next/font/google";

// Plumbing · Fast Response type system: Oswald for a tall, urgent condensed
// display face; Inter for a clean, highly legible body face; Roboto Mono for
// the live-readout numerics (response time, ratings).
export const displayFont = Oswald({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--pfr-font-display",
});

export const bodyFont = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--pfr-font-body",
});

export const monoFont = Roboto_Mono({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--pfr-font-mono",
});
