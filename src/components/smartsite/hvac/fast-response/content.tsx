// All copy, icon selection, and stat definitions for HVAC · Fast Response.
// This is the *only* file that should need to change to retune this style's
// voice — the components it feeds are 100% shared with every other trade/style.
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
  eyebrow: "Answering calls now — 24/7",
  headlineLines: ["Your comfort", "can't wait.", "Neither do we."],
  accentLineIndex: 2,
  subhead: (b) =>
    `${b.companyName} gets a licensed technician to your door fast — average response time under an hour, any hour. ${b.serviceArea}.`,
  primaryCtaLabel: (b) => `Call ${b.phone}`,
  secondaryCtaLabel: "Get a Fast Quote",
  secondaryCtaHref: "#contact",
};

export const trustStrip: TrustStripContent = {
  stats: [
    { label: "Avg. response", value: (b) => `${b.responseTimeMinutes} min` },
    { label: "Google rating", value: (b) => `${b.googleRating.toFixed(1)}★ (${b.googleReviewCount})` },
    { label: "In business", value: (b) => `${b.credentials.yearsInBusiness} yrs` },
    { label: "Licensed & insured", value: (b) => b.credentials.licenseNumber },
  ],
};

export const services: ServicesContent = {
  eyebrow: "What we handle",
  heading: "Every job, one call away",
  icons: hvacServiceIcons,
};

export const about: AboutContent = {
  eyebrow: (b) => `Why ${b.serviceArea.split(",")[0]} calls us first`,
  heading: (b) => `${b.credentials.yearsInBusiness} years of showing up.`,
  highlights: [
    { icon: ShieldCheckIcon, title: "Licensed & insured", subtitle: (b) => b.credentials.licenseNumber },
    { icon: ShieldCheckIcon, title: "No overtime charges", subtitle: () => "Nights and weekends, same rate." },
  ],
};

export const testimonials: TestimonialsContent = {
  eyebrow: "Neighbors, not strangers",
  heading: "What it's like to call us",
};

export const contact: ContactContent = {
  eyebrow: "Get a fast quote",
  heading: "Tell us what's wrong",
  subhead: "Send the details and we'll reply in minutes — not tomorrow.",
  smartReplyBadge: "SmartReply active — email answered instantly, 24/7",
  formLabels: {
    name: "Name",
    phone: "Phone",
    message: "What's going on?",
    messagePlaceholder: "No cold air since last night…",
    submit: "Request Fast Quote →",
  },
};

export const beforeAfter: BeforeAfterGalleryContent = {
  eyebrow: "Real results",
  heading: "From uncomfortable to under control",
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
  heading: "The paperwork that matters",
  badges: [
    { icon: BadgeIcon, label: "NATE Certified Technicians" },
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: CompassIcon, label: "30-Mile Service Radius" },
  ],
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  heading: "Before you call",
  items: [
    { question: "Do you charge more for nights or weekends?", answer: "No — our emergency rate is the same any time, any day." },
    { question: "How fast can someone actually get here?", answer: "Our average response time is under an hour across our full service area." },
    { question: "Do you offer financing?", answer: "Yes — 0% financing is available for qualified system replacements." },
  ],
};

export const financing: FinancingContent = {
  eyebrow: "Financing",
  heading: "0% financing on qualified installs",
  body: "Don't wait on comfort because of cost — flexible plans available.",
  ctaLabel: "Ask About Financing",
};

export const scheduling: SchedulingContent = {
  eyebrow: "Book online",
  heading: "Skip the phone tag",
  body: "Pick a time that works and it's on our calendar — no back-and-forth.",
  calendarSyncNote: "Syncs directly with our technicians' schedules via Google Calendar.",
  ctaLabel: "Schedule Service",
};

export const exploreMore: ExploreMoreContent = {
  eyebrow: "More from Ironclad",
  heading: "Explore the full site",
  items: [
    { icon: GridIcon, title: "Real Project Gallery", description: "Recent installs and repairs across the service area." },
    { icon: CompassIcon, title: "Service Area Guide", description: "Every neighborhood and town we cover, mapped out." },
    { icon: UsersIcon, title: "Meet the Team", description: "The licensed technicians behind every appointment." },
    { icon: DocumentIcon, title: "From the Blog", description: "Seasonal maintenance tips and system buying guides." },
  ],
};
