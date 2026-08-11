// All copy, icon selection, and stat definitions for Painting · Premium
// Professional. The bright, upscale feel comes from HeroSplit's light
// split-panel structure, the omission of TrustStrip (a stat-bar reads
// corporate/technical — wrong register for "refined and upscale"), and a
// consultation-first CTA rather than an urgent phone-call one.
import { ShieldCheckIcon, BadgeIcon, CompassIcon, GridIcon, UsersIcon, DocumentIcon } from "@/components/smartsite/shared/icons";
import { paintingServiceIcons } from "../icons";
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
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ],
  callButtonLabelShort: "Call",
};

export const hero: HeroSplitContent = {
  eyebrow: "Residential painting · Est. 2013",
  headlineLines: ["Beautifully finished,", "inside and out."],
  accentLineIndex: 1,
  subhead: () =>
    "Meticulous prep, clean lines, and a finish that still looks flawless years later. A calmer way to repaint your home.",
  primaryCtaLabel: "Schedule a Consultation",
  primaryCtaHref: "#contact",
  secondaryCtaLabel: (b) => `Call ${b.phone}`,
  motif: "swatch-grid",
};

export const services: ServicesContent = {
  eyebrow: "What we do",
  heading: "Painting, done properly",
  icons: paintingServiceIcons,
};

export const about: AboutContent = {
  eyebrow: () => "The Lucent difference",
  heading: () => "Craftsmanship you can see up close.",
  highlights: [
    { icon: BadgeIcon, title: "Design-trained color consultants", subtitle: () => "Not just painters — palette guidance included." },
    { icon: ShieldCheckIcon, title: "Meticulous prep, every time", subtitle: () => "Drop cloths, taping, and sanding done right, not rushed." },
  ],
};

export const testimonials: TestimonialsContent = {
  eyebrow: "Recent projects",
  heading: "What homeowners notice first",
};

export const contact: ContactContent = {
  eyebrow: "Start your project",
  heading: "Let's talk about your space",
  subhead: "Share a few details and a specialist will follow up personally.",
  smartReplyBadge: "SmartReply active — an immediate, thoughtful reply, day or night",
  formLabels: {
    name: "Name",
    phone: "Phone",
    message: "Tell us about your project",
    messagePlaceholder: "We're repainting the main living areas and want a color consultation…",
    submit: "Request a Consultation →",
  },
};

export const beforeAfter: BeforeAfterGalleryContent = {
  eyebrow: "Realized projects",
  heading: "The difference a proper finish makes",
  items: [
    {
      title: "Whole-home interior refresh, Cedar Grove",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Dated builder-grade white, uneven trim lines",
      afterDescription: "Warm custom palette, crisp professional trim work",
    },
    {
      title: "Exterior repaint, Lake Oswego",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Faded, peeling siding, chalky trim",
      afterDescription: "Weather-ready coating, restored curb appeal",
    },
  ],
};

export const trustBadges: TrustBadgesContent = {
  eyebrow: "Credentials",
  heading: "Backed by real standards",
  badges: [
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: BadgeIcon, label: "12 Years in Business" },
    { icon: CompassIcon, label: "Portland Metro Coverage" },
  ],
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  heading: "What clients ask before booking",
  items: [
    { question: "How long does a typical interior project take?", answer: "Most single-room projects finish in 1–2 days; whole-home interiors typically take 3–5." },
    { question: "Do you help choose colors?", answer: "Yes — every project includes a color consultation with a design-trained specialist." },
    { question: "What paint brands do you use?", answer: "Premium, low-VOC coatings selected for durability and finish quality, discussed upfront." },
  ],
};

export const financing: FinancingContent = {
  eyebrow: "Financing",
  heading: "Flexible payment options",
  body: "A beautiful finish, structured to fit your budget.",
  ctaLabel: "Discuss Financing",
};

export const scheduling: SchedulingContent = {
  eyebrow: "Book online",
  heading: "Reserve your consultation",
  body: "Choose a time that suits you — confirmed instantly, no phone tag.",
  calendarSyncNote: "Synced directly with our specialists' calendars via Google Calendar.",
  ctaLabel: "Reserve a Time",
};

export const exploreMore: ExploreMoreContent = {
  eyebrow: "More from Lucent",
  heading: "Explore the full site",
  items: [
    { icon: GridIcon, title: "Recent Projects", description: "A closer look at recent interiors and exteriors we've finished." },
    { icon: CompassIcon, title: "Service Area Guide", description: "Every neighborhood and town we cover, mapped out." },
    { icon: UsersIcon, title: "Meet the Team", description: "The specialists behind every consultation and finish." },
    { icon: DocumentIcon, title: "Color Journal", description: "Notes on palettes, finishes, and seasonal color trends." },
  ],
};
