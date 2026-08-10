"use client";

import Link from "next/link";
import { WizardProvider, useWizard } from "@/lib/wizard-context";
import { getTradeRegistry } from "@/lib/smartsite/registry";

// "Open Full Site" from the Step 6 reveal opens this in a new tab. It reads
// the same localStorage-persisted wizard state as /build/* (WizardProvider
// keys on the same "freesites:wizard" storage key), so it's a real render
// of the prospect's own personalized SmartSite — not a screenshot, not the
// generic sample data. It's outside /build's layout deliberately: no wizard
// chrome, no step indicator, full-bleed, so it reads as a website rather
// than a wizard screen.
//
// This is NOT a publicly hosted/shareable URL — it only resolves in a
// browser holding this visitor's own localStorage. No backend publishes
// anything at this stage of the funnel. Do not present this route (or link
// to it) as the business's live public address.
function FullSiteInner() {
  const { state } = useWizard();
  const registry = state.tradeSlug ? getTradeRegistry(state.tradeSlug) : undefined;

  if (!state.tradeSlug || !state.styleVariant || !state.businessName || !registry) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-foreground/60">
          We couldn&apos;t find a SmartSite to show — it may only be
          available in the browser where you built it.
        </p>
        <Link href="/build/trade" className="text-sm font-semibold text-[#f97316] hover:underline">
          Start building your FREE SmartSite →
        </Link>
      </div>
    );
  }

  const Component = registry.components[state.styleVariant];
  const business = registry.buildBusinessDataFromWizard(state);

  return (
    <div>
      <div className="sticky top-0 z-[100] flex items-center justify-between border-b border-black/10 bg-white px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-black/40">
          Preview only — not yet published
        </span>
        <Link href="/build/review" className="text-[12px] font-bold text-[#1a6bbf] hover:underline">
          ← Back to your reveal
        </Link>
      </div>
      <Component business={business} tier="starter" />
    </div>
  );
}

export default function SmartSitePreviewPage() {
  return (
    <WizardProvider>
      <FullSiteInner />
    </WizardProvider>
  );
}
