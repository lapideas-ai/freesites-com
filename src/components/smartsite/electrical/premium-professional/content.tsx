// All copy, icon selection, and stat definitions for Electrical · Premium
// Professional. Same shared components as the other two Electrical styles —
// the refined, consultative feel comes entirely from copy, tokens, and type.
import { BadgeIcon, CompassIcon, DocumentIcon, GridIcon, ShieldCheckIcon, UsersIcon } from "@/components/smartsite/shared/icons";
import { electricalServiceIcons } from "../icons";
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
  eyebrow: "Precision electrical engineering · Est. 2013",
  headlineLines: ["Exceptional electrical,", "engineered with", "precision."],
  accentLineIndex: 2,
  subhead: () =>
    "Master-certified electricians, premium materials, and a standard of care most electrical companies don't offer. Your home's power, handled properly.",
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
  heading: "Electrical work, engineered precisely",
  icons: electricalServiceIcons,
};

export const about: AboutContent = {
  eyebrow: () => "The Voltright difference",
  heading: () => "Precision in every connection.",
  highlights: [
    { icon: BadgeIcon, title: "Master Electrician Certified", subtitle: () => "Held to a higher technical standard." },
    { icon: ShieldCheckIcon, title: "White-glove service standard", subtitle: () => "Shoe covers, drop cloths, respect for your home." },
  ],
};

export const testimonials: TestimonialsContent = {
  eyebrow: "Client experiences",
  heading: "What discerning homeowners say",
};

export const contact: ContactContent = {
  eyebrow: "Begin the conversation",
  heading: "Let's discuss your electrical",
  subhead: "Share a few details and a specialist will follow up personally.",
  smartReplyBadge: "SmartReply active — an immediate, thoughtful reply, day or night",
  formLabels: {
    name: "Name",
    phone: "Phone",
    message: "Tell us about your home",
    messagePlaceholder: "We're renovating and want to discuss a full panel upgrade…",
    submit: "Request a Consultation →",
  },
};

export const beforeAfter: BeforeAfterGalleryContent = {
  eyebrow: "Realized projects",
  heading: "The difference precision makes",
  items: [
    {
      title: "Panel replacement, Ashford",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Outdated fuse box, frequent tripped circuits",
      afterDescription: "Modern 200-amp panel, zero nuisance trips",
    },
    {
      title: "Full rewire, Crestwood Heights",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Knob-and-tube wiring, insurance flagged",
      afterDescription: "Fully rewired and code-compliant, passed inspection",
    },
  ],
};

export const trustBadges: TrustBadgesContent = {
  eyebrow: "Credentials",
  heading: "A higher standard, on paper too",
  badges: [
    { icon: BadgeIcon, label: "Master Electrician Certified" },
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: CompassIcon, label: "20-Mile Service Radius" },
  ],
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  heading: "What clients ask before booking",
  items: [
    { question: "What makes this different from a standard electrical company?", answer: "Master-certified electricians, premium materials, and a white-glove service standard on every visit." },
    { question: "How soon can a specialist visit?", answer: "Most consultations are scheduled within an hour of your request." },
    { question: "Do you offer financing?", answer: "Yes — tailored financing solutions are available for qualified installations." },
  ],
};

export const financing: FinancingContent = {
  eyebrow: "Financing",
  heading: "Tailored financing solutions",
  body: "Premium electrical work, structured to fit your plans.",
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
  eyebrow: "More from Voltright",
  heading: "Explore the full site",
  items: [
    { icon: GridIcon, title: "Realized Projects", description: "A closer look at recent installations across the service area." },
    { icon: CompassIcon, title: "Service Area Guide", description: "Every neighborhood and town we cover, mapped out." },
    { icon: UsersIcon, title: "Meet the Team", description: "The master-certified specialists behind every appointment." },
    { icon: DocumentIcon, title: "From the Journal", description: "Notes on lighting design and panel capacity planning." },
  ],
};
