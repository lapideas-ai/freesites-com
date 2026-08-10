"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { getTradeBySlug } from "@/lib/trades";
import { tiers, type TierId } from "@/lib/tiers";
import { TierCards } from "@/components/homepage/TierCards";

// Deliberately outside the numbered claim sequence (see wizard-steps.tsx) —
// this only exists once the FREE SmartSite is already complete. No real
// payment backend exists, so selecting Pro/Growth is a static confirmation
// (matching this project's existing "instant, no hidden backend" pattern),
// never a fake spinner pretending a transaction happened.
export default function UpgradePage() {
  const router = useRouter();
  const { state, update } = useWizard();
  const [selected, setSelected] = useState<TierId | null>(null);

  useEffect(() => {
    if (!state.tradeSlug || !state.styleVariant || !state.businessName) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, state.styleVariant, state.businessName, router]);

  if (!state.tradeSlug || !state.styleVariant || !state.businessName) return null;

  const trade = getTradeBySlug(state.tradeSlug);
  if (!trade) return null;

  function handleSelect(tierId: TierId) {
    if (tierId === "starter") return;
    update({ tier: tierId });
    setSelected(tierId);
  }

  if (selected) {
    const tier = tiers[selected];
    const highlightFeature = tier.features[1] ?? tier.features[0];
    return (
      <div>
        <h1 className="text-2xl font-semibold">You&apos;ve selected {tier.name}</h1>
        <p className="mt-2 text-foreground/60">
          We&apos;ll follow up to get {highlightFeature} set up for your {trade.name} SmartSite.
        </p>
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

  return (
    <div>
      <h1 className="text-2xl font-semibold">Keep growing your {trade.name} SmartSite</h1>
      <p className="mt-1 text-foreground/60">
        Your FREE SmartSite is live. Upgrade any time for more reach and control.
      </p>

      <TierCards mode="upgrade" currentTier="starter" onSelect={handleSelect} />

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
