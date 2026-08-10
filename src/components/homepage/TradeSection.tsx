import Link from "next/link";
import { trades, LIVE_TRADE_SLUGS } from "@/lib/trades";

const FEATURED_SLUGS = ["hvac", "plumbing", "electrical", "roofing", "landscaping", "cleaning"];

export function TradeSection() {
  const featured = FEATURED_SLUGS.map((slug) => trades.find((t) => t.slug === slug)).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <section className="bg-[#f8fafc] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">By Industry</span>
        <h2 className="mt-1 max-w-lg text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
          Find Your Trade
        </h2>
        <p className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-slate-600">
          Choose your industry to see what FreeSites can build for your business — or help us decide which
          SmartSite to build next.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((trade) => (
            <Link
              key={trade.slug}
              href={LIVE_TRADE_SLUGS.has(trade.slug) ? "/build" : `/trades/${trade.slug}`}
              className="group rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-orange-200"
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
