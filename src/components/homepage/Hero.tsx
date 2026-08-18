"use client";

import { useRouter } from "next/navigation";
import { ScaledPreview } from "@/components/scaled-preview";
import { useActiveTrade, type ShowcaseExample } from "@/lib/homepage-active-trade-context";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import { getTradeBySlug } from "@/lib/trades";
import type { StyleVariant } from "@/lib/smartsite/types";

const STYLE_NAMES: Record<StyleVariant, string> = {
  "fast-response": "Fast Response",
  "trusted-local": "Trusted Local",
  "premium-professional": "Premium Professional",
};

// Custom isn't a separate product — it's an alternate entry point into the
// existing $97/mo SmartSite Growth checkout, so this CTA bypasses
// claimCtaHref()/the FREE builder entirely and links straight to the same
// Growth payment link used by PricingSection/TierCards.
const GROWTH_CHECKOUT_URL = "https://pay.freesites.com/payment-link/6a7b9223c8cc9a2ce72677c4";

const CUSTOM_BUSINESS_TYPES = [
  { icon: "🏋️", label: "Gyms & Fitness" },
  { icon: "🍸", label: "Bars & Restaurants" },
  { icon: "🏢", label: "Apartments & Property" },
  { icon: "💼", label: "Professional Services" },
];

