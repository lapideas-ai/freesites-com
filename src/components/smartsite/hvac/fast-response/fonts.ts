import { Anton, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

// Fast Response type system: Anton for blunt, urgent headlines; IBM Plex Sans
// for a technical, trustworthy body face; IBM Plex Mono for the live-readout
// numerics (response time, ratings) — a small nod to a dispatch-board feel.
export const displayFont = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--fr-font-display",
});

export const bodyFont = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--fr-font-body",
});

export const monoFont = IBM_Plex_Mono({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--fr-font-mono",
});
