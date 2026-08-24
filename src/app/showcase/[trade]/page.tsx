import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShowcasePage } from "@/components/showcase-page";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import { getTradeBySlug } from "@/lib/trades";
import type { BusinessData } from "@/lib/smartsite/types";

const BASE_URL = "https://freesites.com";

function buildShowcaseBusiness(sample: BusinessData, params: { business?: string; city?: string; phone?: string }) {
  return {
    ...sample,
    companyName: params.business?.trim() || sample.companyName,
    phone: params.phone?.trim() || sample.phone,
    address: {
      ...sample.address,
      city: params.city?.trim() || sample.address.city,
    },
    serviceArea: params.city?.trim() ? `${params.city.trim()} and surrounding communities` : sample.serviceArea,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ trade: string }> }): Promise<Metadata> {
  const { trade: tradeSlug } = await params;
  const trade = getTradeBySlug(tradeSlug);
  if (!trade || !getTradeRegistry(tradeSlug)) return {};
  return {
    title: `3 ${trade.name} SmartSite Ideas | FreeSites`,
    description: `Explore three ${trade.name} SmartSite directions and choose the one that fits your business best.`,
    alternates: { canonical: `${BASE_URL}/showcase/${tradeSlug}` },
  };
}

export default async function ShowcaseTradePage({
  params,
  searchParams,
}: {
  params: Promise<{ trade: string }>;
  searchParams: Promise<{ business?: string; city?: string; phone?: string }>;
}) {
  const { trade: tradeSlug } = await params;
  const query = await searchParams;
  const registry = getTradeRegistry(tradeSlug);
  if (!registry || !getTradeBySlug(tradeSlug)) notFound();

  return <ShowcasePage tradeSlug={tradeSlug} business={buildShowcaseBusiness(registry.sample, query)} />;
}
