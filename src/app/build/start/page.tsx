"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { getTradeBySlug, LIVE_TRADE_SLUGS } from "@/lib/trades";
import { WizardBuildingCue } from "@/components/wizard-building-cue";

// Seeds tradeSlug from the ?trade= param (set by /build/page.tsx's redirect,
// or present directly on a bookmarked/shared link) — the first client
// component in the funnel, so this is the one place that has to read it.
function StartPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, update } = useWizard();

  const paramTrade = searchParams.get("trade");

  useEffect(() => {
    if (paramTrade && LIVE_TRADE_SLUGS.has(paramTrade) && state.tradeSlug !== paramTrade) {
      update({ tradeSlug: paramTrade });
    }
  }, [paramTrade, state.tradeSlug, update]);

  useEffect(() => {
    if (!paramTrade && !state.tradeSlug) {
      router.replace("/build/trade");
    }
  }, [paramTrade, state.tradeSlug, router]);

  const tradeSlug = (paramTrade && LIVE_TRADE_SLUGS.has(paramTrade)) ? paramTrade : state.tradeSlug;
  const trade = tradeSlug ? getTradeBySlug(tradeSlug) : undefined;

  if (!trade) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/build/style");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Your FREE {trade.name} SmartSite starts here.</h1>
      <p className="mt-1 text-foreground/60">
        We&apos;ll use this to save your SmartSite and send you access to it.
      </p>
      <WizardBuildingCue />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">First name</span>
          <input
            required
            type="text"
            value={state.leadFirstName}
            onChange={(e) => update({ leadFirstName: e.target.value })}
            placeholder="Jamie"
            className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Email address</span>
          <input
            required
            type="email"
            value={state.leadEmail}
            onChange={(e) => update({ leadEmail: e.target.value, email: e.target.value })}
            placeholder="you@example.com"
            className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          Continue →
        </button>
      </form>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={null}>
      <StartPageInner />
    </Suspense>
  );
}
