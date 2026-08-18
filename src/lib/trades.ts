import { getDefaultStyleVariant } from "@/lib/smartsite/registry";

export type Trade = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  services: string[];
};

export const trades: Trade[] = [
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: "🔧",
    description: "Repairs, installs, and emergency calls",
    services: ["Emergency repairs", "Drain cleaning", "Water heaters", "Fixture installs"],
  },
  {
    slug: "electrical",
    name: "Electrical",
    icon: "⚡",
    description: "Wiring, panels, and lighting",
    services: ["Panel upgrades", "Wiring & rewiring", "Lighting install", "Safety inspections"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    icon: "🌡️",
    description: "Heating, cooling, and air quality",
    services: ["AC repair", "Furnace service", "Duct cleaning", "System install"],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    icon: "🌿",
    description: "Lawn care, design, and maintenance",
    services: ["Lawn maintenance", "Landscape design", "Irrigation", "Seasonal cleanup"],
  },
  {
    slug: "roofing",
    name: "Roofing",
    icon: "🏠",
    description: "Repairs, replacement, and inspections",
    services: ["Storm damage repair", "Full replacement", "Inspections", "Gutter work"],
  },
  {
    slug: "remodeling",
    name: "Remodeling",
    icon: "🏛️",
    description: "Kitchens, bathrooms, and whole-home renovations",
    services: ["Kitchen remodels", "Bathroom remodels", "Whole-home renovations", "Design consultations"],
  },
  {
    slug: "painting",
    name: "Painting",
    icon: "🎨",
    description: "Interior and exterior painting",
    services: ["Interior painting", "Exterior painting", "Cabinet refinishing", "Free estimates"],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    icon: "🧽",
    description: "Residential and commercial cleaning",
    services: ["Recurring cleaning", "Deep cleaning", "Move-in/out", "Commercial"],
  },
  {
    slug: "general-contracting",
    name: "General Contracting",
    icon: "🏗️",
    description: "Renovations and builds",
    services: ["Renovations", "Additions", "Project management", "Free estimates"],
  },
  {
    slug: "handyman",
    name: "Handyman",
    icon: "🛠️",
    description: "Small jobs and general repairs",
    services: ["Repairs", "Assembly", "Small installs", "Honey-do lists"],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    icon: "🐜",
    description: "Inspection and treatment services",
    services: ["Inspections", "Treatment plans", "Termite control", "Recurring service"],
  },
  {
    slug: "flooring",
    name: "Flooring",
    icon: "🪵",
    description: "Install, refinish, and repair",
    services: ["Hardwood install", "Refinishing", "Tile & vinyl", "Free estimates"],
  },
  {
    slug: "concrete",
    name: "Concrete",
    icon: "🧱",
    description: "Driveways, patios, and foundations",
    services: ["Driveways", "Patios & walkways", "Foundations", "Free estimates"],
  },
  {
    slug: "garage-doors",
    name: "Garage Doors",
    icon: "🚪",
    description: "Install, repair, and replacement",
    services: ["Spring repair", "Opener install", "Full replacement", "Same-day service"],
  },
  {
    slug: "windows",
    name: "Windows",
    icon: "🪟",
    description: "Replacement and installation",
    services: ["Window replacement", "New installs", "Energy-efficient upgrades", "Free estimates"],
  },
  {
    slug: "tree-service",
    name: "Tree Service",
    icon: "🌳",
    description: "Removal, trimming, and stump grinding",
    services: ["Tree removal", "Trimming & pruning", "Stump grinding", "Emergency service"],
  },
  {
    slug: "pool-service",
    name: "Pool Service",
    icon: "🏊",
    description: "Cleaning, repair, and maintenance",
    services: ["Weekly cleaning", "Equipment repair", "Opening & closing", "Chemical balancing"],
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    icon: "🚚",
    description: "Hauling and cleanouts",
    services: ["Same-day hauling", "Estate cleanouts", "Construction debris", "Free estimates"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    icon: "💦",
    description: "Exterior cleaning services",
    services: ["Driveways & sidewalks", "House washing", "Deck & fence", "Free estimates"],
  },
  {
    slug: "solar",
    name: "Solar",
    icon: "☀️",
    description: "Installation and consultation",
    services: ["System install", "Consultations", "Maintenance", "Financing available"],
  },
  {
    slug: "fencing",
    name: "Fencing",
    icon: "🚧",
    description: "Install and repair",
    services: ["New installs", "Repairs", "Gate service", "Free estimates"],
  },
  {
    slug: "other",
    name: "Other",
    icon: "✨",
    description: "Don't see your trade? Start here",
    services: ["Free estimates", "Licensed & insured", "Local service", "Fast response"],
  },
];

export function getTradeBySlug(slug: string): Trade | undefined {
  return trades.find((trade) => trade.slug === slug);
}

// HVAC, Plumbing, and Electrical all have real canonical styles built —
// single source of truth shared by /build/trade, the homepage nav/cards,
// and /trades/[slug], so live trades route straight into the wizard and
// everything else gets the "help us build this next" confirmation instead
// of a 404 or a dead end.
export const LIVE_TRADE_SLUGS = new Set(["hvac", "plumbing", "electrical"]);

// Every trade with at least one real SmartSite style built — a superset of
// LIVE_TRADE_SLUGS. Painting, Landscaping, and Remodeling have a completed,
// viewable SmartSite (see src/lib/smartsite/registry.ts) but aren't
// wizard-selectable yet (only one style each, not three), so they route to
// their /examples page instead of into /build. Everything outside this set
// gets the "help us build this next" confirmation.
export const BUILT_TRADE_SLUGS = new Set(["hvac", "plumbing", "electrical", "painting", "landscaping", "remodeling"]);

// Single canonical "where does this trade's CTA go" helper. Every trade
// entry point — the homepage pill selector's claim CTA, the "By Industry"
// grid, the Header Trades dropdown, and the /trades page grid — should
// route through this instead of re-deriving the live/built branching
// locally, which is what let those surfaces drift out of sync (some
// dropped the ?trade= param on live trades, some sent built-but-not-live
// trades to the generic "help us build this" page instead of their real,
// already-built example). Adding a trade to LIVE_TRADE_SLUGS or
// BUILT_TRADE_SLUGS above is now the only change needed for every one of
// those surfaces to route it correctly.
export function getTradeEntryHref(tradeSlug: string): string {
  if (LIVE_TRADE_SLUGS.has(tradeSlug)) return `/build?trade=${tradeSlug}`;
  const style = getDefaultStyleVariant(tradeSlug);
  if (style) return `/examples/${tradeSlug}/${style}`;
  return `/trades/${tradeSlug}`;
}
