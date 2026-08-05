// All copy, icon selection, and stat definitions for HVAC · Premium
// Professional. Same shared components as the other two HVAC styles — the
// refined, consultative feel comes entirely from copy, tokens, and type.
import { BadgeIcon, CompassIcon, DocumentIcon, GridIcon, ShieldCheckIcon, UsersIcon } from "@/components/smartsite/shared/icons";
import { hvacServiceIcons } from "../icons";
import type { SiteHeaderContent } from "@/components/smartsite/shared/sections/SiteHeader";
import type { HeroContent } from "@/components/smartsite/shared/sections/Hero";
import type { TrustStripContent } from "@/components/smartsite/shared/sections/TrustStrip";
import type { ServicesContent } from "@/components/smartsite/shared/sections/Services";
import type { AboutContent } from "@/components/smartsite/shared/sections/About";
import type { TestimonialsContent } from "@/components/smartsite/shared/sections/Testimonials";
import type { ContactContent } from "@/components/smartsite/shared/sections/Contact";
import type { BeforeAfterGalleryContent } from "@/components/smartsite/shared/sections/BeforeAfterGallery";
import type { TrustBadgesContent } from "@/components/smartsite/shared/sections/TrustBadges";
import type { FaqContent } from "@/components/smartsite/shared/sections/Faq";
import type { FinancingContent } from "@/components/smartsite/shared/sections/Financing";
import type { SchedulingContent } from "@/components/smartsite/shared/sections/Scheduling";
import type { ExploreMoreContent } from "@/components/smartsite/shared/sections/ExploreMore";

export const header: SiteHeaderContent = {
  navLinks: [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ],
  callButtonLabelShort: "Call",
};

export const hero: HeroContent = {
  eyebrow: "Precision comfort engineering · Est. 2007",
  headlineLines: ["Exceptional comfort,", "engineered with", "precision."],
  accentLineIndex: 2,
  subhead: () =>
    "Master-certified technicians, premium equipment, and a standard of care most HVAC companies don't offer. Your comfort, handled properly.",
  primaryCtaLabel: (b) => `Call ${b.phone}`,
  secondaryCtaLabel: "Schedule a Consultation",
  secondaryCtaHref: "#contact",
};

export const trustStrip: TrustStripContent = {
  stats: [
    { label: "In business", value: (b) => `${b.credentials.yearsInBusiness} yrs` },
    { label: "Client rating", value: (b) => `${b.googleRating.toFixed(1)}★ (${b.googleReviewCount})` },
    { label: "Response window", value: (b) => `${b.responseTimeMinutes} min` },
    { label: "Fully licensed", value: (b) => b.credentials.licenseNumber },
  ],
};

export const services: ServicesContent = {
  eyebrow: "Our craft",
  heading: "Comfort, engineered precisely",
  icons: hvacServiceIcons,
};

export const about: AboutContent = {
  eyebrow: () => "The Ironclad difference",
  heading: () => "Precision in every detail.",
  highlights: [
    { icon: BadgeIcon, title: "NATE Master Certified", subtitle: () => "Held to a higher technical standard." },
    { icon: ShieldCheckIcon, title: "White-glove service standard", subtitle: () => "Shoe covers, drop cloths, respect for your home." },
  ],
};

export const testimonials: TestimonialsContent = {
  eyebrow: "Client experiences",
  heading: "What discerning homeowners say",
};

export const contact: ContactContent = {
  eyebrow: "Begin the conversation",
  heading: "Let's discuss your comfort",
  subhead: "Share a few details and a specialist will follow up personally.",
  smartReplyBadge: "SmartReply active — an immediate, thoughtful reply, day or night",
  formLabels: {
    name: "Name",
    phone: "Phone",
    message: "Tell us about your home",
    messagePlaceholder: "We're renovating and want to discuss a full system upgrade…",
    submit: "Request a Consultation →",
  },
};

export const beforeAfter: BeforeAfterGalleryContent = {
  eyebrow: "Realized projects",
  heading: "The difference precision makes",
  items: [
    {
      title: "Whole-home cooling, Fairview Heights",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Uneven temps, 15-year-old system, rising bills",
      afterDescription: "Consistent comfort, 30% lower cooling costs",
    },
    {
      title: "Emergency furnace replacement, Brookline",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "No heat, cracked heat exchanger",
      afterDescription: "New high-efficiency furnace, installed same week",
    },
  ],
};

export const trustBadges: TrustBadgesContent = {
  eyebrow: "Credentials",
  heading: "A higher standard, on paper too",
  badges: [
    { icon: BadgeIcon, label: "NATE Master Certified" },
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: CompassIcon, label: "30-Mile Service Radius" },
  ],
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  heading: "What clients ask before booking",
  items: [
    { question: "What makes this different from a standard HVAC company?", answer: "Master-certified technicians, premium equipment, and a white-glove service standard on every visit." },
    { question: "How soon can a specialist visit?", answer: "Most consultations are scheduled within an hour of your request." },
    { question: "Do you offer financing?", answer: "Yes — tailored financing solutions are available for qualified installations." },
  ],
};

export const financing: FinancingContent = {
  eyebrow: "Financing",
  heading: "Tailored financing solutions",
  body: "Premium comfort, structured to fit your plans.",
  ctaLabel: "Discuss Financing",
};

export const scheduling: SchedulingContent = {
  eyebrow: "Book online",
  heading: "Reserve your appointment",
  body: "Choose a time that suits you — confirmed instantly, no phone tag.",
  calendarSyncNote: "Synced directly with our specialists' calendars via Google Calendar.",
  ctaLabel: "Reserve a Time",
};

export const exploreMore: ExploreMoreContent = {
  eyebrow: "More from Ironclad",
  heading: "Explore the full site",
  items: [
    { icon: GridIcon, title: "Realized Projects", description: "A closer look at recent installations across the service area." },
    { icon: CompassIcon, title: "Service Area Guide", description: "Every neighborhood and town we cover, mapped out." },
    { icon: UsersIcon, title: "Meet the Team", description: "The master-certified specialists behind every appointment." },
    { icon: DocumentIcon, title: "From the Journal", description: "Notes on system design, efficiency, and seasonal care." },
  ],
};
