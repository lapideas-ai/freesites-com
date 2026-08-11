import { Bitter, Karla, DM_Mono } from "next/font/google";

// Landscaping · Trusted Local type system: Bitter for a warm, grounded
// slab-serif display — natural rather than corporate — Karla for a
// friendly, approachable body face, and DM Mono for understated numeric
// readouts.
export const displayFont = Bitter({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--lstl-font-display",
});

export const bodyFont = Karla({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--lstl-font-body",
});

export const monoFont = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--lstl-font-mono",
});
