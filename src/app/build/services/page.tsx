"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { trades, getTradeBySlug } from "@/lib/trades";
import { WizardBuildingCue } from "@/components/wizard-building-cue";

// Multi-select draws from the FULL trade list (not LIVE_TRADE_SLUGS) — a
// secondary trade only needs to exist as a service section on the site, it
// doesn't need its own canonical SmartSite to be offered here. This is also
// why this screen scales to 20-30 trades with zero redesign: it's just more
// rows in the same array.
export default function ServicesPage() {
  const router = useRouter();
  const { state, update } = useWizard();
  const [offersMultiple, setOffersMultiple] = useState<boolean | null>(
    state.secondaryTradeSlugs.length > 0 ? true : null,
  );

  useEffect(() => {
    if (!state.tradeSlug || !state.styleVariant) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, state.styleVariant, router]);

  if (!state.tradeSlug || !state.styleVariant) return null;

  const primaryTrade = getTradeBySlug(state.tradeSlug);
  if (!primaryTrade) return null;

  const otherTrades = trades.filter((t) => t.slug !== primaryTrade.slug);

  function toggleSecondary(slug: string) {
    const has = state.secondaryTradeSlugs.includes(slug);
    update({
      secondaryTradeSlugs: has
        ? state.secondaryTradeSlugs.filter((s) => s !== slug)
        : [...state.secondaryTradeSlugs, slug],
    });
  }

  function handleContinue() {
    router.push("/build/availability");
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-[#1a2f4a]">Do you offer more than one service or trade?</h1>
      <p className="mt-1 text-slate-600">
        Primary business: <span className="font-semibold text-[#1a2f4a]">{primaryTrade.name}</span> — this stays
        the main focus of your site either way.
      </p>
      <WizardBuildingCue />

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            setOffersMultiple(false);
            if (state.secondaryTradeSlugs.length > 0) update({ secondaryTradeSlugs: [] });
          }}
          className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
            offersMultiple === false
              ? "border-[#f97316] bg-[#fff7ed] text-[#1a2f4a]"
              : "border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => setOffersMultiple(true)}
          className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
            offersMultiple === true
              ? "border-[#f97316] bg-[#fff7ed] text-[#1a2f4a]"
              : "border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          Yes
        </button>
      </div>

      {offersMultiple && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-[#1a2f4a]">Select any others you offer:</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {otherTrades.map((trade) => {
              const selected = state.secondaryTradeSlugs.includes(trade.slug);
              return (
                <button
                  key={trade.slug}
                  type="button"
                  onClick={() => toggleSecondary(trade.slug)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    selected
                      ? "border-[#f97316] bg-[#fff7ed] font-semibold text-[#1a2f4a]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span>{trade.icon}</span>
                  <span className="truncate">{trade.name}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {primaryTrade.name} stays your site&apos;s main focus — anything selected here becomes an additional
            service section, not a competing identity.
          </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/build/style")}
          className="text-sm text-slate-500 hover:text-[#1a2f4a]"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={offersMultiple === null}
          className="rounded-full bg-[#f97316] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#ea6c0a] disabled:opacity-40"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
