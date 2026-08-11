import dynamic from "next/dynamic";
import type { TradeRegistryEntry } from "@/lib/smartsite/registry";
import { lucentSample } from "@/lib/smartsite/painting/sample-data";
import { buildBusinessDataFromWizard } from "@/lib/smartsite/painting/build-business-data";

// Painting's entry in the SmartSite registry — showcase-only for now, only
// Premium Professional is built. Not in LIVE_TRADE_SLUGS, so the six-step
// funnel never reaches this trade; see registry.ts's TradeRegistryEntry
// comment for why `components` only having one key is safe.
export const paintingRegistry: TradeRegistryEntry = {
  components: {
    "premium-professional": dynamic(() =>
      import("./premium-professional/PremiumProfessionalSmartSite").then((m) => m.PremiumProfessionalSmartSite),
    ),
  },
  sample: lucentSample,
  buildBusinessDataFromWizard,
};
