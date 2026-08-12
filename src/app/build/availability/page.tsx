"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { getTradeBySlug } from "@/lib/trades";
import { WizardBuildingCue } from "@/components/wizard-building-cue";

export default function AvailabilityPage() {
  const router = useRouter();
  const { state, update } = useWizard();

  useEffect(() => {
    if (!state.tradeSlug || !state.styleVariant) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, state.styleVariant, router]);

  if (!state.tradeSlug || !state.styleVariant) return null;

  const trade = getTradeBySlug(state.tradeSlug);
  if (!trade) return null;

  const city = state.city.trim();
  const stateZip = state.stateZip.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/build/personalize");
  }

  return (
    <div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ea6c0a]">
        We&apos;re selective about local markets
      </span>
      <p className="mt-3 text-sm text-slate-600">
        Our goal is to work with only one contractor per trade in most local markets.
      </p>
      <WizardBuildingCue />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#1a2f4a]">City</span>
            <input
              required
              type="text"
              value={state.city}
              onChange={(e) => update({ city: e.target.value })}
              placeholder="Fairview"
              className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-orange-300"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#1a2f4a]">State / ZIP</span>
            <input
              required
              type="text"
              value={state.stateZip}
              onChange={(e) => update({ stateZip: e.target.value })}
              placeholder="OH 44125"
              className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-orange-300"
            />
          </label>
        </div>

        {city && stateZip && (
          <p className="text-sm font-semibold text-[#1a2f4a]">
            We&apos;ll check availability for {trade.name} in {city}, {stateZip} as we build your SmartSite.
          </p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/build/services")}
            className="text-sm text-slate-500 hover:text-[#1a2f4a]"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="rounded-full bg-[#f97316] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#ea6c0a]"
          >
            Continue →
          </button>
        </div>
      </form>
    </div>
  );
}
