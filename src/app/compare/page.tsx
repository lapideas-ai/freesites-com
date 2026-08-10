import Link from "next/link";
import { trades, LIVE_TRADE_SLUGS } from "@/lib/trades";

// TEMPORARY visual-inventory index — links to /compare/[trade] for each live
// trade. Not part of the permanent app; safe to delete once the review is
// done, not linked from anywhere customer-facing.
export default function CompareIndexPage() {
  const liveTrades = trades.filter((t) => LIVE_TRADE_SLUGS.has(t.slug));

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/40">
        Temporary visual inventory — not for customers
      </div>
      <h1 className="text-2xl font-bold text-black">Style Comparison — All Live Trades</h1>
      <p className="mt-1 text-sm text-black/60">
        Pick a trade to see its three built styles side by side, desktop and mobile.
      </p>
      <div className="mt-6 flex flex-col gap-2">
        {liveTrades.map((trade) => (
          <Link
            key={trade.slug}
            href={`/compare/${trade.slug}`}
            className="flex items-center gap-3 rounded-lg border border-black/10 p-4 hover:border-black/25"
          >
            <span className="text-xl">{trade.icon}</span>
            <span className="text-sm font-bold text-black">{trade.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
