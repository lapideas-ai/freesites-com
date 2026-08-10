// All copy, icon selection, and stat definitions for Plumbing · Trusted
// Local. Same shared components as Fast Response — the warmer,
// community-rooted feel comes entirely from copy, tokens, and type.
import { BadgeIcon, CompassIcon, DocumentIcon, GridIcon, ShieldCheckIcon, UsersIcon } from "@/components/smartsite/shared/icons";
import { plumbingServiceIcons } from "../icons";
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
  eyebrow: "Family-owned, serving the community since 2010",
  headlineLines: ["The name your", "neighbors already", "trust."],
  accentLineIndex: 2,
  subhead: (b) =>
    `${b.credentials.yearsInBusiness} years of keeping ${b.serviceArea.split(",")[0]} flowing smoothly — no call center, no big-city runaround, just the people down the street.`,
  primaryCtaLabel: (b) => `Call ${b.phone}`,
  secondaryCtaLabel: "See Why Neighbors Trust Us",
  secondaryCtaHref: "#reviews",
};

export const trustStrip: TrustStripContent = {
  stats: [
    { label: "In business", value: (b) => `${b.credentials.yearsInBusiness} yrs` },
    { label: "Google rating", value: (b) => `${b.googleRating.toFixed(1)}★ (${b.googleReviewCount})` },
    { label: "Avg. response", value: (b) => `${b.responseTimeMinutes} min` },
    { label: "Licensed & insured", value: (b) => b.credentials.licenseNumber },
  ],
};

export const services: ServicesContent = {
  eyebrow: "How we help",
  heading: "Plumbing solutions for every home",
  icons: plumbingServiceIcons,
};

export const about: AboutContent = {
  eyebrow: (b) => `Why ${b.serviceArea.split(",")[0]} trusts ${b.companyName}`,
  heading: () => "Fifteen years, one neighborhood.",
  highlights: [
    { icon: ShieldCheckIcon, title: "Licensed & insured", subtitle: (b) => b.credentials.licenseNumber },
    { icon: UsersIcon, title: "Family-owned & operated", subtitle: () => "Same family, same neighborhood, since day one." },
  ],
};

export const testimonials: TestimonialsContent = {
  eyebrow: "In their own words",
  heading: "What our neighbors say",
};

export const contact: ContactContent = {
  eyebrow: "Reach out anytime",
  heading: "We're just down the street",
  subhead: "Tell us what you need — a real person replies personally, usually in minutes.",
  smartReplyBadge: "SmartReply active — a real reply lands in your inbox instantly",
  formLabels: {
    name: "Name",
    phone: "Phone",
    message: "How can we help?",
    messagePlaceholder: "Our water heater is making a strange noise…",
    submit: "Send It Over →",
  },
};

export const beforeAfter: BeforeAfterGalleryContent = {
  eyebrow: "Real neighbors, real results",
  heading: "See what a proper repair actually does",
  items: [
    {
      title: "Emergency repipe, Millbrook",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Corroded galvanized pipes, frequent leaks",
      afterDescription: "Full repipe, zero leaks, done in three days",
    },
    {
      title: "Water heater replacement, Ridgeline",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "15-year-old tank, no hot water",
      afterDescription: "New high-efficiency unit, installed same day",
    },
  ],
};

export const trustBadges: TrustBadgesContent = {
  eyebrow: "Credentials",
  heading: "The paperwork that matters",
  badges: [
    { icon: BadgeIcon, label: "Backflow Certified" },
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: CompassIcon, label: "25-Mile Service Radius" },
  ],
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  heading: "Things folks usually ask",
  items: [
    { question: "Are you actually local, or a franchise?", answer: "Family-owned and locally based since 2010 — no call center, no franchise fees passed on to you." },
    { question: "How fast can someone actually get here?", answer: "Our average response time is under an hour across our full service area." },
    { question: "Do you offer financing?", answer: "Yes — 0% financing is available for qualified water heater replacements." },
  ],
};

export const financing: FinancingContent = {
  eyebrow: "Financing",
  heading: "0% financing on qualified installs",
  body: "Fix it now, pay over time — flexible plans available.",
  ctaLabel: "Ask About Financing",
};

export const scheduling: SchedulingContent = {
  eyebrow: "Book online",
  heading: "Skip the phone tag",
  body: "Pick a time that works and it's on our calendar — no back-and-forth.",
  calendarSyncNote: "Syncs directly with our plumbers' schedules via Google Calendar.",
  ctaLabel: "Schedule Service",
};

export const exploreMore: ExploreMoreContent = {
  eyebrow: "More from Bluewater",
  heading: "Explore the full site",
  items: [
    { icon: GridIcon, title: "Real Project Gallery", description: "Recent repairs and installs across the service area." },
    { icon: CompassIcon, title: "Service Area Guide", description: "Every neighborhood and town we cover, mapped out." },
    { icon: UsersIcon, title: "Meet the Team", description: "The licensed plumbers behind every appointment." },
    { icon: DocumentIcon, title: "From the Blog", description: "Plumbing maintenance tips and buying guides." },
  ],
};
