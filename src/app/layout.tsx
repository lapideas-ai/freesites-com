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

export const metadata: Metadata = {
  title: "FreeSites — SmartSites for Local Trades",
  description: "Build a mobile-first website for your trade business in minutes.",
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
      </body>
    </html>
  );
}
