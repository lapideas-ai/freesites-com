"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScaledPreview } from "@/components/scaled-preview";
import { useActiveTrade } from "@/lib/homepage-active-trade-context";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import type { StyleVariant } from "@/lib/smartsite/types";

const STYLE_ORDER: { id: StyleVariant; name: string; blurb: string }[] = [
  { id: "fast-response", name: "Fast Response", blurb: "Bold, high-urgency styling." },
  { id: "trusted-local", name: "Trusted Local", blurb: "Warm, neighborly styling." },
  { id: "premium-professional", name: "Premium Professional", blurb: "Refined, upscale styling." },
];

const FRAMES = {
  desktop: { width: 1440, height: 110, boxWidth: "100%" as const, label: "Desktop" },
  tablet: { width: 834, height: 150, boxWidth: 140, label: "Tablet" },
  mobile: { width: 390, height: 180, boxWidth: 90, label: "Mobile" },
} as const;

type FrameId = keyof typeof FRAMES;

// Shows the three styles (Fast Response/Trusted Local/Premium Professional)
// of whichever trade is currently active in the hero's rotation/lock state
// — not one card per live trade — so the whole page stays in sync around a
// single featured trade at a time, matching the rotating-hero architecture.
// The preview itself is NOT link-wrapped — the rendered SmartSite has its
// own internal <a> elements (header logo/nav), and nesting an <a> inside an
// <a> is invalid HTML that breaks hydration. "View full example →" is the
// explicit CTA that opens the real SmartSite (its own Desktop/Tablet/Mobile
// toggle) at /examples/[trade]/[style] in a new tab.
export function LiveExamples() {
  const router = useRouter();
  const [frame, setFrame] = useState<FrameId>("desktop");
  const active = FRAMES[frame];
  const { activeSlug, activeTrade } = useActiveTrade();
  const registry = getTradeRegistry(activeSlug);
  const onSelect = () => router.push(`/build?trade=${activeSlug}`);

  return (
    <section id="examples" className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">Live SmartSites</span>
            <h2 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
              See what FreeSites builds for {activeTrade.name} businesses
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

        {registry && (
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {STYLE_ORDER.map((style) => {
              const Component = registry.components[style.id];
              return (
                <div key={style.id} className="group min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-orange-200">
                  <div className="flex min-w-0 items-center justify-center overflow-hidden bg-slate-50 p-2" style={{ height: active.height + 16 }}>
                    <div className="mx-auto min-w-0" style={{ width: active.boxWidth }}>
                      <ScaledPreview height={active.height} canonicalWidth={active.width}>
                        <Component business={registry.sample} tier="starter" />
                      </ScaledPreview>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                      <span className="text-[9px] font-bold uppercase tracking-wide text-[#16a34a]">Live Example</span>
                    </div>
                    <div className="mt-1 text-[13px] font-bold text-[#1a2f4a]">{style.name}</div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">{style.blurb}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <Link href={`/examples/${activeSlug}/${style.id}`} target="_blank" className="text-[11px] font-bold text-[#1a6bbf] hover:text-[#1a2f4a]">
                        View full example →
                      </Link>
                      <button onClick={onSelect} className="text-[11px] font-bold text-[#f97316] hover:text-[#ea6c0a]">
                        Start with {style.name} →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
