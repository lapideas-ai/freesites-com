"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trades, LIVE_TRADE_SLUGS } from "@/lib/trades";
import { useWizard } from "@/lib/wizard-context";

export default function TradePage() {
  const router = useRouter();
  const { update } = useWizard();
  const [votedSlug, setVotedSlug] = useState<string | null>(null);

  function selectTrade(slug: string) {
    update({ tradeSlug: slug, styleVariant: null });
    router.push("/build/start");
  }

  const liveTrades = trades.filter((t) => LIVE_TRADE_SLUGS.has(t.slug));
  const unbuiltTrades = trades.filter((t) => !LIVE_TRADE_SLUGS.has(t.slug));

  return (
    <div>
      <h1 className="text-2xl font-semibold">What&apos;s your trade?</h1>
      <p className="mt-1 text-foreground/60">
        We&apos;ll tailor your site to your business.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {liveTrades.map((trade) => (
          <button
            key={trade.slug}
            type="button"
            onClick={() => selectTrade(trade.slug)}
            className="flex flex-col items-start gap-1 rounded-xl border border-foreground/10 p-4 text-left transition-colors hover:border-foreground/30 active:scale-[0.98]"
          >
            <span className="text-2xl">{trade.icon}</span>
            <span className="font-medium">{trade.name}</span>
            <span className="text-xs text-foreground/50">{trade.description}</span>
          </button>
        ))}
      </div>

      <p className="mt-8 text-xs font-medium uppercase tracking-wide text-foreground/40">
        Don&apos;t see your trade? Help us decide what we build next.
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {unbuiltTrades.map((trade) =>
          votedSlug === trade.slug ? (
            <div key={trade.slug} className="col-span-2 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-xs text-foreground/60 sm:col-span-3">
              <span className="font-semibold text-foreground/80">Thanks for your input!</span> You&apos;ve helped
              move {trade.name} higher on our build list. We build new SmartSites based on contractor demand —
              check back to see when yours is ready.
            </div>
          ) : (
            <button
              key={trade.slug}
              type="button"
              onClick={() => setVotedSlug(trade.slug)}
              className="flex items-center gap-2 rounded-lg border border-dashed border-foreground/15 px-3 py-2 text-left text-sm text-foreground/50 transition-colors hover:border-foreground/30 hover:text-foreground/70"
            >
              <span>{trade.icon}</span>
              <span className="flex-1">{trade.name}</span>
              <span className="text-[11px] font-semibold text-[#ea6c0a]">Help us build this →</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}
