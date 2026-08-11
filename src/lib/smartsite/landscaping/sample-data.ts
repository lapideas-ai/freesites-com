import type { BusinessData } from "../types";

// Sample data for the Landscaping canonical SmartSite prototype. Fictional
// business — .example email domain and a non-dialable phone number are
// used deliberately (IANA/NANP reserved placeholder conventions) since
// this is template content, not a real customer's site.
export const willowbrookSample: BusinessData = {
  companyName: "Willowbrook Outdoor Living",
  logoUrl: null,
  tagline: "Your neighborhood's trusted lawn and garden care.",
  description:
    "Willowbrook Outdoor Living has cared for Willow Creek-area yards for 15 years. We're the crew your neighbors already recommend — reliable weekly service, honest advice, and design work that makes a yard feel like home.",
  phone: "(555) 062-7734",
  email: "hello@willowbrookoutdoor.example",
  address: { street: "204 Orchard Bend", city: "Willow Creek", state: "TX", zip: "78737" },
  serviceArea: "Willow Creek and the greater Austin hill country",
  services: [
    { name: "Lawn Maintenance", description: "Reliable weekly mowing, edging, and cleanup, rain or shine." },
    { name: "Landscape Design", description: "Thoughtful plans that fit how your family actually uses the yard." },
    { name: "Irrigation Systems", description: "Installed and tuned so nothing gets over- or under-watered." },
    { name: "Seasonal Cleanup", description: "Spring and fall cleanups that keep beds healthy year-round." },
    { name: "Tree & Shrub Care", description: "Pruning, feeding, and health checks from a certified arborist." },
    { name: "Hardscaping", description: "Patios, walkways, and low walls built to last." },
  ],
  testimonials: [
    { quote: "Same crew every week for three years now. They treat our yard like their own.", author: "Family Torres", location: "Willow Creek, TX", rating: 5 },
    { quote: "The redesign turned an awkward backyard into the place we actually spend time.", author: "Ben H.", location: "Dripping Springs, TX", rating: 5 },
    { quote: "Honest about what our yard actually needed instead of upselling us.", author: "Carla N.", location: "Willow Creek, TX", rating: 5 },
  ],
  credentials: { licenseNumber: "LC-LIC #17742", licensedAndInsured: true, yearsInBusiness: 15 },
  responseTimeMinutes: 120,
  googleRating: 4.8,
  googleReviewCount: 261,
};
