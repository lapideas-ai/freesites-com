"use client";

import { useSearchParams } from "next/navigation";
import { useActiveTrade } from "@/lib/homepage-active-trade-context";

// Lets the Trades dropdown/list and the Trades-page Custom card deep-link
// into the homepage's existing Custom state via /?trade=custom, instead of
// needing a separate "Custom" page/route — same ?trade=<slug> convention
// already used by /build's redirect into the wizard. Adjusts state during
// render (guarded by isCustomSelected) rather than in an effect, so there's
// no one-frame flash of the default trade before Custom takes over.
export function CustomQueryParamSync() {
  const searchParams = useSearchParams();
  const { isCustomSelected, selectCustom } = useActiveTrade();

  if (searchParams.get("trade") === "custom" && !isCustomSelected) {
    selectCustom();
  }

  return null;
}
