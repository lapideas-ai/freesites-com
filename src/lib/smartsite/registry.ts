import type { ComponentType } from "react";
import type { BusinessData, SmartSiteRenderProps, StyleVariant } from "./types";
import type { WizardState } from "@/lib/wizard-context";
import { hvacRegistry } from "@/components/smartsite/hvac/registry";
import { plumbingRegistry } from "@/components/smartsite/plumbing/registry";
import { electricalRegistry } from "@/components/smartsite/electrical/registry";
import { paintingRegistry } from "@/components/smartsite/painting/registry";
import { landscapingRegistry } from "@/components/smartsite/landscaping/registry";
import { remodelingRegistry } from "@/components/smartsite/remodeling/registry";

// Thin aggregator, not a place where every trade's imports pile up. Each
// trade self-registers from its own folder (see hvacRegistry) — adding a
// new trade means adding one new folder plus one new line below, never
// touching another trade's files. Component maps use next/dynamic (see
// each trade's registry.ts) so a page that only renders one trade never
// pulls every other trade's component tree into its bundle — this matters
// once there are 30+ trades × 3 styles instead of 3.
//
// `components` is Partial because some production-ready trades have one style
// while others have three. Consumers must guard unavailable style variants.
export type TradeRegistryEntry = {
  components: Partial<Record<StyleVariant, ComponentType<SmartSiteRenderProps>>>;
  sample: BusinessData;
  buildBusinessDataFromWizard: (state: WizardState) => BusinessData;
};

export const SMARTSITE_REGISTRY: Record<string, TradeRegistryEntry> = {
  hvac: hvacRegistry,
  plumbing: plumbingRegistry,
  electrical: electricalRegistry,
  painting: paintingRegistry,
  landscaping: landscapingRegistry,
  remodeling: remodelingRegistry,
};

export const REGISTERED_TRADE_SLUGS = Object.freeze(Object.keys(SMARTSITE_REGISTRY));

export function getTradeRegistry(tradeSlug: string): TradeRegistryEntry | undefined {
  return SMARTSITE_REGISTRY[tradeSlug];
}

const STYLE_PREFERENCE_ORDER: StyleVariant[] = ["fast-response", "trusted-local", "premium-professional"];

// For trades with only one style built (Painting, Landscaping, Remodeling
// today), this is "the" style to link to from anywhere that just needs "a
// working example page" for the trade — e.g. the Trades page's card link
// for a completed-but-not-live trade. Returns undefined if the trade has
// no registry entry at all.
export function getDefaultStyleVariant(tradeSlug: string): StyleVariant | undefined {
  const registry = getTradeRegistry(tradeSlug);
  if (!registry) return undefined;
  return STYLE_PREFERENCE_ORDER.find((style) => registry.components[style]);
}
