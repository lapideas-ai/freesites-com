import type { BusinessData } from "../types";

// Sample data for the Remodeling canonical SmartSite prototype. Fictional
// business — .example email domain and a non-dialable phone number are
// used deliberately (IANA/NANP reserved placeholder conventions) since
// this is template content, not a real customer's site.
export const ashfordSample: BusinessData = {
  companyName: "Ashford & Hale Renovations",
  logoUrl: null,
  tagline: "Thoughtful renovations, built to last generations.",
  description:
    "Ashford & Hale Renovations has led kitchen, bath, and whole-home renovations for Ashford Hills families for 20 years. Every project is design-led from the first sketch through the final walkthrough — one dedicated team, no subcontractor guesswork.",
  phone: "(555) 084-6621",
  email: "hello@ashfordhale.example",
  address: { street: "17 Kirkwood Terrace", city: "Ashford Hills", state: "MA", zip: "02493" },
  serviceArea: "Ashford Hills and the greater Boston metro west",
  services: [
    { name: "Kitchen Remodels", description: "Full redesigns from layout through final cabinetry and finishes." },
    { name: "Bathroom Remodels", description: "Spa-level primary baths and efficient guest-bath refreshes." },
    { name: "Whole-Home Renovations", description: "Multi-room and additions, managed as one continuous project." },
    { name: "Design Consultations", description: "In-house design led from concept sketch through material selection." },
    { name: "Structural & Additions", description: "Layout changes, additions, and load-bearing work done right." },
    { name: "Project Management", description: "One dedicated lead from permits through final walkthrough." },
  ],
  testimonials: [
    { quote: "They managed eleven weeks of kitchen construction with zero surprises. Rare in this industry.", author: "The Whitfields", location: "Ashford Hills, MA", rating: 5 },
    { quote: "Our primary bath now feels like a hotel suite. Worth every consultation.", author: "Grace L.", location: "Weston, MA", rating: 5 },
    { quote: "One point of contact for the entire renovation — no chasing down subcontractors.", author: "Marcus D.", location: "Ashford Hills, MA", rating: 5 },
  ],
  credentials: { licenseNumber: "GC-LIC #55310", licensedAndInsured: true, yearsInBusiness: 20 },
  responseTimeMinutes: 180,
  googleRating: 4.9,
  googleReviewCount: 97,
};
