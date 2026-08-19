"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useActiveTrade } from "@/lib/homepage-active-trade-context";

// Lets the Trades dropdown/list and the Trades-page Custom card deep-link
// into the homepage's existing Custom state via /?trade=custom, instead of
// needing a separate "Custom" page/route — same ?trade=<slug> convention
// already used by /build/start's effect-based sync from its own ?trade=
// param. Synced in an effect, not during render — calling an ancestor's
// (ActiveTradeProvider's) state setter while THIS component renders is an
// invalid cross-component render-phase update (React logs "Cannot update a
// component while rendering a different component," and the update isn't
// reliably guaranteed to apply) — that was the bug behind the Trades
// dropdown's Custom entry intermittently not doing anything on click.
export function CustomQueryParamSync() {
  const searchParams = useSearchParams();
  const { isCustomSelected, selectCustom } = useActiveTrade();
  const isCustomParam = searchParams.get("trade") === "custom";

  useEffect(() => {
    if (isCustomParam && !isCustomSelected) {
      selectCustom();
    }
  }, [isCustomParam, isCustomSelected, selectCustom]);

  return null;
}
