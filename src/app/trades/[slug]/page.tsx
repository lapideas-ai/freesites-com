"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { inter } from "@/components/homepage/fonts";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";
import { getTradeBySlug, LIVE_TRADE_SLUGS } from "@/lib/trades";

// Landing this on a page IS "selecting" the trade — no email/phone/SMS, no
// popup, no lead capture, just a positive confirmation that contractors
// vote on build priority by showing up here. The real Trade Landing Page
// system is the next project.
export default function TradeConfirmationPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const claim = () => router.push("/build");
  const trade = getTradeBySlug(params.slug);
  const isLive = trade ? LIVE_TRADE_SLUGS.has(trade.slug) : false;

  useEffect(() => {
    if (isLive) router.replace("/build");
  }, [isLive, router]);

  if (!trade) notFound();
  if (isLive) return null;

  return (
    <div className={inter.className}>
      <ActiveTradeProvider>
        <Header />
      </ActiveTradeProvider>
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
          onClick={claim}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#ea6c0a]"
        >
          Claim My FREE SmartSite (HVAC, live now)
        </button>
      </section>
      <Footer />
    </div>
  );
}
