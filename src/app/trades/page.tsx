"use client";

import Link from "next/link";
import { inter } from "@/components/homepage/fonts";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";
import { trades, LIVE_TRADE_SLUGS, BUILT_TRADE_SLUGS } from "@/lib/trades";
import { getDefaultStyleVariant } from "@/lib/smartsite/registry";

// Navigation-only for now — see TradeSection on the homepage. Each trade
// links into the live wizard (/build) if wizard-selectable, its completed
// example page (/examples/[trade]/[style]) if a SmartSite exists but isn't
// wizard-selectable yet, or its "help us build this" placeholder page
// (/trades/[slug]) otherwise.
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
          FreeSites builds a dedicated SmartSite for your industry. Several trades are live today — every other
          trade is built in the order contractors request it. Select yours to help us decide what&apos;s next.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {trades.map((trade) => {
            const isLive = LIVE_TRADE_SLUGS.has(trade.slug);
            const isBuilt = BUILT_TRADE_SLUGS.has(trade.slug);
            const defaultStyle = !isLive && isBuilt ? getDefaultStyleVariant(trade.slug) : undefined;
            const href = isLive
              ? "/build"
              : defaultStyle
                ? `/examples/${trade.slug}/${defaultStyle}`
                : `/trades/${trade.slug}`;

            return (
              <Link
                key={trade.slug}
                href={href}
                target={defaultStyle ? "_blank" : undefined}
                className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-orange-200"
              >
                <div className="text-xl">{trade.icon}</div>
                <div className="mt-1.5 text-[13px] font-bold text-[#1a2f4a]">{trade.name}</div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{trade.description}</p>
                {isLive ? (
                  <div className="mt-2 text-[11px] font-bold text-[#f97316]">Start now →</div>
                ) : defaultStyle ? (
                  <div className="mt-2 text-[11px] font-bold text-[#16a34a]">View Example →</div>
                ) : (
                  <div className="mt-2 text-[11px] font-bold text-[#1a6bbf]">Help us build this →</div>
                )}
              </Link>
            );
          })}

          {/* Not a trade — the final card in the grid, deep-linking into
              the homepage's existing Custom state (see
              CustomQueryParamSync) rather than a new page/funnel. Styled
              like the trade cards above it so it reads as part of the same
              selection grid, per the Trades dropdown in Header.tsx. */}
          <Link
            href="/?trade=custom"
            className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-orange-200"
          >
            <div className="text-xl">🧩</div>
            <div className="mt-1.5 text-[13px] font-bold text-[#1a2f4a]">Custom</div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
              Not Home Services? We build those too — included in Growth.
            </p>
            <div className="mt-2 text-[11px] font-bold text-[#f97316]">Get a Custom Website — $97/mo →</div>
          </Link>
        </div>

        {/* Custom isn't a separate product or a directory entry — it's an
            alternate entry point into the existing $97/mo SmartSite Growth
            checkout, so it sits at the end of the grid rather than among the
            trades and its CTA routes straight to the Growth payment link
            (never through /build). */}
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-[#f8fafc] p-6 sm:p-8">
          <h2 className="text-lg font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-xl">
            Don&apos;t See Your Trade — or Want Something Completely Your Own?
          </h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-600">
            FreeSites specializes in Home Services, but we can build for virtually any business. Our $97/month
            SmartSite Growth plan includes a Custom Website built around your business, brand and needs.
          </p>
          <a
            href="https://pay.freesites.com/payment-link/6a7b9223c8cc9a2ce72677c4"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-3 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
          >
            Get Your Custom Website — $97/mo →
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
