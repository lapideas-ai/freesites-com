import { Lora, Nunito_Sans, IBM_Plex_Mono } from "next/font/google";

// Plumbing · Trusted Local type system: Lora for a warm, established serif
// display — trustworthy rather than urgent — Nunito Sans for a friendly,
// approachable body face, and IBM Plex Mono for numeric readouts.
export const displayFont = Lora({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--ptl-font-display",
});

export const bodyFont = Nunito_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--ptl-font-body",
});

export const monoFont = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--ptl-font-mono",
});
