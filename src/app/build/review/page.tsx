"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { buildBusinessDataFromWizard } from "@/lib/smartsite/hvac/build-business-data";
import { tierList } from "@/lib/tiers";
import type { StyleVariant } from "@/lib/smartsite/types";
import { FastResponseSmartSite } from "@/components/smartsite/hvac/fast-response/FastResponseSmartSite";
import { TrustedLocalSmartSite } from "@/components/smartsite/hvac/trusted-local/TrustedLocalSmartSite";
import { PremiumProfessionalSmartSite } from "@/components/smartsite/hvac/premium-professional/PremiumProfessionalSmartSite";

const STYLE_COMPONENTS: Record<StyleVariant, typeof FastResponseSmartSite> = {
  "fast-response": FastResponseSmartSite,
  "trusted-local": TrustedLocalSmartSite,
  "premium-professional": PremiumProfessionalSmartSite,
};

// This is the whole "generation" step for the demo: no AI call, no backend,
// no deploy per visitor — the canonical SmartSite renders instantly with the
// data just collected. That's a feature for a live demo (zero latency, zero
// cost, zero flakiness), not a shortcut we're hiding.
export default function ReviewPage() {
  const router = useRouter();
  const { state, update } = useWizard();

  useEffect(() => {
    if (!state.tradeSlug || !state.styleVariant || !state.businessName) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, state.styleVariant, state.businessName, router]);

  if (!state.tradeSlug || !state.styleVariant || !state.businessName) return null;

  const Component = STYLE_COMPONENTS[state.styleVariant];
  const business = buildBusinessDataFromWizard(state);
  const activeTier = tierList.find((t) => t.id === state.tier) ?? tierList[0];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Your SmartSite is live</h1>
      <p className="mt-1 text-foreground/60">
        Live in {state.city || "your city"} — no waiting, no coding. Try each
        plan below.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tierList.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => update({ tier: t.id })}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              state.tier === t.id
                ? "bg-foreground text-background"
                : "border border-foreground/15 text-foreground/70 hover:border-foreground/30"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-2 rounded-lg border border-foreground/10 p-3 text-sm">
        <div className="flex items-baseline justify-between">
          <span className="font-semibold">{activeTier.name}</span>
          <span>
            {activeTier.price}
            <span className="text-foreground/50">{activeTier.cadence}</span>
          </span>
        </div>
        <div className="mt-0.5 text-xs text-foreground/50">
          {activeTier.creditCardNote}
          {activeTier.billingNote ? ` · ${activeTier.billingNote}` : ""}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <div className="h-[520px] overflow-y-auto">
          <Component business={business} tier={state.tier} />
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-foreground/40">
        Your real SmartSite would be hosted at{" "}
        {state.businessName ? state.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "") : "yourbusiness"}
        .freesites.com — this preview is exactly what it would look like.
      </p>

      <button
        type="button"
        onClick={() => router.push("/build/personalize")}
        className="mt-6 text-sm text-foreground/50 hover:text-foreground"
      >
        ← Edit details
      </button>
    </div>
  );
}
