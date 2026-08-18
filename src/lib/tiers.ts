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
  /**
   * Direct GHL checkout link (pay.freesites.com) — present only for tiers
   * with a real, immediate purchase path (Pro's annual plan, Growth).
   * Starter has none; it keeps routing into the existing FREE SmartSite
   * creation funnel instead of a checkout.
   */
  checkoutHref?: string;
  /** Pro's separate month-to-month checkout, linked from the monthToMonthPrice line. */
  monthToMonthCheckoutHref?: string;
  /** Short trial/billing disclosure shown under the price, e.g. "14-day free trial · $0 due today" or "No free trial". */
  trialNote?: string;
  /** Small savings badge shown next to the price, e.g. "SAVE $360/YEAR". Only Pro has one today. */
  savingsBadge?: string;
  /** Short value-prop headline shown above the price — the "sell before the click." Only Pro/Growth have one. */
  pitchHeadline?: string;
  /** One supporting sentence under pitchHeadline. */
  pitchBody?: string;
  /** Overrides the default button label ("Claim {name}" / "Start {name}") when set. */
  ctaLabel?: string;
  /** Fine print shown just above the primary CTA — the post-trial billing reality for the tier's primary (annual, for Pro) price. */
  postTrialNote?: string;
  /** Fine print shown just under the monthToMonthPrice link — the post-trial billing reality for the secondary (monthly) price. */
  monthToMonthPostTrialNote?: string;
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
    billingNote: "Billed $588 annually",
    monthToMonthPrice: "$79",
    creditCardNote: "Credit card required",
    tagline: "AI-powered customer response — turn more inquiries into booked jobs, 24/7.",
    features: [
      "Everything in Starter",
      "SmartReply Email, SMS, Voice, and Booking",
      "FreeSites branding removed",
      "Optional custom domain",
      "Same SmartSite, branding, and business identity",
    ],
    pitchHeadline: "Turn Your FREE SmartSite Into a 24/7 Customer Acquisition System",
    pitchBody: "Add SmartReply™ Email, SMS, Voice & Booking. Try everything FREE for 14 days — $0 due today.",
    ctaLabel: "Start My FREE 14-Day Trial →",
    trialNote: "14-day FREE trial · $0 due today",
    savingsBadge: "SAVE $360/YEAR",
    postTrialNote: "Then $588/year ($49/mo). Save $360/year.",
    monthToMonthPostTrialNote: "Then $79/month.",
    checkoutHref: "https://pay.freesites.com/payment-link/6a5fc2e0a655fa0b802a56e8",
    monthToMonthCheckoutHref: "https://pay.freesites.com/payment-link/6a7b949bc8cc9a2ce72677c9",
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
      "Custom Website",
      "Expanded contractor content and features",
      "Deeper service and service-area content",
      "Gallery, FAQ, financing, trust, and scheduling",
      "FreeSites-managed integrations",
    ],
    pitchHeadline: "Includes a Custom Website",
    pitchBody: "Everything in Pro, plus a Custom Website and FreeSites-managed implementation.",
    ctaLabel: "Start SmartSite Growth — $97/mo →",
    trialNote: "$97 due today. No free trial.",
    checkoutHref: "https://pay.freesites.com/payment-link/6a7b9223c8cc9a2ce72677c4",
  },
};

export const tierList: Tier[] = [tiers.starter, tiers.pro, tiers.growth];
