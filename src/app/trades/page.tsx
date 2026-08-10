"use client";

import Link from "next/link";
import { inter } from "@/components/homepage/fonts";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";
import { trades, LIVE_TRADE_SLUGS } from "@/lib/trades";

// Navigation-only for now — see TradeSection on the homepage. Each trade
// links either into the live wizard (/build) or its own placeholder page
// (/trades/[slug]) until the real Trade Landing Page system is built.
export default function TradesPage() {
  return (
    <div className={inter.className}>
      <ActiveTradeProvider>
        <Header />
      </ActiveTradeProvider>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">All Trades</span>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-3xl">
          Choose Your Trade
        </h1>
        <p className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-slate-600">
          FreeSites builds a dedicated SmartSite for your industry. HVAC is live today — every other trade is
          built in the order contractors request it. Select yours to help us decide what&apos;s next.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {trades.map((trade) => (
            <Link
              key={trade.slug}
              href={LIVE_TRADE_SLUGS.has(trade.slug) ? "/build" : `/trades/${trade.slug}`}
              className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-orange-200"
            >
              <div className="text-xl">{trade.icon}</div>
              <div className="mt-1.5 text-[13px] font-bold text-[#1a2f4a]">{trade.name}</div>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{trade.description}</p>
              {LIVE_TRADE_SLUGS.has(trade.slug) ? (
                <div className="mt-2 text-[11px] font-bold text-[#f97316]">Start now →</div>
              ) : (
                <div className="mt-2 text-[11px] font-bold text-[#1a6bbf]">Help us build this →</div>
              )}
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
