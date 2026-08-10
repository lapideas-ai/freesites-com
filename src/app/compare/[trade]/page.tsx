"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { DeviceFrame } from "@/components/smartsite/shared/DeviceFrame";
import { getTradeBySlug, LIVE_TRADE_SLUGS } from "@/lib/trades";

const STYLES = [
  { id: "fast-response", name: "Fast Response" },
  { id: "trusted-local", name: "Trusted Local" },
  { id: "premium-professional", name: "Premium Professional" },
] as const;

// TEMPORARY visual-inventory tool — lets us compare the three built styles
// of a trade side by side (desktop + mobile) before any funnel/design
// changes are made. Every frame is a live, scrollable iframe pointed at the
// existing internal /preview/[trade]/[style] pages, locked to Growth tier
// so the fullest built version of each style is visible. Does not modify
// any SmartSite content, copy, pricing, or the wizard. Safe to delete once
// the review is done — not linked from anywhere customer-facing.
export default function ComparePage() {
  const params = useParams<{ trade: string }>();
  const trade = getTradeBySlug(params.trade);

  if (!trade || !LIVE_TRADE_SLUGS.has(params.trade)) notFound();

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-10">
      <Link href="/compare" className="text-xs font-semibold uppercase tracking-wide text-blue-600 hover:text-blue-800">
        ← All trades
      </Link>
      <div className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-black/40">
        Temporary visual inventory — not for customers
      </div>
      <h1 className="text-2xl font-bold text-black">
        {trade.icon} {trade.name} — Style Comparison
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-black/60">
        All three built styles, locked to Growth tier (fullest content) for comparison. Each frame is a live,
        scrollable preview — not a static export or screenshot. Nothing shown here has been changed from what&apos;s
        already built.
      </p>

      <h2 className="mt-10 text-sm font-bold uppercase tracking-wide text-black/60">Desktop</h2>
      <div className="mt-3 flex flex-wrap items-start gap-6">
        {STYLES.map((style) => (
          <div key={style.id} className="flex flex-col gap-2">
            <DeviceFrame
              label={style.name}
              width={1440}
              height={900}
              scale={0.32}
              src={`/preview/${trade.slug}/${style.id}?tier=growth`}
            />
            <a
              href={`/preview/${trade.slug}/${style.id}?tier=growth`}
              target="_blank"
              className="rounded bg-slate-900 px-2.5 py-1.5 text-center text-xs font-bold text-white hover:bg-slate-700"
            >
              Open {style.name} full-screen ↗
            </a>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-sm font-bold uppercase tracking-wide text-black/60">Mobile</h2>
      <div className="mt-3 flex flex-wrap items-start gap-6">
        {STYLES.map((style) => (
          <div key={style.id} className="flex flex-col gap-2">
            <DeviceFrame
              label={style.name}
              width={390}
              height={844}
              scale={0.6}
              src={`/preview/${trade.slug}/${style.id}?tier=growth`}
            />
            <a
              href={`/preview/${trade.slug}/${style.id}?tier=growth`}
              target="_blank"
              className="rounded bg-slate-900 px-2.5 py-1.5 text-center text-xs font-bold text-white hover:bg-slate-700"
            >
              Open {style.name} full-screen ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