// Persistent control, not part of the fading content block below it — its
// active-pill highlight updates instantly on every rotation tick, but the
// row itself never re-mounts/re-fades, since a control flickering every 6s
// would read as broken rather than alive. Custom is appended as a seventh,
// last pill rather than inserted among the six trades — selecting it swaps
// the panels below into the Custom state instead of picking a trade.
function TradeSelector() {
  const { activeSlug, showcaseTradesInOrder, selectExample, isCustomSelected, selectCustom } = useActiveTrade();
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Showing examples for</span>
      <div className="flex flex-wrap gap-1">
        {showcaseTradesInOrder.map((trade) => (
          <button
            key={trade.slug}
            onClick={() => selectExample(trade.slug)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
              activeSlug === trade.slug && !isCustomSelected
                ? "bg-[#1a2f4a] text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-[#1a2f4a]"
            }`}
          >
            {trade.name}
          </button>
        ))}
        <button
          onClick={selectCustom}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
            isCustomSelected
              ? "bg-[#1a2f4a] text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-[#1a2f4a]"
          }`}
        >
          Custom
        </button>
      </div>
    </div>
  );
}

// Swaps in for the fading content block when Custom is selected — no trade
// template to show, so this leads with the Home Services specialization,
// then the $97/mo Growth plan as the direct answer, and routes the CTA
// straight to the existing Growth checkout rather than claimCtaHref()/the
// FREE builder.
function CustomContent() {
  return (
    <div className="fs-fade-in">
      <h1 className="mt-3 text-[26px] font-black leading-[1.15] tracking-tight text-[#1a2f4a] sm:text-[30px]">
        Want Something Completely <span className="text-[#f97316]">Custom?</span>
      </h1>
      <p className="mt-1.5 text-[15px] font-semibold leading-snug text-[#1a2f4a]">
        We specialize in Home Services, but FreeSites can build around your business, brand and needs — even if you
        run a gym, bar, apartment community, professional service, or another type of business.
      </p>
      <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-slate-600">
        Our $97/month SmartSite Growth plan includes a Custom Website.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <a
          href={GROWTH_CHECKOUT_URL}
          className="inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-3 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
        >
          Get a Custom Website — $97/mo →
        </a>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-[13px] font-bold text-[#1a2f4a] transition-colors hover:border-slate-300"
        >
          See SmartSite Growth
        </a>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">$97 due today. No free trial.</p>
    </div>
  );
}

// Right-side companion to CustomContent — a compact, lightweight hint of
// business breadth (not a generic AI/SaaS visual) rather than a fake trade
// template, since there's no SmartSite registry entry for "custom."
function CustomCollagePanel() {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-900/10">
      <div className="flex items-center gap-1 border-b border-slate-100 bg-slate-50 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-5">
        {CUSTOM_BUSINESS_TYPES.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 py-6 text-center"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[11px] font-bold text-[#1a2f4a]">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 bg-white px-4 py-2.5 text-center text-[11px] font-semibold text-slate-500">
        Built around your business, whatever it is
      </div>
    </div>
  );
}

// One layer of the preview cross-fade — the outgoing example renders
// absolutely stacked on top of the incoming one (which stays in normal
// flow, defining the wrapper's height) so both are visible and blending
// during the transition, instead of the old instant-unmount-then-fade-in
// approach that read as a flash/cut.
function PreviewPanel({ example, phase }: { example: ShowcaseExample; phase: "in" | "out" | "static" }) {
  const registry = getTradeRegistry(example.tradeSlug);
  const trade = getTradeBySlug(example.tradeSlug);
  if (!registry || !trade) return null;
  const Component = registry.components[example.styleVariant];
  if (!Component) return null;

  const animationClass = phase === "in" ? "fs-cross-fade-in" : phase === "out" ? "fs-cross-fade-out" : "";
  const positionClass = phase === "out" ? "absolute inset-0" : "relative";

  return (
    <div className={`${positionClass} ${animationClass}`}>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-900/10">
        <div className="flex items-center gap-1 border-b border-slate-100 bg-slate-50 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        </div>
        <ScaledPreview height={270} canonicalWidth={1440}>
          <Component business={registry.sample} tier="starter" />
        </ScaledPreview>
      </div>
      <div className="absolute left-2.5 top-2.5 rounded-md bg-black/55 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
        {trade.name} · {STYLE_NAMES[example.styleVariant]}
      </div>
    </div>
  );
}

export function Hero() {
  const router = useRouter();
  const {
    activeSlug,
    activeTrade,
    activeExample,
    previousExample,
    claimCtaLabel,
    claimCtaHref,
    isCustomSelected,
  } = useActiveTrade();
  const registry = getTradeRegistry(activeSlug);
  if (!registry) return null;
  const onClaim = () => router.push(claimCtaHref());

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 py-7 md:grid-cols-2 md:items-center md:py-9">
      <div className="min-w-0">
        {/* Compact orientation for a visitor who doesn't know FreeSites yet —
            deliberately short so the rotating preview still lands above the
            fold on a normal desktop viewport. */}
        <div className="mb-3">
          <div className="text-[12px] font-black uppercase tracking-wide text-[#1a2f4a]">
            Built for Home Service Businesses
          </div>
          <p className="mt-0.5 text-[13px] font-medium leading-snug text-slate-600">
            FreeSites gives contractors a FREE FOREVER website we call a SmartSite™ — built to help turn visitors
            into customers.
          </p>
        </div>

        <TradeSelector />

        {isCustomSelected ? (
          <CustomContent />
        ) : (
        /* Keyed by activeSlug so React remounts this block on every trade
            change, retriggering the CSS fade-in — headline, CTAs, and
            thumbnails all change together as one unit. */
        <div key={activeSlug} className="fs-fade-in">
          <h1 className="mt-3 text-[26px] font-black leading-[1.15] tracking-tight text-[#1a2f4a] sm:text-[30px]">
            Every {activeTrade.name} SmartSite Includes <span className="text-[#f97316]">SmartReply™</span>
          </h1>
          <p className="mt-1.5 text-[15px] font-semibold leading-snug text-[#1a2f4a]">
            The website that answers every customer for you.
          </p>
          <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-slate-600">
            SmartReply is the technology behind it — instant email, text, and voice replies that turn more
            visitors into booked customers, day or night.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {["FREE Forever", "No Credit Card", "SmartReply Included"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              onClick={onClaim}
              className="inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-3 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
            >
              {claimCtaLabel()}
            </button>
            <a
              href="#examples"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-[13px] font-bold text-[#1a2f4a] transition-colors hover:border-slate-300"
            >
              See {activeTrade.name} Examples
            </a>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Preview a professional SmartSite built for your trade in about 60 seconds.
          </p>

          <div className="mt-5">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Real SmartSites, built in 60 seconds</div>
            <div className="mt-1.5 flex gap-2">
              {(Object.keys(registry.components) as StyleVariant[]).map((styleId) => {
                const StyleComponent = registry.components[styleId];
                if (!StyleComponent) return null;
                return (
                  <div
                    key={styleId}
                    role="button"
                    tabIndex={0}
                    onClick={onClaim}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onClaim();
                      }
                    }}
                    className="group flex-1 cursor-pointer overflow-hidden rounded-md border border-slate-200 bg-white text-left transition-colors hover:border-orange-300"
                    aria-label={STYLE_NAMES[styleId]}
                  >
                    <div className="pointer-events-none h-11 overflow-hidden bg-slate-50">
                      <ScaledPreview height={44} canonicalWidth={1440}>
                        <StyleComponent business={registry.sample} tier="starter" />
                      </ScaledPreview>
                    </div>
                    <div className="truncate px-1.5 py-1 text-[9px] font-semibold text-slate-500 group-hover:text-[#1a2f4a]">
                      {STYLE_NAMES[styleId]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        )}
      </div>

      <div className="relative min-w-0">
        {isCustomSelected ? (
          <CustomCollagePanel />
        ) : (
          <>
            {previousExample && <PreviewPanel example={previousExample} phase="out" />}
            <PreviewPanel example={activeExample} phase={previousExample ? "in" : "static"} />
            <div className="absolute -bottom-2.5 -left-2.5 z-10 flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-[#1a2f4a] shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
              Live in 60 seconds
            </div>
          </>
        )}
      </div>
    </section>
  );
}
