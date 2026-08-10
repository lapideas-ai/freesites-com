import type { ComponentType } from "react";
import type { BusinessData, SmartSiteRenderProps, StyleVariant } from "./types";
import type { WizardState } from "@/lib/wizard-context";
import { hvacRegistry } from "@/components/smartsite/hvac/registry";
import { plumbingRegistry } from "@/components/smartsite/plumbing/registry";
import { electricalRegistry } from "@/components/smartsite/electrical/registry";

// Thin aggregator, not a place where every trade's imports pile up. Each
// trade self-registers from its own folder (see hvacRegistry) — adding a
// new trade means adding one new folder plus one new line below, never
// touching another trade's files. Component maps use next/dynamic (see
// each trade's registry.ts) so a page that only renders one trade never
// pulls every other trade's component tree into its bundle — this matters
// once there are 30+ trades × 3 styles instead of 3.
export type TradeRegistryEntry = {
  components: Record<StyleVariant, ComponentType<SmartSiteRenderProps>>;
  sample: BusinessData;
  buildBusinessDataFromWizard: (state: WizardState) => BusinessData;
};

export const SMARTSITE_REGISTRY: Record<string, TradeRegistryEntry> = {
  hvac: hvacRegistry,
  plumbing: plumbingRegistry,
  electrical: electricalRegistry,
};

export function getTradeRegistry(tradeSlug: string): TradeRegistryEntry | undefined {
  return SMARTSITE_REGISTRY[tradeSlug];
}
