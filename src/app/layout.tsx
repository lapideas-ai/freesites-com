import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmartOperatorMount } from "@/components/smart-operator-mount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Site-wide default — the effective metadata for any page that doesn't set
// its own (currently: everything except the homepage and the six built
// /trades/[slug] pages, each of which overrides title/description/canonical
// via its own page-level metadata). `title.template` reinforces the
// FreeSites brand on every page that DOES set its own title, without each
// page needing to repeat "| FreeSites" itself. No `alternates.canonical` or
// `openGraph.url` set here deliberately — either would be inherited by every
// page that doesn't override it, incorrectly self-referencing that page as
// the homepage; canonical is only ever set at the page level.
export const metadata: Metadata = {
  metadataBase: new URL("https://freesites.com"),
  title: {
    default: "FreeSites — Free SmartSites & 24/7 SmartReply for Home Service Businesses",
    template: "%s | FreeSites",
  },
  description:
    "FreeSites.com gives home service businesses a FREE SmartSite built to compete for local search, plus SmartReply Voice + SMS so you never miss a customer call — 24/7.",
  openGraph: {
    siteName: "FreeSites",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Minimal, accurate Organization entity — establishes FreeSites.com as the
// official FreeSites site/product for search engines without overreaching
// into unverifiable claims (no logo/sameAs — no suitable image asset exists
// yet in this repo to reference honestly).
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FreeSites",
  alternateName: "FreeSites.com",
  url: "https://freesites.com",
  description:
    "FreeSites builds FREE SmartSites and 24/7 SmartReply Voice + SMS response for home service businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SmartOperatorMount />
        <Script
          id="hl-external-tracking"
          src="https://pay.freesites.com/js/external-tracking.js"
          data-tracking-id="tk_d6afa53a20de4fc499b2942ebbcf272a"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </body>
    </html>
  );
}
