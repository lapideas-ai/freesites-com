"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScaledPreview } from "@/components/scaled-preview";
import { SHOWCASE_EXAMPLES } from "@/lib/homepage-active-trade-context";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import { getTradeBySlug, LIVE_TRADE_SLUGS } from "@/lib/trades";
import type { StyleVariant } from "@/lib/smartsite/types";

const STYLE_NAMES: Record<StyleVariant, string> = {
  "fast-response": "Fast Response",
  "trusted-local": "Trusted Local",
  "premium-professional": "Premium Professional",
};

const STYLE_BLURBS: Record<StyleVariant, string> = {
  "fast-response": "Bold, high-urgency styling.",
  "trusted-local": "Warm, neighborly styling.",
  "premium-professional": "Refined, upscale styling.",
};

const FRAMES = {
  desktop: { width: 1440, height: 110, boxWidth: "100%" as const, label: "Desktop" },
  tablet: { width: 834, height: 150, boxWidth: 140, label: "Tablet" },
  mobile: { width: 390, height: 180, boxWidth: 90, label: "Mobile" },
} as const;

type FrameId = keyof typeof FRAMES;

// Shows the same six curated (trade, style) examples as the Hero rotation
// — one card per example, not three styles of whichever trade Hero
// happens to be showing — so the homepage tells one consistent story: Hero
// teases the range across trades, this section proves all six out at once.
// Deliberately a static grid, not reactive to rotation state — see
// homepage-active-trade-context.tsx's SHOWCASE_EXAMPLES, the single source
// of truth both sections read from. The preview itself is NOT link-wrapped
// — the rendered SmartSite has its own internal <a> elements (header
// logo/nav), and nesting an <a> inside an <a> is invalid HTML that breaks
// hydration. "View full example →" is the explicit CTA that opens the real
// SmartSite (its own Desktop/Tablet/Mobile toggle) at
// /examples/[trade]/[style] in a new tab.
export function LiveExamples() {
  const router = useRouter();
  const [frame, setFrame] = useState<FrameId>("desktop");
  const active = FRAMES[frame];

  return (
    <section id="examples" className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">Live SmartSites</span>
            <h2 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
              Six trades, six distinct SmartSites
            </h2>
          </div>
          <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5">
            {(Object.keys(FRAMES) as FrameId[]).map((id) => (
              <button
                key={id}
                onClick={() => setFrame(id)}
                className={`rounded px-2.5 py-1 text-[12px] font-semibold transition-colors ${
                  frame === id ? "bg-white text-[#1a2f4a] shadow-sm" : "text-slate-500 hover:text-[#1a2f4a]"
                }`}
              >
                {FRAMES[id].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE_EXAMPLES.map((example) => {
            const trade = getTradeBySlug(example.tradeSlug);
            const registry = getTradeRegistry(example.tradeSlug);
            if (!trade || !registry) return null;
            const Component = registry.components[example.styleVariant];
            if (!Component) return null;
            const isLive = LIVE_TRADE_SLUGS.has(example.tradeSlug);

            return (
              <div
                key={example.tradeSlug}
                className="group min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-orange-200"
              >
                <div
                  className="flex min-w-0 items-center justify-center overflow-hidden bg-slate-50 p-2"
                  style={{ height: active.height + 16 }}
                >
                  <div className="mx-auto min-w-0" style={{ width: active.boxWidth }}>
                    <ScaledPreview height={active.height} canonicalWidth={active.width}>
                      <Component business={registry.sample} tier="starter" />
                    </ScaledPreview>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                    <span className="text-[9px] font-bold uppercase tracking-wide text-[#16a34a]">{trade.name}</span>
                  </div>
                  <div className="mt-1 text-[13px] font-bold text-[#1a2f4a]">{STYLE_NAMES[example.styleVariant]}</div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">{STYLE_BLURBS[example.styleVariant]}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <Link
                      href={`/examples/${example.tradeSlug}/${example.styleVariant}`}
                      target="_blank"
                      className="text-[11px] font-bold text-[#1a6bbf] hover:text-[#1a2f4a]"
                    >
                      View full example →
                    </Link>
                    <button
                      onClick={() =>
                        router.push(isLive ? `/build?trade=${example.tradeSlug}` : `/trades/${example.tradeSlug}`)
                      }
                      className="text-[11px] font-bold text-[#f97316] hover:text-[#ea6c0a]"
                    >
                      {isLive ? `Start with ${trade.name} →` : "Help Us Build This →"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
