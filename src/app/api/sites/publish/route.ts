import { NextResponse } from "next/server";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import {
  createSiteSlug,
  savePublishedSmartSite,
  siteUrl,
  type PublishedSmartSite,
} from "@/lib/published-sites";
import type { WizardState } from "@/lib/wizard-context";
import type { StyleVariant, Tier } from "@/lib/smartsite/types";

type PublishRequest = {
  config: WizardState;
};

function isValidConfig(
  config: WizardState,
): config is WizardState & { tradeSlug: string; styleVariant: StyleVariant } {
  return Boolean(
    config &&
      config.tradeSlug &&
      config.styleVariant &&
      config.businessName?.trim() &&
      config.phone?.trim() &&
      config.email?.trim(),
  );
}

export async function POST(request: Request) {
  let body: PublishRequest;
  try {
    body = (await request.json()) as PublishRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const config = body.config;
  if (!isValidConfig(config)) {
    return NextResponse.json({ error: "Incomplete SmartSite configuration" }, { status: 400 });
  }

  const registry = getTradeRegistry(config.tradeSlug);
  if (!registry || !registry.components[config.styleVariant]) {
    return NextResponse.json({ error: "Unsupported SmartSite design" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const slug = createSiteSlug(config.businessName, config.tradeSlug);
  const record: PublishedSmartSite = {
    version: 1,
    slug,
    tradeSlug: config.tradeSlug,
    styleVariant: config.styleVariant as StyleVariant,
    tier: config.tier as Tier,
    business: registry.buildBusinessDataFromWizard(config),
    config,
    createdAt: now,
    updatedAt: now,
  };

  const result = await savePublishedSmartSite(record);
  if (!result.modified) {
    return NextResponse.json({ error: "Could not reserve a unique site URL" }, { status: 409 });
  }

  return NextResponse.json({ slug, site_url: siteUrl(slug) });
}