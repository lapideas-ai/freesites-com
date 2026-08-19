import type { MetadataRoute } from "next";

// Disallows only genuinely internal/non-customer-facing routes — the
// wizard funnel (no ranking value, mid-flow form steps) and the reviewer
// tooling under /compare, /preview, /review, /smartsite-preview (explicitly
// "not part of the permanent app... not linked from anywhere customer-
// facing" per their own page comments). Everything else, including all
// /trades pages, stays crawlable — the six built trade pages are exactly
// what this SEO pass exists to make indexable.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/build/", "/compare", "/preview/", "/review/", "/smartsite-preview"],
    },
    sitemap: "https://freesites.com/sitemap.xml",
  };
}
