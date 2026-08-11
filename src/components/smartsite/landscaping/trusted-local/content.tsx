// All copy, icon selection, and stat definitions for Landscaping · Trusted
// Local. The neighborly, established feel comes from HeroOrganic's warm
// single-column structure, AboutOrganic's rounded card treatment, and
// surfacing Testimonials before Services — "neighbors trust us" leads,
// "here's our service menu" follows.
import { ShieldCheckIcon, BadgeIcon, CompassIcon, GridIcon, UsersIcon, DocumentIcon } from "@/components/smartsite/shared/icons";
import { landscapingServiceIcons } from "../icons";
import type { SiteHeaderContent } from "@/components/smartsite/shared/sections/SiteHeader";
import type { HeroOrganicContent } from "@/components/smartsite/shared/sections/HeroOrganic";
import type { ServicesContent } from "@/components/smartsite/shared/sections/Services";
import type { AboutOrganicContent } from "@/components/smartsite/shared/sections/AboutOrganic";
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
    { href: "#reviews", label: "Reviews" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  callButtonLabelShort: "Call",
};

export const hero: HeroOrganicContent = {
  eyebrow: "Locally owned · Est. 2009",
  headlineLines: ["Your neighborhood's", "trusted yard care."],
  accentLineIndex: 1,
  subhead: () =>
    "The crew your neighbors already recommend — reliable weekly service, honest advice, and design work that makes a yard feel like home.",
  primaryCtaLabel: (b) => `Call ${b.phone}`,
  secondaryCtaLabel: "Get a Free Quote",
  secondaryCtaHref: "#contact",
};

export const testimonials: TestimonialsContent = {
  eyebrow: "From the neighborhood",
  heading: "What your neighbors are already saying",
};

export const services: ServicesContent = {
  eyebrow: "What we do",
  heading: "Yard care, done reliably",
  icons: landscapingServiceIcons,
};

export const about: AboutOrganicContent = {
  eyebrow: () => "The Willowbrook difference",
  heading: () => "Established, local, and easy to trust.",
  highlights: [
    { icon: BadgeIcon, title: "Same crew, every visit", subtitle: () => "No rotating strangers — familiar faces who know your yard." },
    { icon: ShieldCheckIcon, title: "Honest, no upselling", subtitle: () => "We tell you what your yard actually needs." },
  ],
};

export const contact: ContactContent = {
  eyebrow: "Get started",
  heading: "Let's talk about your yard",
  subhead: "Share a few details and a specialist will follow up personally.",
  smartReplyBadge: "SmartReply active — an immediate, thoughtful reply, day or night",
  formLabels: {
    name: "Name",
    phone: "Phone",
    message: "Tell us about your yard",
    messagePlaceholder: "We'd like a quote for weekly maintenance and a spring cleanup…",
    submit: "Request a Free Quote →",
  },
};

export const beforeAfter: BeforeAfterGalleryContent = {
  eyebrow: "Recent transformations",
  heading: "The difference regular care makes",
  items: [
    {
      title: "Backyard redesign, Willow Creek",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Patchy grass, overgrown beds, no clear layout",
      afterDescription: "Defined patio, native beds, a yard the family actually uses",
    },
    {
      title: "Front yard curb appeal refresh, Dripping Springs",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Overgrown shrubs, bare patches, uneven edges",
      afterDescription: "Clean lines, healthy lawn, welcoming entry",
    },
  ],
};

export const trustBadges: TrustBadgesContent = {
  eyebrow: "Credentials",
  heading: "Backed by real standards",
  badges: [
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: BadgeIcon, label: "15 Years in Business" },
    { icon: CompassIcon, label: "Austin Hill Country Coverage" },
  ],
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  heading: "What neighbors ask before booking",
  items: [
    { question: "Do I get the same crew every visit?", answer: "Yes — the same familiar crew handles your property every time, not a rotating roster." },
    { question: "Can you design a whole new layout?", answer: "Yes — landscape design is one of our core services, from a single bed to a full redesign." },
    { question: "Do you offer one-time cleanups?", answer: "Yes — spring and fall cleanups are available with or without a standing maintenance plan." },
  ],
};

export const financing: FinancingContent = {
  eyebrow: "Financing",
  heading: "Flexible payment options",
  body: "A yard you love, structured to fit your budget.",
  ctaLabel: "Discuss Financing",
};

export const scheduling: SchedulingContent = {
  eyebrow: "Book online",
  heading: "Reserve your first visit",
  body: "Choose a time that suits you — confirmed instantly, no phone tag.",
  calendarSyncNote: "Synced directly with our crew leads' calendars via Google Calendar.",
  ctaLabel: "Reserve a Time",
};

export const exploreMore: ExploreMoreContent = {
  eyebrow: "More from Willowbrook",
  heading: "Explore the full site",
  items: [
    { icon: GridIcon, title: "Recent Transformations", description: "A closer look at recent yards we've redesigned and maintained." },
    { icon: CompassIcon, title: "Service Area Guide", description: "Every neighborhood and town we cover, mapped out." },
    { icon: UsersIcon, title: "Meet the Crew", description: "The familiar faces who show up for your yard every week." },
    { icon: DocumentIcon, title: "Seasonal Guide", description: "Notes on what your yard needs, month by month." },
  ],
};
