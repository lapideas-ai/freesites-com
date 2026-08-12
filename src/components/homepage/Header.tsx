"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trades, LIVE_TRADE_SLUGS } from "@/lib/trades";
import { useActiveTrade } from "@/lib/homepage-active-trade-context";
import { LogoMark } from "@/components/logo-mark";

function TradesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-md px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1a2f4a]"
        aria-expanded={open}
      >
        Trades
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
          <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Choose Your Trade</div>
          <div className="mt-2.5 grid grid-cols-3 gap-x-3 gap-y-1.5">
            {trades.map((trade) => (
              <Link
                key={trade.slug}
                href={LIVE_TRADE_SLUGS.has(trade.slug) ? "/build" : `/trades/${trade.slug}`}
                className="flex items-center gap-1.5 rounded px-1.5 py-1 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1a2f4a]"
              >
                <span className="text-[13px]">{trade.icon}</span>
                <span className="truncate">{trade.name}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/trades"
            className="mt-3 block rounded-md bg-slate-50 px-3 py-2 text-center text-[12px] font-bold text-[#1a6bbf] transition-colors hover:bg-slate-100"
          >
            View All Trades →
          </Link>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const { claimCtaLabel, claimCtaHref } = useActiveTrade();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-[15px] font-black tracking-tight text-[#1a2f4a]">
            Free<span className="text-[#f97316]">Sites</span>
          </span>
        </Link>
        {/* Reserved for later: a fifth nav item for "Smart Owners OS by
            FreeSites" — the future long-form content platform (X posts,
            newsletters, articles, SmartReply/growth tips). Not a "blog."
            No implementation yet — do not add the item until that content
            platform actually exists. */}
        <nav className="hidden items-center gap-1 md:flex">
          <a href="#examples" className="rounded-md px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1a2f4a]">
            Examples
          </a>
          <TradesMenu />
          <a href="#pricing" className="rounded-md px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1a2f4a]">
            Pricing
          </a>
          <a href="#founder" className="rounded-md px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1a2f4a]">
            Why FreeSites
          </a>
        </nav>
        <button
          onClick={() => router.push(claimCtaHref())}
          className="rounded-md bg-[#f97316] px-3.5 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
        >
          {claimCtaLabel()}
        </button>
      </div>
    </header>
  );
}
