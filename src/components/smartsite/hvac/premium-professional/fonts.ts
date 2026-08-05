import { Cormorant, Manrope, JetBrains_Mono } from "next/font/google";

// Premium Professional type system: Cormorant for a refined, light-touch
// serif display — restraint over urgency — Manrope for a clean, modern body
// face, and a light-weight JetBrains Mono for understated numeric readouts.
export const displayFont = Cormorant({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--pp-font-display",
});

export const bodyFont = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--pp-font-body",
});

export const monoFont = JetBrains_Mono({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--pp-font-mono",
});
