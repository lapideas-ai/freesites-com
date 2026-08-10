import { Bitter, Mulish, Roboto_Mono } from "next/font/google";

// Electrical · Trusted Local type system: Bitter for a warm, established
// serif display — trustworthy rather than urgent — Mulish for a friendly,
// approachable body face, and Roboto Mono for numeric readouts.
export const displayFont = Bitter({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--etl-font-display",
});

export const bodyFont = Mulish({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--etl-font-body",
});

export const monoFont = Roboto_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--etl-font-mono",
});
