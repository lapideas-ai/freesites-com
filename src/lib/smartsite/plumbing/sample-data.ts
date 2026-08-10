import type { BusinessData } from "../types";

// Sample data for the Plumbing canonical SmartSite prototypes. Fictional
// business — .example email domain and a non-dialable phone number are used
// deliberately (IANA/NANP reserved placeholder conventions) since this is
// template content, not a real customer's site.
export const bluewaterSample: BusinessData = {
  companyName: "Bluewater Plumbing & Drain",
  logoUrl: null,
  tagline: "Fast, honest plumbing — day or night.",
  description:
    "Bluewater Plumbing & Drain has served the Ridgeline area for 15 years. Licensed master plumbers who show up on time, explain the problem clearly, and fix it right the first time — no surprise fees, no runaround.",
  phone: "(555) 067-3391",
  email: "hello@bluewaterplumbing.example",
  address: { street: "218 Millbrook Ave", city: "Ridgeline", state: "TX", zip: "75024" },
  serviceArea: "Ridgeline and surrounding communities, up to 25 miles",
  services: [
    { name: "Drain Cleaning & Rooter Service", description: "Fast, thorough clearing for stubborn clogs and slow drains." },
    { name: "Water Heater Repair & Installation", description: "Same-day repairs and same-week installs, tank or tankless." },
    { name: "Leak Detection & Repair", description: "Pinpoint hidden leaks before they become water damage." },
    { name: "Pipe Repair & Repiping", description: "From a single fix to a full repipe, done right the first time." },
    { name: "Fixture & Faucet Installation", description: "Sinks, toilets, and faucets installed clean and leak-free." },
    { name: "24/7 Emergency Plumbing", description: "Burst pipe or sewage backup — we answer, day or night." },
  ],
  testimonials: [
    { quote: "Burst pipe at 11pm and someone was here in 40 minutes. Saved our floors.", author: "Renee K.", location: "Ridgeline, TX", rating: 5 },
    { quote: "Upfront pricing, no surprise fees. Fixed our water heater the same day.", author: "Tom B.", location: "Millbrook, TX", rating: 5 },
    { quote: "15 years in business and they still treat every job like it's their first.", author: "Alicia M.", location: "Ridgeline, TX", rating: 5 },
  ],
  credentials: { licenseNumber: "Master Plumber Lic. #M-38214", licensedAndInsured: true, yearsInBusiness: 15 },
  responseTimeMinutes: 38,
  googleRating: 4.8,
  googleReviewCount: 267,
};
