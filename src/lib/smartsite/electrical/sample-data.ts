import type { BusinessData } from "../types";

// Sample data for the Electrical canonical SmartSite prototypes. Fictional
// business — .example email domain and a non-dialable phone number are used
// deliberately (IANA/NANP reserved placeholder conventions) since this is
// template content, not a real customer's site.
export const voltrightSample: BusinessData = {
  companyName: "Voltright Electric",
  logoUrl: null,
  tagline: "Safe, code-compliant electrical work — every time.",
  description:
    "Voltright Electric has served the Crestwood area for 12 years. Licensed master electricians who diagnose the real problem, explain it clearly, and leave every job safe and code-compliant — no shortcuts, no guesswork.",
  phone: "(555) 084-2210",
  email: "hello@voltrightelectric.example",
  address: { street: "540 Ampere Way", city: "Crestwood", state: "IL", zip: "60445" },
  serviceArea: "Crestwood and surrounding communities, up to 20 miles",
  services: [
    { name: "Panel Upgrades & Replacement", description: "Modern breaker panels installed safely and up to code." },
    { name: "Wiring & Rewiring", description: "Full-home rewiring and targeted repairs, done right." },
    { name: "Lighting Installation & Repair", description: "Indoor, outdoor, and specialty lighting installed cleanly." },
    { name: "EV Charger Installation", description: "Level 2 charger installs sized correctly for your home." },
    { name: "Electrical Safety Inspections", description: "A thorough check before problems become hazards." },
    { name: "24/7 Emergency Electrical", description: "Sparking outlet or dead panel — we answer, day or night." },
  ],
  testimonials: [
    { quote: "Smelled something burning near our panel at midnight — they were here in 35 minutes.", author: "Marcus D.", location: "Crestwood, IL", rating: 5 },
    { quote: "Explained exactly what was wrong before touching anything. Passed inspection first try.", author: "Wendy S.", location: "Ashford, IL", rating: 5 },
    { quote: "12 years in business and they still triple-check every connection.", author: "Cody R.", location: "Crestwood, IL", rating: 5 },
  ],
  credentials: { licenseNumber: "Master Electrician Lic. #EL-77420", licensedAndInsured: true, yearsInBusiness: 12 },
  responseTimeMinutes: 34,
  googleRating: 4.9,
  googleReviewCount: 198,
};
