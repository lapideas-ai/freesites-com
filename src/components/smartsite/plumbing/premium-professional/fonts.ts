import { Playfair_Display, Work_Sans, IBM_Plex_Mono } from "next/font/google";

// Plumbing · Premium Professional type system: Playfair Display for an
// elegant, restrained serif display — refinement over urgency — Work Sans
// for a clean modern body face, and a light-weight IBM Plex Mono for
// understated numeric readouts.
export const displayFont = Playfair_Display({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--ppp-font-display",
});

export const bodyFont = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--ppp-font-body",
});

export const monoFont = IBM_Plex_Mono({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--ppp-font-mono",
});
