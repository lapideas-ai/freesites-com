// Shared data contract for canonical SmartSites — every trade/style renders
// from this same shape. Adding a field here makes it available to every
// style variant; keep trade-specific data inside `description`/`services`
// rather than growing this type per-trade.

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type BusinessService = {
  name: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export type BusinessCredentials = {
  licenseNumber: string;
  licensedAndInsured: boolean;
  yearsInBusiness: number;
};

export type BusinessData = {
  companyName: string;
  logoUrl: string | null;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: Address;
  serviceArea: string;
  services: BusinessService[];
  testimonials: Testimonial[];
  credentials: BusinessCredentials;
  responseTimeMinutes: number;
  googleRating: number;
  googleReviewCount: number;
};

// starter = SmartSite Starter (free forever, no card), pro = SmartSite Pro
// ($49/mo billed annually, card required), growth = SmartSite Growth
// ($97/mo). See src/lib/tiers.ts — the canonical source for names, pricing,
// billing, and feature copy; don't re-type pricing details elsewhere.
export type Tier = "starter" | "pro" | "growth";

export type StyleVariant =
  | "fast-response"
  | "trusted-local"
  | "premium-professional";

export type SmartSiteRenderProps = {
  business: BusinessData;
  tier: Tier;
  /**
   * Internal review mode only. Shows candidate Starter/Pro boundary
   * markers inline in the full Pro render. Must never be true in
   * anything that resembles a published site.
   */
  ownerPreview?: boolean;
};
