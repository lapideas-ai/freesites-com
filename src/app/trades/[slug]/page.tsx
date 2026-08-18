"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { inter } from "@/components/homepage/fonts";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";
import { getTradeBySlug, getTradeEntryHref, BUILT_TRADE_SLUGS } from "@/lib/trades";
import { MobileContactBar } from "@/components/homepage/SmartReplyContact";

// Landing this on a page IS "selecting" the trade for a trade that isn't
// built yet — no email/phone/SMS, no popup, no lead capture, just a
// positive confirmation that contractors vote on build priority by showing
// up here. The real Trade Landing Page system is the next project.
//
// For a BUILT trade (live or showcase-only), this page isn't the
// destination at all — it immediately hands off to getTradeEntryHref's
// canonical routing (the wizard for live trades, the real example for
// showcase-only ones) instead of showing this "help us build it" copy for
// a trade that's already built. That was the bug: this page used to only
// check LIVE_TRADE_SLUGS, so a built-but-not-live trade like Painting fell
// through to the generic "vote for this trade" placeholder even though a
// real Painting SmartSite already exists.
export default function TradeConfirmationPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const trade = getTradeBySlug(params.slug);
  const isBuilt = trade ? BUILT_TRADE_SLUGS.has(trade.slug) : false;

  useEffect(() => {
    if (trade && isBuilt) router.replace(getTradeEntryHref(trade.slug));
  }, [trade, isBuilt, router]);

  if (!trade) notFound();
  if (isBuilt) return null;

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
        <button
          onClick={() => router.push(getTradeEntryHref("hvac"))}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#ea6c0a]"
        >
          Claim My FREE SmartSite (HVAC, live now)
        </button>
      </section>
      <Footer />
    </div>
  );
}
