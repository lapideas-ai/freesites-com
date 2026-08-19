import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedSmartSite } from "@/lib/published-sites";
import { getTradeRegistry } from "@/lib/smartsite/registry";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = await getPublishedSmartSite(slug);
  if (!site) return {};
  return {
    title: `${site.business.companyName} | FreeSites`,
    description: site.business.tagline,
  };
}

export default async function PublishedSmartSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getPublishedSmartSite(slug);
  if (!site) notFound();

  const registry = getTradeRegistry(site.tradeSlug);
  const Component = registry?.components[site.styleVariant];
  if (!registry || !Component) notFound();

  return <Component business={site.business} tier={site.tier} />;
}