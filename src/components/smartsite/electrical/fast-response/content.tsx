// All copy, icon selection, and stat definitions for Electrical · Fast
// Response. This is the *only* file that should need to change to retune
// this style's voice — the components it feeds are 100% shared with every
// other trade/style. Electrical copy leans safety-first in addition to
// speed — a sparking panel is a hazard, not just an inconvenience.
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
  eyebrow: "Answering calls now — 24/7",
  headlineLines: ["Electrical hazards", "can't wait.", "Neither do we."],
  accentLineIndex: 2,
  subhead: (b) =>
    `${b.companyName} gets a licensed electrician to your door fast and safely — average response time under an hour, any hour. ${b.serviceArea}.`,
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
  icons: electricalServiceIcons,
};

export const about: AboutContent = {
  eyebrow: (b) => `Why ${b.serviceArea.split(",")[0]} calls us first`,
  heading: (b) => `${b.credentials.yearsInBusiness} years of doing it safely.`,
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
    messagePlaceholder: "Outlet sparked when I plugged something in…",
    submit: "Request Fast Quote →",
  },
};

export const beforeAfter: BeforeAfterGalleryContent = {
  eyebrow: "Real results",
  heading: "From hazard to handled",
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
  heading: "The paperwork that matters",
  badges: [
    { icon: BadgeIcon, label: "Licensed Master Electrician" },
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: CompassIcon, label: "20-Mile Service Radius" },
  ],
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  heading: "Before you call",
  items: [
    { question: "Do you charge more for nights or weekends?", answer: "No — our emergency rate is the same any time, any day." },
    { question: "What should I do if I smell burning or see sparking?", answer: "Turn off power at the breaker if it's safe to reach, then call us immediately — don't wait." },
    { question: "Do you offer financing?", answer: "Yes — 0% financing is available for qualified panel upgrades." },
  ],
};

export const financing: FinancingContent = {
  eyebrow: "Financing",
  heading: "0% financing on qualified installs",
  body: "Don't wait on a fix because of cost — flexible plans available.",
  ctaLabel: "Ask About Financing",
};

export const scheduling: SchedulingContent = {
  eyebrow: "Book online",
  heading: "Skip the phone tag",
  body: "Pick a time that works and it's on our calendar — no back-and-forth.",
  calendarSyncNote: "Syncs directly with our electricians' schedules via Google Calendar.",
  ctaLabel: "Schedule Service",
};

export const exploreMore: ExploreMoreContent = {
  eyebrow: "More from Voltright",
  heading: "Explore the full site",
  items: [
    { icon: GridIcon, title: "Real Project Gallery", description: "Recent installs and repairs across the service area." },
    { icon: CompassIcon, title: "Service Area Guide", description: "Every neighborhood and town we cover, mapped out." },
    { icon: UsersIcon, title: "Meet the Team", description: "The licensed electricians behind every appointment." },
    { icon: DocumentIcon, title: "From the Blog", description: "Electrical safety tips and upgrade guides." },
  ],
};
