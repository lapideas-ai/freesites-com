import { NextResponse } from "next/server";
import { getPublishedSmartSite } from "@/lib/published-sites";

const DIAGNOSTIC_SLUG = "123-hvac-hvac-15fb5fcbfe";

export async function GET() {
  const site = await getPublishedSmartSite(DIAGNOSTIC_SLUG);

  if (!site) {
    return NextResponse.json({ found: false, slug: DIAGNOSTIC_SLUG });
  }

  return NextResponse.json({
    found: true,
    slug: site.slug,
    tradeSlug: site.tradeSlug,
    styleVariant: site.styleVariant,
    tier: site.tier,
    business: {
      companyName: site.business.companyName,
      phone: site.business.phone,
      email: site.business.email,
      address: site.business.address,
    },
  });
}