import { Spectral, Sora, Space_Mono } from "next/font/google";

// Electrical · Premium Professional type system: Spectral for an elegant,
// restrained serif display — refinement over urgency — Sora for a clean
// modern body face, and Space Mono for understated numeric readouts.
export const displayFont = Spectral({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--epp-font-display",
});

export const bodyFont = Sora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--epp-font-body",
});

export const monoFont = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--epp-font-mono",
});
