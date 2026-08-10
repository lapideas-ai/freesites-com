import dynamic from "next/dynamic";
import type { TradeRegistryEntry } from "@/lib/smartsite/registry";
import { bluewaterSample } from "@/lib/smartsite/plumbing/sample-data";
import { buildBusinessDataFromWizard } from "@/lib/smartsite/plumbing/build-business-data";

// Plumbing's entry in the SmartSite registry — colocated with its
// components so adding a new trade never requires touching another
// trade's files, only the central aggregator at src/lib/smartsite/registry.ts.
export const plumbingRegistry: TradeRegistryEntry = {
  components: {
    "fast-response": dynamic(() =>
      import("./fast-response/FastResponseSmartSite").then((m) => m.FastResponseSmartSite),
    ),
    "trusted-local": dynamic(() =>
      import("./trusted-local/TrustedLocalSmartSite").then((m) => m.TrustedLocalSmartSite),
    ),
    "premium-professional": dynamic(() =>
      import("./premium-professional/PremiumProfessionalSmartSite").then((m) => m.PremiumProfessionalSmartSite),
    ),
  },
  sample: bluewaterSample,
  buildBusinessDataFromWizard,
};
