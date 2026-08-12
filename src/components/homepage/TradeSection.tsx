import Link from "next/link";
import { ScaledPreview } from "@/components/scaled-preview";
import { getTradeBySlug, LIVE_TRADE_SLUGS } from "@/lib/trades";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import { SHOWCASE_EXAMPLES } from "@/lib/homepage-active-trade-context";

// The six trades with a real, completed SmartSite — same source of truth
// as the Hero rotation, so this section can never drift out of sync with
// what's actually built. Deliberately distinct from that rotation: this is
// a static grid showing all six simultaneously (with real thumbnails, not
// icons) so a visitor can find/click straight to their own trade, rather
// than the rotating single-preview showcase up top. "View All Trades"
// remains the path to the ~15 trades that aren't built yet.
export function TradeSection() {
  return (
    <section className="bg-[#f8fafc] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">By Industry</span>
        <h2 className="mt-1 max-w-lg text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
          Find Your Trade
        </h2>
        <p className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-slate-600">
          Six trades, six completed SmartSites — see your industry, or help us decide which one to build next.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SHOWCASE_EXAMPLES.map((example) => {
            const trade = getTradeBySlug(example.tradeSlug);
            const registry = getTradeRegistry(example.tradeSlug);
            if (!trade || !registry) return null;
            const Component = registry.components[example.styleVariant];
            if (!Component) return null;
            const isLive = LIVE_TRADE_SLUGS.has(trade.slug);
            const href = isLive ? "/build" : `/examples/${trade.slug}/${example.styleVariant}`;

            return (
              <Link
                key={trade.slug}
                href={href}
                target={isLive ? undefined : "_blank"}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-orange-200"
              >
                <div className="pointer-events-none h-20 overflow-hidden bg-slate-50">
                  <ScaledPreview height={80} canonicalWidth={1440}>
                    <Component business={registry.sample} tier="starter" />
                  </ScaledPreview>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                    <span className="text-[9px] font-bold uppercase tracking-wide text-[#16a34a]">Completed</span>
                  </div>
                  <div className="mt-1 text-[13px] font-bold text-[#1a2f4a]">{trade.name}</div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{trade.description}</p>
                  <div className={`mt-2 text-[11px] font-bold ${isLive ? "text-[#f97316]" : "text-[#1a6bbf]"}`}>
                    {isLive ? "Start now →" : "View Example →"}
                  </div>
                </div>
              </Link>
            );
          })}
          <Link
            href="/trades"
            className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center transition-colors hover:border-orange-300"
          >
            <div className="text-[13px] font-bold text-[#1a6bbf]">View All Trades →</div>
            <p className="mt-0.5 text-[11px] text-slate-500">20+ industries and counting</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
