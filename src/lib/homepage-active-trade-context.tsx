"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getTradeBySlug, LIVE_TRADE_SLUGS, type Trade } from "@/lib/trades";

// Dedicated rotation order — deliberately not derived from trades.ts's own
// array order, which serves the Trades dropdown menu (a different concern
// with no guaranteed ordering). Filtered against LIVE_TRADE_SLUGS
// defensively so this never rotates into a trade with no real SmartSite.
const ROTATION_ORDER = ["hvac", "plumbing", "electrical"].filter((slug) => LIVE_TRADE_SLUGS.has(slug));
const ROTATION_MS = 6000;
const LIVE_TRADES_IN_ORDER = ROTATION_ORDER.map(getTradeBySlug).filter((t): t is Trade => Boolean(t));

type ActiveTradeContextValue = {
  activeSlug: string;
  activeTrade: Trade;
  isLocked: boolean;
  selectTrade: (slug: string) => void;
  /** Live trades in rotation order — the single list the pill selector
   * renders from, so it always matches what actually rotates. */
  liveTradesInOrder: Trade[];
  /** "Claim My FREE {Trade} SmartSite" — centralized so every CTA on the
   * homepage stays in sync and can't drift into five slightly different
   * hand-rolled strings. */
  claimCtaLabel: () => string;
};

const ActiveTradeContext = createContext<ActiveTradeContextValue | null>(null);

// Rotation state is plain in-memory React state — it resets to the first
// trade on a page refresh. "Locked for the session" means "for as long as
// this page stays loaded," not persisted across reloads; unlike
// wizard-context.tsx there's no cost to losing this on refresh, so no
// sessionStorage/localStorage plumbing is used here.
export function ActiveTradeProvider({ children }: { children: React.ReactNode }) {
  const [activeSlug, setActiveSlug] = useState(ROTATION_ORDER[0]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (isLocked) return;
    const id = setInterval(() => {
      setActiveSlug((current) => {
        const nextIndex = (ROTATION_ORDER.indexOf(current) + 1) % ROTATION_ORDER.length;
        return ROTATION_ORDER[nextIndex];
      });
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [isLocked]);

  function selectTrade(slug: string) {
    setActiveSlug(slug);
    setIsLocked(true);
  }

  const activeTrade = getTradeBySlug(activeSlug);
  if (!activeTrade) return null;

  const value: ActiveTradeContextValue = {
    activeSlug,
    activeTrade,
    isLocked,
    selectTrade,
    liveTradesInOrder: LIVE_TRADES_IN_ORDER,
    claimCtaLabel: () => `Claim My FREE ${activeTrade.name} SmartSite`,
  };

  return <ActiveTradeContext.Provider value={value}>{children}</ActiveTradeContext.Provider>;
}

export function useActiveTrade() {
  const ctx = useContext(ActiveTradeContext);
  if (!ctx) throw new Error("useActiveTrade must be used within ActiveTradeProvider");
  return ctx;
}
