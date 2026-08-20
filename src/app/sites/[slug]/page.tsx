import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublishedSmartSite } from "@/components/published-smartsite";
import { getPublishedSmartSite } from "@/lib/published-sites";

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

  return (
    <PublishedSmartSite
      tradeSlug={site.tradeSlug}
      styleVariant={site.styleVariant}
      business={site.business}
      tier={site.tier}
    />
  );
}