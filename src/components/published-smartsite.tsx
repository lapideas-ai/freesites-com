"use client";

import { getTradeRegistry } from "@/lib/smartsite/registry";
import type { BusinessData, StyleVariant, Tier } from "@/lib/smartsite/types";

export function PublishedSmartSite({
  tradeSlug,
  styleVariant,
  business,
  tier,
}: {
  tradeSlug: string;
  styleVariant: StyleVariant;
  business: BusinessData;
  tier: Tier;
}) {
  const registry = getTradeRegistry(tradeSlug);
  const Component = registry?.components[styleVariant];
  if (!Component) return null;
  return <Component business={business} tier={tier} />;
}