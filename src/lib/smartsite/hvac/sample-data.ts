import type { BusinessData } from "../types";

// Sample data for the HVAC canonical SmartSite prototypes. Fictional business —
// .example email domain and a non-dialable phone number are used deliberately
// (IANA/NANP reserved placeholder conventions) since this is template content,
// not a real customer's site.
export const ironcladSample: BusinessData = {
  companyName: "Ironclad Air & Heat",
  logoUrl: null,
  tagline: "Fast, reliable comfort — day or night.",
  description:
    "Ironclad Air & Heat has kept Fairview-area homes comfortable for 18 years. Our licensed technicians answer fast, show up on time, and fix it right the first time — no overtime charges, no guesswork.",
  phone: "(555) 041-2288",
  email: "hello@ironcladairheat.example",
  address: { street: "412 Foundry Rd", city: "Fairview", state: "OH", zip: "44125" },
  serviceArea: "Fairview and surrounding communities, up to 30 miles",
  services: [
    { name: "AC Repair & Installation", description: "Same-day diagnosis on most cooling breakdowns." },
    { name: "Furnace Repair & Installation", description: "Heat back on fast, even on the coldest night of the year." },
    { name: "Heat Pump Service", description: "Tune-ups, repairs, and full system replacement." },
    { name: "Indoor Air Quality", description: "Filtration, humidity control, and duct cleaning." },
    { name: "Maintenance Plans", description: "Two visits a year so small problems never become expensive ones." },
    { name: "24/7 Emergency Service", description: "No overtime charges — ever." },
  ],
  testimonials: [
    { quote: "Called at 9pm with no AC in July. Someone was at our door in under an hour.", author: "Dana R.", location: "Fairview, OH", rating: 5 },
    { quote: "Upfront pricing, no surprise fees. Fixed our furnace the same day.", author: "Marcus T.", location: "Brookline, OH", rating: 5 },
    { quote: "18 years in business and they've never missed a maintenance appointment.", author: "Priya S.", location: "Fairview, OH", rating: 5 },
  ],
  credentials: { licenseNumber: "HVAC-LIC #48213", licensedAndInsured: true, yearsInBusiness: 18 },
  responseTimeMinutes: 47,
  googleRating: 4.9,
  googleReviewCount: 312,
};
