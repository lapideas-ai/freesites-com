"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { getTradeBySlug } from "@/lib/trades";
import { TierCards } from "@/components/homepage/TierCards";

// Pro/Growth cards now navigate straight to their pay.freesites.com
// checkout links (see TierCards.tsx) — this page no longer handles tier
// selection itself. Starter is always shown as "already on this" here
// (currentTier="starter", since the visitor already has their free
// SmartSite by this point), so no onSelect callback is needed at all.
export default function UpgradePage() {
  const router = useRouter();
  const { state } = useWizard();

  useEffect(() => {
    if (!state.tradeSlug || !state.styleVariant || !state.businessName) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, state.styleVariant, state.businessName, router]);

  if (!state.tradeSlug || !state.styleVariant || !state.businessName) return null;

  const trade = getTradeBySlug(state.tradeSlug);
  if (!trade) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Keep growing your {trade.name} SmartSite</h1>
      <p className="mt-1 text-foreground/60">
        Your FREE SmartSite is live. Upgrade any time for more reach and control.
      </p>

      <TierCards mode="upgrade" currentTier="starter" />

      <button
        type="button"
        onClick={() => router.push("/build/review")}
        className="mt-6 text-sm text-foreground/50 hover:text-foreground"
      >
        ← Back to your SmartSite
      </button>
    </div>
  );
}
