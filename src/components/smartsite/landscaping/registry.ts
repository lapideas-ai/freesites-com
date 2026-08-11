import dynamic from "next/dynamic";
import type { TradeRegistryEntry } from "@/lib/smartsite/registry";
import { willowbrookSample } from "@/lib/smartsite/landscaping/sample-data";
import { buildBusinessDataFromWizard } from "@/lib/smartsite/landscaping/build-business-data";

// Landscaping's entry in the SmartSite registry — showcase-only for now,
// only Trusted Local is built. Not in LIVE_TRADE_SLUGS, so the six-step
// funnel never reaches this trade; see registry.ts's TradeRegistryEntry
// comment for why `components` only having one key is safe.
export const landscapingRegistry: TradeRegistryEntry = {
  components: {
    "trusted-local": dynamic(() =>
      import("./trusted-local/TrustedLocalSmartSite").then((m) => m.TrustedLocalSmartSite),
    ),
  },
  sample: willowbrookSample,
  buildBusinessDataFromWizard,
};
