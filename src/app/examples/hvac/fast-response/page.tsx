import type { Metadata } from "next";
import { getTradeRegistry } from "@/lib/smartsite/registry";

// Standalone, publicly accessible clone of the HVAC · Fast Response
// SmartSite design shown in /build/style — built as a Whop Blueprint
// source. Deliberately outside the intake flow: no wizard/session state,
// no localStorage, no searchParams. A literal route (not the dynamic
// /examples/[trade]/[style]/page.tsx) so this URL renders the design alone,
// without that route's preview toolbar/device-toggle/CTA chrome.
//
// Renders the exact same component + sample data used by the /build/style
// selector — do not fork or restyle it here. The banner below only
// annotates the page; it does not alter the SmartSite itself.
export const metadata: Metadata = {
  title: "HVAC SmartSite Example — Fast Response Style",
  description:
    "Standalone example of the Fast Response style FreeSites SmartSite for HVAC businesses, shown with sample business content.",
};

export default function HvacFastResponseExamplePage() {
  const registry = getTradeRegistry("hvac");
  const FastResponse = registry?.components["fast-response"];
  if (!registry || !FastResponse) {
    throw new Error("HVAC fast-response SmartSite is not registered");
  }

  return (
    <div>
      <div className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-[12px] font-semibold leading-snug text-amber-900">
        Demo page for illustration only. The company name, contact details, testimonials, star rating, review
        count, license number, years in business, and response time shown below are sample/example data, not a
        real business.
      </div>
      <FastResponse business={registry.sample} tier="starter" />
    </div>
  );
}
