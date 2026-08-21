import { getStore } from "@netlify/blobs";
import type { WizardState } from "@/lib/wizard-context";
import type { BusinessData, StyleVariant, Tier } from "@/lib/smartsite/types";

const STORE_NAME = "published-smartsites";
const KEY_PREFIX = "sites/";

export type PublishedSmartSite = {
  version: 1;
  slug: string;
  tradeSlug: string;
  styleVariant: StyleVariant;
  tier: Tier;
  business: BusinessData;
  config: WizardState;
  createdAt: string;
  updatedAt: string;
};

function store() {
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

export function siteKey(slug: string) {
  return `${KEY_PREFIX}${slug}`;
}

export function siteUrl(slug: string) {
  return `https://freesites.com/sites/${slug}`;
}

export async function savePublishedSmartSite(site: PublishedSmartSite) {
  return store().setJSON(siteKey(site.slug), site, { onlyIfNew: true });
}

export async function getPublishedSmartSite(slug: string) {
  return getStore({ name: STORE_NAME }).get(siteKey(slug), { type: "json" }) as Promise<PublishedSmartSite | null>;
}

export function createSiteSlug(businessName: string, suffix?: number) {
  const readable = businessName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "smartsite";
  return suffix && suffix > 1 ? `${readable}-${suffix}` : readable;
}