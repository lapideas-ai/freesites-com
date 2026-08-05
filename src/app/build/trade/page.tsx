"use client";

import { useRouter } from "next/navigation";
import { trades } from "@/lib/trades";
import { useWizard } from "@/lib/wizard-context";

// Launch Candidate 1 only has real canonical styles built for HVAC. The
// other trades stay listed (so the roadmap is visible) but aren't
// selectable yet — better than a "Plumbing" button that leads nowhere real.
const LIVE_TRADE_SLUGS = new Set(["hvac"]);

export default function TradePage() {
  const router = useRouter();
  const { update } = useWizard();

  function selectTrade(slug: string) {
    update({ tradeSlug: slug });
    router.push("/build/style");
  }

  const liveTrades = trades.filter((t) => LIVE_TRADE_SLUGS.has(t.slug));
  const comingSoonTrades = trades.filter((t) => !LIVE_TRADE_SLUGS.has(t.slug));

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
        Coming soon
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {comingSoonTrades.map((trade) => (
          <div
            key={trade.slug}
            className="flex items-center gap-2 rounded-lg border border-dashed border-foreground/10 px-3 py-2 text-sm text-foreground/35"
          >
            <span>{trade.icon}</span>
            <span>{trade.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
