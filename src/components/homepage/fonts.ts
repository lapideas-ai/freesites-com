import { Inter } from "next/font/google";

// Legacy FreeSites loads Inter from a Google Fonts <link> tag. Self-hosting
// the exact same typeface via next/font is the "modernize without changing
// identity" edit — faster delivery, same font, same brand voice.
export const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--fs-font-inter",
});
