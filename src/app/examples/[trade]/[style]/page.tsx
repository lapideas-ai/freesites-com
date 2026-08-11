"use client";

import { useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import { LIVE_TRADE_SLUGS, getTradeBySlug } from "@/lib/trades";
import type { StyleVariant } from "@/lib/smartsite/types";

function isStyleVariant(value: string): value is StyleVariant {
  return value === "fast-response" || value === "trusted-local" || value === "premium-professional";
}

const STYLE_NAMES: Record<StyleVariant, string> = {
  "fast-response": "Fast Response",
  "trusted-local": "Trusted Local",
  "premium-professional": "Premium Professional",
};

// Public, visitor-facing full preview — distinct from /preview/[trade]/
// [style], which is internal review tooling (tier switching, boundary
// markers) and isn't appropriate to send real visitors to. Locked to the
// starter tier, just a Desktop/Mobile toggle so people can genuinely
// explore the site. Generalized from the original /examples/hvac/[style]
// (which hardcoded HVAC's three components) so a newly-live trade needs no
// changes here — only a registry entry.
//
// Gated on the registry existing, NOT on LIVE_TRADE_SLUGS: showcase-only
// trades (Painting, Landscaping, Remodeling) are meant to be explorable
// here even though they aren't wizard-selectable yet — that's the whole
// point of the homepage showcase linking here. The claim CTA below
// branches live vs. not-live so it never dead-ends a visitor.
export default function PublicExamplePage() {
  const params = useParams<{ trade: string; style: string }>();
  const router = useRouter();
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const trade = getTradeBySlug(params.trade);
  const registry = getTradeRegistry(params.trade);
  if (!trade || !registry || !isStyleVariant(params.style)) notFound();

  const Component = registry.components[params.style];
  if (!Component) notFound();

  const isLive = LIVE_TRADE_SLUGS.has(params.trade);

  return (
    <div>
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur">
        <Link href="/#examples" className="text-[13px] font-bold text-[#1a2f4a]">
          ← Back to FreeSites
        </Link>
        <span className="text-[13px] font-bold text-slate-500">
          {trade.name} · {STYLE_NAMES[params.style]} <span className="text-slate-300">·</span>{" "}
          {isLive ? "Live SmartSite Example" : "Showcase Example"}
        </span>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            {(["desktop", "tablet", "mobile"] as const).map((id) => (
              <button
                key={id}
                onClick={() => setDevice(id)}
                className={`rounded-md px-3 py-1 text-[12px] font-semibold capitalize transition-colors ${
                  device === id ? "bg-white text-[#1a2f4a] shadow-sm" : "text-slate-500 hover:text-[#1a2f4a]"
                }`}
              >
                {id}
              </button>
            ))}
          </div>
          <button
            onClick={() => router.push(isLive ? `/build?trade=${params.trade}` : `/trades/${params.trade}`)}
            className="rounded-lg bg-[#f97316] px-3.5 py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#ea6c0a]"
          >
            {isLive ? "Claim My FREE SmartSite" : "Help Us Build This →"}
          </button>
        </div>
      </div>

      <div
        className={
          device === "mobile"
            ? "mx-auto max-w-[390px] border-x border-slate-200"
            : device === "tablet"
              ? "mx-auto max-w-[834px] border-x border-slate-200"
              : ""
        }
      >
        <Component business={registry.sample} tier="starter" />
      </div>
    </div>
  );
}
