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
// `components` is Partial: showcase-only trades (Painting, Landscaping,
// Remodeling) ship with just one style built so far, not all three. Every
// consumer that indexes into `components[x]` must guard for `undefined` —
// for the six-step funnel that guard is purely cosmetic (those trades are
// never in LIVE_TRADE_SLUGS, so the funnel can never actually reach an
// undefined entry), but strict TypeScript can't know that statically.
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

export function getTradeRegistry(tradeSlug: string): TradeRegistryEntry | undefined {
  return SMARTSITE_REGISTRY[tradeSlug];
}
