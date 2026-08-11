import type { BusinessData } from "../types";

// Sample data for the Painting canonical SmartSite prototype. Fictional
// business — .example email domain and a non-dialable phone number are
// used deliberately (IANA/NANP reserved placeholder conventions) since
// this is template content, not a real customer's site.
export const lucentSample: BusinessData = {
  companyName: "Lucent Painting Co.",
  logoUrl: null,
  tagline: "Beautifully finished, inside and out.",
  description:
    "Lucent Painting Co. has brought color and craftsmanship to Cedar Grove-area homes for 12 years. From a single accent wall to a full exterior repaint, every project gets the same meticulous prep, clean lines, and finish that holds up for years — not just until the next open house.",
  phone: "(555) 073-4419",
  email: "hello@lucentpainting.example",
  address: { street: "88 Millbrook Lane", city: "Cedar Grove", state: "OR", zip: "97035" },
  serviceArea: "Cedar Grove and the greater Portland metro",
  services: [
    { name: "Interior Painting", description: "Walls, trim, and ceilings finished to a flawless, lasting sheen." },
    { name: "Exterior Painting", description: "Weather-ready coatings that protect and refresh your home's exterior." },
    { name: "Cabinet Refinishing", description: "Kitchen and bath cabinets transformed without a full replacement." },
    { name: "Color Consultation", description: "Personalized palette guidance from a design-trained specialist." },
    { name: "Deck & Fence Staining", description: "Rich, protective stains for outdoor wood surfaces." },
    { name: "Free Estimates", description: "A detailed, no-obligation quote before any work begins." },
  ],
  testimonials: [
    { quote: "They transformed our entire first floor in three days — spotless prep, flawless lines, zero mess left behind.", author: "Sarah M.", location: "Cedar Grove, OR", rating: 5 },
    { quote: "The color consultation alone was worth it. Our home finally feels like us.", author: "Daniel K.", location: "Lake Oswego, OR", rating: 5 },
    { quote: "Exterior repaint held up beautifully through two brutal winters.", author: "Renee P.", location: "Cedar Grove, OR", rating: 5 },
  ],
  credentials: { licenseNumber: "PC-LIC #29104", licensedAndInsured: true, yearsInBusiness: 12 },
  responseTimeMinutes: 90,
  googleRating: 4.9,
  googleReviewCount: 184,
};
