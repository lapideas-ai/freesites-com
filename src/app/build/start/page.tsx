"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { getTradeBySlug, LIVE_TRADE_SLUGS } from "@/lib/trades";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import type { StyleVariant } from "@/lib/smartsite/types";
import { WizardBuildingCue } from "@/components/wizard-building-cue";
import { reportLead } from "@/lib/report-lead";

// Seeds tradeSlug from the ?trade= param (set by /build/page.tsx's redirect,
// or present directly on a bookmarked/shared link) — the first client
// component in the funnel, so this is the one place that has to read it.
function StartPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, update } = useWizard();

  const paramTrade = searchParams.get("trade");
  const paramStyle = searchParams.get("style");
  const paramBusiness = searchParams.get("business");
  const paramCity = searchParams.get("city");
  const paramPhone = searchParams.get("phone");
  const paramTradeIsValid = Boolean(paramTrade && LIVE_TRADE_SLUGS.has(paramTrade));
  const paramStyleIsValid = Boolean(
    paramStyle &&
      paramTradeIsValid &&
      getTradeRegistry(paramTrade as string)?.components[paramStyle as StyleVariant],
  );

  useEffect(() => {
    if (paramTradeIsValid && state.tradeSlug !== paramTrade) {
      update({ tradeSlug: paramTrade });
    }
  }, [paramTrade, paramTradeIsValid, state.tradeSlug, update]);

  useEffect(() => {
    const patch: Partial<typeof state> = {};
    if (paramStyleIsValid && state.styleVariant !== paramStyle) patch.styleVariant = paramStyle as StyleVariant;
    if (paramBusiness && state.businessName !== paramBusiness) patch.businessName = paramBusiness;
    if (paramCity && state.city !== paramCity) patch.city = paramCity;
    if (paramPhone && state.phone !== paramPhone) patch.phone = paramPhone;
    if (Object.keys(patch).length > 0) update(patch);
  }, [paramBusiness, paramCity, paramPhone, paramStyle, paramStyleIsValid, state, update]);

  useEffect(() => {
    if (!paramTrade && !state.tradeSlug) {
      router.replace("/build/trade");
    }
  }, [paramTrade, state.tradeSlug, router]);

  const tradeSlug = paramTradeIsValid ? paramTrade : state.tradeSlug;
  const trade = tradeSlug ? getTradeBySlug(tradeSlug) : undefined;

  if (!trade) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reportLead({
      lead_type: "SmartSite Lead",
      page_path: "/build/start",
      email: state.leadEmail,
      first_name: state.leadFirstName,
      fields: { trade: tradeSlug },
    });
    update({ styleVariant: paramStyleIsValid ? (paramStyle as StyleVariant) : state.styleVariant });
    router.push(paramStyleIsValid ? "/build/services" : "/build/style");
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-[#1a2f4a]">Your FREE {trade.name} SmartSite starts here.</h1>
      <p className="mt-1 text-slate-600">
        We&apos;ll use this to save your SmartSite and send you access to it.
      </p>
      <WizardBuildingCue />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#1a2f4a]">First name</span>
          <input
            required
            type="text"
            value={state.leadFirstName}
            onChange={(e) => update({ leadFirstName: e.target.value })}
            placeholder="Jamie"
            className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-orange-300"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#1a2f4a]">Email address</span>
          <input
            required
            type="email"
            value={state.leadEmail}
            onChange={(e) => update({ leadEmail: e.target.value, email: e.target.value })}
            placeholder="you@example.com"
            className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-orange-300"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-full bg-[#f97316] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#ea6c0a]"
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
