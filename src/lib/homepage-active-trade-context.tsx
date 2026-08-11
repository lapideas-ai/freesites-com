"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getTradeBySlug, LIVE_TRADE_SLUGS, type Trade } from "@/lib/trades";
import type { StyleVariant } from "@/lib/smartsite/types";

export type ShowcaseExample = { tradeSlug: string; styleVariant: StyleVariant };

// Six curated examples for the homepage showcase — sequenced to alternate
// dark/light on every transition (HVAC/Plumbing/Electrical are dark-toned,
// Painting/Landscaping/Remodeling are light throughout) rather than
// grouping all three dark examples before all three light ones, so every
// rotation tick is an obvious visual flip, not three similar slides in a
// row. Electrical is paired with premium-professional so the three
// original trades demonstrate all three original styles exactly once.
export const SHOWCASE_EXAMPLES: ShowcaseExample[] = [
  { tradeSlug: "hvac", styleVariant: "fast-response" },
  { tradeSlug: "painting", styleVariant: "premium-professional" },
  { tradeSlug: "plumbing", styleVariant: "trusted-local" },
  { tradeSlug: "landscaping", styleVariant: "trusted-local" },
  { tradeSlug: "electrical", styleVariant: "premium-professional" },
  { tradeSlug: "remodeling", styleVariant: "premium-professional" },
];
const ROTATION_MS = 6000;
const SHOWCASE_TRADES_IN_ORDER = SHOWCASE_EXAMPLES.map((ex) => getTradeBySlug(ex.tradeSlug)).filter(
  (t): t is Trade => Boolean(t),
);

type ActiveTradeContextValue = {
  activeSlug: string;
  activeTrade: Trade;
  activeExample: ShowcaseExample;
  /** The example being cross-faded away from; null once the transition settles. */
  previousExample: ShowcaseExample | null;
  isLocked: boolean;
  /** Picks a showcase example by trade slug and stops automatic rotation. */
  selectExample: (slug: string) => void;
  /** All six showcase trades, in rotation order — the pill selector renders from this. */
  showcaseTradesInOrder: Trade[];
  /** "Claim My FREE {Trade} SmartSite" — centralized so every CTA on the
   * homepage stays in sync and can't drift into slightly different
   * hand-rolled strings. */
  claimCtaLabel: () => string;
  /** Routes into the wizard for live trades, or to the "help us build this"
   * confirmation page for showcase-only trades — the same branch already
   * used by TradeSection.tsx/trades/[slug]/page.tsx, centralized here so
   * every CTA that reads `activeSlug` can't accidentally dead-end a visitor
   * on the generic trade picker. */
  claimCtaHref: () => string;
};

const ActiveTradeContext = createContext<ActiveTradeContextValue | null>(null);

// Rotation state is plain in-memory React state — it resets to the first
// example on a page refresh. "Locked for the session" means "for as long as
// this page stays loaded," not persisted across reloads; unlike
// wizard-context.tsx there's no cost to losing this on refresh, so no
// sessionStorage/localStorage plumbing is used here.
export function ActiveTradeProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (isLocked) return;
    const id = setInterval(() => {
      setPreviousIndex(indexRef.current);
      const next = (indexRef.current + 1) % SHOWCASE_EXAMPLES.length;
      indexRef.current = next;
      setIndex(next);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [isLocked]);

  function selectExample(slug: string) {
    const nextIndex = SHOWCASE_EXAMPLES.findIndex((ex) => ex.tradeSlug === slug);
    if (nextIndex === -1 || nextIndex === indexRef.current) return;
    setPreviousIndex(indexRef.current);
    indexRef.current = nextIndex;
    setIndex(nextIndex);
    setIsLocked(true);
  }

  // previousExample only matters for the ~650ms cross-fade — clear it once
  // the animation settles so the outgoing layer unmounts and stops costing
  // a render.
  useEffect(() => {
    if (previousIndex === null) return;
    const timeout = setTimeout(() => setPreviousIndex(null), 700);
    return () => clearTimeout(timeout);
  }, [previousIndex]);

  const activeExample = SHOWCASE_EXAMPLES[index];
  const previousExample = previousIndex !== null ? SHOWCASE_EXAMPLES[previousIndex] : null;
  const activeTrade = getTradeBySlug(activeExample.tradeSlug);
  if (!activeTrade) return null;

  const value: ActiveTradeContextValue = {
    activeSlug: activeExample.tradeSlug,
    activeTrade,
    activeExample,
    previousExample,
    isLocked,
    selectExample,
    showcaseTradesInOrder: SHOWCASE_TRADES_IN_ORDER,
    claimCtaLabel: () => `Claim My FREE ${activeTrade.name} SmartSite`,
    claimCtaHref: () =>
      LIVE_TRADE_SLUGS.has(activeExample.tradeSlug)
        ? `/build?trade=${activeExample.tradeSlug}`
        : `/trades/${activeExample.tradeSlug}`,
  };

  return <ActiveTradeContext.Provider value={value}>{children}</ActiveTradeContext.Provider>;
}

export function useActiveTrade() {
  const ctx = useContext(ActiveTradeContext);
  if (!ctx) throw new Error("useActiveTrade must be used within ActiveTradeProvider");
  return ctx;
}
