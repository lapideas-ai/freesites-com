import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { inter } from "@/components/homepage/fonts";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";
import { getTradeBySlug, getTradeEntryHref, LIVE_TRADE_SLUGS, BUILT_TRADE_SLUGS, trades } from "@/lib/trades";
import { getDefaultStyleVariant } from "@/lib/smartsite/registry";
import { getTradeMetadata } from "@/lib/trade-seo";
import { MobileContactBar } from "@/components/homepage/SmartReplyContact";

// Pre-renders only the six built trades at build time (real, unique,
// crawlable content) — every other trade slug still resolves on-demand via
// the existing "help us build this" branch below, unchanged. Adding a trade
// to BUILT_TRADE_SLUGS (trades.ts) is the only change needed for it to
// join this list automatically.
export function generateStaticParams() {
  return trades.filter((t) => BUILT_TRADE_SLUGS.has(t.slug)).map((t) => ({ slug: t.slug }));
}

// Per-trade title/description/canonical, derived from the same canonical
// trade registry (trades.ts + trade-seo.ts) driving routing and the
// SmartSite component map — no separate per-trade SEO copy to maintain.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trade = getTradeBySlug(slug);
  if (!trade) return {};
  const { title, description } = getTradeMetadata(trade);
  return {
    title,
    description,
    alternates: { canonical: `https://freesites.com/trades/${slug}` },
  };
}

// A BUILT trade (live or showcase-only) gets a real, stable, indexable
// landing page here — not an instant client-side bounce to /build or
// /examples. That used to be this page's behavior for every built trade,
// which is correct for funnel routing (a visitor who clicks through still
// lands on the right trade, never HVAC by default) but leaves nothing for
// search engines to crawl or rank: a page that redirects away immediately
// accrues no ranking signal of its own. The CTA below still routes through
// the exact same canonical getTradeEntryHref() used everywhere else, so
// trade identity is unaffected — reaching the builder/example now takes one
// deliberate click instead of an automatic redirect.
//
// An unbuilt trade keeps its original behavior unchanged: a positive
// "you've helped us prioritize this" confirmation, no content page to speak
// of yet (there's nothing built to show), same as before this pass.
export default async function TradePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trade = getTradeBySlug(slug);
  if (!trade) notFound();

  const isLive = LIVE_TRADE_SLUGS.has(trade.slug);
  const isBuilt = BUILT_TRADE_SLUGS.has(trade.slug);

  if (isBuilt) {
    const entryHref = getTradeEntryHref(trade.slug);
    const exampleStyle = getDefaultStyleVariant(trade.slug);

    return (
      <div className={inter.className}>
        <ActiveTradeProvider>
          <Header showContact />
        </ActiveTradeProvider>
        <MobileContactBar />
        <section className="mx-auto max-w-3xl px-6 py-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">
            {trade.icon} {trade.name}
          </span>
          <h1 className="mt-3 text-[26px] font-black leading-[1.15] tracking-tight text-[#1a2f4a] sm:text-[32px]">
            Every {trade.name} SmartSite Is Built to Get You Found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-slate-600">
            A FREE {trade.name} SmartSite built to compete for local search, plus SmartReply Voice + SMS so you
            never miss a customer call — {trade.description.toLowerCase()}.
          </p>

          <div className="mx-auto mt-5 flex max-w-lg flex-wrap items-center justify-center gap-1.5">
            {trade.services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600"
              >
                {service}
              </span>
            ))}
          </div>

          {exampleStyle && (
            <Link
              href={`/examples/${trade.slug}/${exampleStyle}`}
              target="_blank"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1a6bbf] hover:underline"
            >
              See a live {trade.name} SmartSite example →
            </Link>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href={entryHref}
              className="inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
            >
              {isLive ? `Claim My FREE ${trade.name} SmartSite →` : `View the ${trade.name} SmartSite →`}
            </Link>
            <Link
              href="/trades"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-bold text-[#1a2f4a] transition-colors hover:border-slate-300"
            >
              ← All Trades
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className={inter.className}>
      <ActiveTradeProvider>
        <Header showContact />
      </ActiveTradeProvider>
      <MobileContactBar />
      <section className="mx-auto max-w-xl px-6 py-16 text-center">
        <div className="text-3xl">{trade.icon}</div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">
          Thanks for your input!
        </span>
        <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-3xl">
          You&apos;ve helped move {trade.name} higher on our build list
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
          We build new SmartSites based on contractor demand. Check back to see when yours is ready.
        </p>
        <p className="mt-2 text-[12px] text-slate-400">No email, phone, or signup needed — this was it.</p>
        <Link
          href={getTradeEntryHref("hvac")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#ea6c0a]"
        >
          Claim My FREE SmartSite (HVAC, live now)
        </Link>
      </section>
      <Footer />
    </div>
  );
}
