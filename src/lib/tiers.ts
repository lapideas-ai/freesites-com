// Customer-facing product ladder. Naming, pricing, and copy are the approved
// canonical FreeSites product ladder — keep every display of pricing/tier
// copy across the app sourced from here rather than re-typed inline.
// Avoid technical terms (AI, CRM, workflow, automation); customers are
// buying business results, not software architecture.
export type TierId = "starter" | "pro" | "growth";

export type Tier = {
  id: TierId;
  name: string;
  price: string;
  cadence: string;
  /** Extra billing detail shown next to price, e.g. "Billed annually". Only Pro has one today. */
  billingNote?: string;
  /** The non-annual alternative price, e.g. "$79" for Pro's month-to-month option. Only Pro has one today. */
  monthToMonthPrice?: string;
  /** Always shown — the credit-card expectation is a key differentiator between Starter and everything above it. */
  creditCardNote: string;
  tagline: string;
  features: string[];
};

export const tiers: Record<TierId, Tier> = {
  starter: {
    id: "starter",
    name: "SmartSite Starter",
    price: "Free",
    cadence: "forever",
    creditCardNote: "No credit card required",
    tagline: "A complete, professional website — worth launching on day one",
    features: [
      "Professional SmartSite",
      "SmartReply Email",
      "Contact form & click-to-call",
      "Mobile-first design",
      "FreeSites subdomain (yourbusiness.freesites.com)",
      "Footer attribution: Made with ❤️ in the USA by FreeSites",
    ],
  },
  pro: {
    id: "pro",
    name: "SmartSite Pro",
    price: "$49",
    cadence: "/mo",
    billingNote: "Billed annually",
    monthToMonthPrice: "$79",
    creditCardNote: "Credit card required",
    tagline: "Your first paid communication platform — always-on, everywhere",
    features: [
      "Everything in Starter",
      "SmartReply Email, SMS, Voice, and Booking",
      "FreeSites branding removed",
      "Optional custom domain",
      "Same SmartSite, branding, and business identity",
    ],
  },
  growth: {
    id: "growth",
    name: "SmartSite Growth",
    price: "$97",
    cadence: "/mo",
    creditCardNote: "Credit card required",
    tagline: "A fully custom site built to win more work",
    features: [
      "Everything in Pro",
      "Complete custom SmartSite",
      "Expanded contractor content and features",
      "Deeper service and service-area content",
      "Gallery, FAQ, financing, trust, and scheduling",
      "FreeSites-managed integrations",
    ],
  },
};

export const tierList: Tier[] = [tiers.starter, tiers.pro, tiers.growth];
