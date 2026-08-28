import type { Metadata } from "next";
import "@/components/smartsite/hvac/fast-response/fast-response.css";
import { displayFont, bodyFont, monoFont } from "@/components/smartsite/hvac/fast-response/fonts";
import * as content from "@/components/smartsite/hvac/fast-response/content";
import { ironcladSample } from "@/lib/smartsite/hvac/sample-data";
import { SiteHeader } from "@/components/smartsite/shared/sections/SiteHeader";
import { Hero } from "@/components/smartsite/shared/sections/Hero";
import { TrustStrip } from "@/components/smartsite/shared/sections/TrustStrip";
import { Services } from "@/components/smartsite/shared/sections/Services";
import { About } from "@/components/smartsite/shared/sections/About";
import { Testimonials } from "@/components/smartsite/shared/sections/Testimonials";
import { Contact } from "@/components/smartsite/shared/sections/Contact";
import { ExampleFooter } from "./ExampleFooter";

// Standalone, publicly accessible clone of the HVAC · Fast Response
// SmartSite design shown in /build/style — built as a Whop Blueprint
// source. Deliberately outside the intake flow: no wizard/session state,
// no localStorage, no searchParams. A literal route (not the dynamic
// /examples/[trade]/[style]/page.tsx) so this URL renders the design alone,
// without that route's preview toolbar/device-toggle/CTA chrome.
//
// This composes the same shared section components + content/sample data
// as FastResponseSmartSite.tsx at tier "starter" (SiteHeader through
// Contact — Scheduling/gallery/etc. only render at pro/growth, so they're
// correctly omitted here too), but swaps in ExampleFooter instead of the
// shared Footer so this one page can show different attribution wording
// without touching the shared component every other page still uses. If
// Fast Response's starter-tier section list ever changes, mirror that
// change here too.
export const metadata: Metadata = {
  title: "HVAC SmartSite Example — Fast Response Style",
  description:
    "Standalone example of the Fast Response style FreeSites SmartSite for HVAC businesses, shown with sample business content.",
};

export default function HvacFastResponseExamplePage() {
  const business = ironcladSample;

  return (
    <div>
      <div className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-[12px] font-semibold leading-snug text-amber-900">
        Demo page for illustration only. The company name, contact details, testimonials, star rating, review
        count, license number, years in business, and response time shown below are sample/example data, not a
        real business.
      </div>
      <div className={`fr-smartsite ${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
        <SiteHeader business={business} content={content.header} />
        <Hero business={business} content={content.hero} />
        <TrustStrip business={business} content={content.trustStrip} />
        <Services business={business} content={content.services} />
        <About business={business} content={content.about} />
        <Testimonials testimonials={business.testimonials} content={content.testimonials} />
        <Contact business={business} content={content.contact} />
        <ExampleFooter business={business} />
      </div>
    </div>
  );
}
