import { Fraunces, Karla, Space_Mono } from "next/font/google";

// Trusted Local type system: Fraunces for a warm, characterful display face —
// established rather than urgent — Karla for a friendly, humanist body face,
// and Space Mono for numeric readouts (a small ledger/established-business feel).
export const displayFont = Fraunces({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--tl-font-display",
});

export const bodyFont = Karla({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tl-font-body",
});

export const monoFont = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--tl-font-mono",
});
