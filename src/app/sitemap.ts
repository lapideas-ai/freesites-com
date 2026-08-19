import type { MetadataRoute } from "next";
import { trades, BUILT_TRADE_SLUGS } from "@/lib/trades";

const BASE_URL = "https://freesites.com";

// Trade entries are derived from BUILT_TRADE_SLUGS (trades.ts) — adding a
// trade there is the only change needed for it to also gain sitemap
// eligibility here, no separate URL list to maintain.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/trades`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pro`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/funding`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const tradeRoutes: MetadataRoute.Sitemap = trades
    .filter((t) => BUILT_TRADE_SLUGS.has(t.slug))
    .map((t) => ({
      url: `${BASE_URL}/trades/${t.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  return [...staticRoutes, ...tradeRoutes];
}
