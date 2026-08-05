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
