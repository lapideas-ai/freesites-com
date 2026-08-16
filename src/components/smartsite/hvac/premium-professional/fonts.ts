import { Cormorant, Manrope, JetBrains_Mono } from "next/font/google";

// Premium Professional type system: Cormorant for a refined, light-touch
// serif display — restraint over urgency — Manrope for a clean, modern body
// face, and a light-weight JetBrains Mono for understated numeric readouts.
export const displayFont = Cormorant({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--pp-font-display",
});

// Manrope is a variable font — no weight array needed (or wanted): a fixed
// weight list forces Turbopack to resolve one static instance per weight
// during the production build, which is the exact font-resolution path that
// failed on Netlify. Loading it as a variable font is a single resolution.
export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--pp-font-body",
});

export const monoFont = JetBrains_Mono({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--pp-font-mono",
});
