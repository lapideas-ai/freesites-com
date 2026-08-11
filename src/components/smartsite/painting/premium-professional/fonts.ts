import { Playfair_Display, Work_Sans, Space_Mono } from "next/font/google";

// Painting · Premium Professional type system: Playfair Display for a
// bright, contemporary, editorial-feeling serif display — closer to a
// design magazine than a contractor's toolbox — Work Sans for a clean
// modern body face, and Space Mono for understated numeric readouts.
export const displayFont = Playfair_Display({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--ptpp-font-display",
});

export const bodyFont = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--ptpp-font-body",
});

export const monoFont = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--ptpp-font-mono",
});
