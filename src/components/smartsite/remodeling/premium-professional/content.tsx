// All copy, icon selection, and stat definitions for Remodeling · Premium
// Professional. High-ticket, portfolio-driven feel: BeforeAfterGallery is
// surfaced right after About in the composition root (not gated behind the
// Growth tier like every other trade) — a renovation company's realized
// work is the argument, not a bonus feature buried at the bottom.
import { ShieldCheckIcon, BadgeIcon, CompassIcon, GridIcon, UsersIcon, DocumentIcon } from "@/components/smartsite/shared/icons";
import { remodelingServiceIcons } from "../icons";
import type { SiteHeaderContent } from "@/components/smartsite/shared/sections/SiteHeader";
import type { HeroSplitContent } from "@/components/smartsite/shared/sections/HeroSplit";
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
    { href: "#work", label: "Our Work" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  callButtonLabelShort: "Call",
};

export const hero: HeroSplitContent = {
  eyebrow: "Design-led renovations · Est. 2004",
  headlineLines: ["Thoughtful renovations,", "built to last generations."],
  accentLineIndex: 1,
  subhead: () =>
    "One dedicated team, design-led from the first sketch through the final walkthrough. No subcontractor guesswork on a project this significant.",
  primaryCtaLabel: "Schedule a Consultation",
  primaryCtaHref: "#contact",
  secondaryCtaLabel: (b) => `Call ${b.phone}`,
  motif: "blueprint-lines",
};

export const about: AboutContent = {
  eyebrow: () => "The Ashford & Hale difference",
  heading: () => "One team, from sketch to walkthrough.",
  highlights: [
    { icon: BadgeIcon, title: "In-house design team", subtitle: () => "Concept through material selection, under one roof." },
    { icon: ShieldCheckIcon, title: "One dedicated project lead", subtitle: () => "A single point of contact for the entire renovation." },
  ],
};

export const beforeAfter: BeforeAfterGalleryContent = {
  eyebrow: "Realized projects",
  heading: "The work speaks for itself",
  items: [
    {
      title: "Full kitchen renovation, Ashford Hills",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Closed-off galley kitchen, dated cabinetry",
      afterDescription: "Open-concept layout, custom millwork, waterfall island",
    },
    {
      title: "Primary bath renovation, Weston",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Cramped 1990s layout, worn fixtures",
      afterDescription: "Spa-level primary suite, radiant floor heating",
    },
  ],
};

export const services: ServicesContent = {
  eyebrow: "What we do",
  heading: "Renovations, managed properly",
  icons: remodelingServiceIcons,
};

export const testimonials: TestimonialsContent = {
  eyebrow: "Client experiences",
  heading: "What discerning homeowners say",
};

export const contact: ContactContent = {
  eyebrow: "Begin the conversation",
  heading: "Let's discuss your renovation",
  subhead: "Share a few details and a specialist will follow up personally.",
  smartReplyBadge: "SmartReply active — an immediate, thoughtful reply, day or night",
  formLabels: {
    name: "Name",
    phone: "Phone",
    message: "Tell us about your project",
    messagePlaceholder: "We're considering a full kitchen and adjoining living space renovation…",
    submit: "Request a Consultation →",
  },
};

export const trustBadges: TrustBadgesContent = {
  eyebrow: "Credentials",
  heading: "A higher standard, on paper too",
  badges: [
    { icon: BadgeIcon, label: "Licensed General Contractor" },
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: CompassIcon, label: "20 Years in Business" },
  ],
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  heading: "What clients ask before starting",
  items: [
    { question: "Do you handle design as well as construction?", answer: "Yes — our in-house design team leads every project from concept through material selection." },
    { question: "How long does a full kitchen renovation take?", answer: "Most kitchen renovations run 8–12 weeks depending on scope, discussed in detail during consultation." },
    { question: "Do you offer financing?", answer: "Yes — tailored financing solutions are available for qualified renovations." },
  ],
};

export const financing: FinancingContent = {
  eyebrow: "Financing",
  heading: "Tailored financing solutions",
  body: "A renovation done properly, structured to fit your plans.",
  ctaLabel: "Discuss Financing",
};

export const scheduling: SchedulingContent = {
  eyebrow: "Book online",
  heading: "Reserve your consultation",
  body: "Choose a time that suits you — confirmed instantly, no phone tag.",
  calendarSyncNote: "Synced directly with our design team's calendar via Google Calendar.",
  ctaLabel: "Reserve a Time",
};

export const exploreMore: ExploreMoreContent = {
  eyebrow: "More from Ashford & Hale",
  heading: "Explore the full site",
  items: [
    { icon: GridIcon, title: "Realized Projects", description: "A closer look at recent kitchens, baths, and whole-home renovations." },
    { icon: CompassIcon, title: "Service Area Guide", description: "Every neighborhood and town we cover, mapped out." },
    { icon: UsersIcon, title: "Meet the Team", description: "The designers and project leads behind every renovation." },
    { icon: DocumentIcon, title: "From the Journal", description: "Notes on design, materials, and project planning." },
  ],
};
