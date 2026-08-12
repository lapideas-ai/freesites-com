"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import { WizardBuildingCue } from "@/components/wizard-building-cue";
import type { StyleVariant } from "@/lib/smartsite/types";

const STYLE_META: { id: StyleVariant; name: string; vibe: string }[] = [
  { id: "fast-response", name: "Fast Response", vibe: "Bold & urgent" },
  { id: "trusted-local", name: "Trusted Local", vibe: "Warm & established" },
  { id: "premium-professional", name: "Premium Professional", vibe: "Refined & upscale" },
];

export default function StylePage() {
  const router = useRouter();
  const { state, update } = useWizard();
  const registry = state.tradeSlug ? getTradeRegistry(state.tradeSlug) : undefined;

  useEffect(() => {
    if (!state.tradeSlug || !registry) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, registry, router]);

  if (!state.tradeSlug || !registry) return null;

  function selectStyle(id: StyleVariant) {
    update({ styleVariant: id });
    router.push("/build/services");
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-[#1a2f4a]">Pick a starting look for your SmartSite</h1>
      <p className="mt-1 text-slate-600">
        These are three recent examples — not your only choices. Pick the direction you like best.
      </p>
      <WizardBuildingCue />

      <div className="mt-6 flex flex-col gap-4">
        {STYLE_META.map(({ id, name, vibe }) => {
          const Component = registry.components[id];
          // Unreachable in practice: this page only ever renders for
          // LIVE_TRADE_SLUGS trades, which always ship all three styles.
          // Guard exists purely so `components` being Partial (to support
          // showcase-only trades) still type-checks under strict mode.
          if (!Component) return null;
          return (
            // A live SmartSite preview (including its own header button) renders
            // inside each card, so this can't be a <button> — nested buttons are
            // invalid HTML and break click behavior unpredictably. role="button"
            // + keyboard handler keeps it accessible without nesting.
            <div
              key={id}
              role="button"
              tabIndex={0}
              onClick={() => selectStyle(id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectStyle(id);
                }
              }}
              className={`cursor-pointer overflow-hidden rounded-2xl border p-1 text-left transition-colors active:scale-[0.99] ${
                state.styleVariant === id ? "border-[#f97316] ring-2 ring-[#f97316]" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="h-[210px] overflow-hidden rounded-xl">
                <div style={{ width: 1440, transform: "scale(0.3)", transformOrigin: "top left" }}>
                  <Component business={registry.sample} tier="starter" />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-semibold text-[#1a2f4a]">{name}</span>
                <span className="text-xs text-slate-500">{vibe}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4 text-center">
        <p className="text-xs leading-relaxed text-slate-600">
          Your FREE SmartSite can be personalized with your business
          information and simple color changes. Want something substantially
          different? SmartSite Pro can be custom-designed around your
          business, brand and preferences.
        </p>
        <p className="mt-2 text-xs font-medium text-slate-500">
          Don&apos;t see exactly what you want? No problem. These are
          starting points, not limits.
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/build/start")}
        className="mt-6 text-sm text-slate-500 hover:text-[#1a2f4a]"
      >
        ← Back
      </button>
    </div>
  );
}
