import "./style-recipes.css";
import type { ComponentType } from "react";
import type { BusinessData, SmartSiteRenderProps, StyleVariant } from "@/lib/smartsite/types";
import { BadgeIcon, CompassIcon, DocumentIcon, GridIcon, ShieldCheckIcon, UsersIcon } from "./icons";
import type { SiteHeaderContent } from "./sections/SiteHeader";
import { SiteHeader } from "./sections/SiteHeader";
import { Hero } from "./sections/Hero";
import type { HeroContent } from "./sections/Hero";
import { HeroOrganic } from "./sections/HeroOrganic";
import type { HeroOrganicContent } from "./sections/HeroOrganic";
import { HeroSplit } from "./sections/HeroSplit";
import type { HeroSplitContent } from "./sections/HeroSplit";
import { TrustStrip } from "./sections/TrustStrip";
import { Services } from "./sections/Services";
import { About } from "./sections/About";
import type { AboutContent } from "./sections/About";
import { AboutOrganic } from "./sections/AboutOrganic";
import type { AboutOrganicContent } from "./sections/AboutOrganic";
import { Testimonials } from "./sections/Testimonials";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

const header: SiteHeaderContent = {
  navLinks: [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ],
  callButtonLabelShort: "Call",
};

const serviceIcons = [BadgeIcon, ShieldCheckIcon, CompassIcon, GridIcon, UsersIcon, DocumentIcon];

function contentFor(business: BusinessData) {
  const trade = business.companyName.split(/\s+/)[1] || "service";
  const location = business.address.city || "your area";
  const base = {
    eyebrow: `${trade} service in ${location}`,
    subhead: `${business.companyName} helps local customers with dependable service, clear communication, and work done right the first time.`,
    primaryCtaLabel: `Call ${business.phone}`,
    secondaryCtaLabel: "Get a quote",
    secondaryCtaHref: "#contact",
  };
  const about: AboutContent = {
    eyebrow: () => `Why ${location} chooses ${business.companyName}`,
    heading: () => `${business.companyName} shows up when it matters.`,
    highlights: [
      { icon: ShieldCheckIcon, title: "Licensed and insured", subtitle: () => business.credentials.licenseNumber },
      { icon: BadgeIcon, title: "Clear, dependable service", subtitle: () => `${business.credentials.yearsInBusiness} years serving local customers.` },
    ],
  };
  const aboutOrganic: AboutOrganicContent = {
    eyebrow: about.eyebrow,
    heading: about.heading,
    highlights: about.highlights,
  };
  const contact = {
    eyebrow: "Start the conversation",
    heading: `Let's talk about your ${trade.toLowerCase()} project`,
    subhead: "Share a few details and the team will follow up personally.",
    smartReplyBadge: "SmartReply active - quick answers, day or night",
    formLabels: { name: "Name", phone: "Phone", message: "What do you need help with?", messagePlaceholder: "Tell us what is going on...", submit: "Request a Quote ->" },
  };
  return { base, about, aboutOrganic, contact };
}

function FastResponseRecipe({ business, tier }: SmartSiteRenderProps) {
  const { base, about, contact } = contentFor(business);
  const hero: HeroContent = {
    eyebrow: `Fast ${base.eyebrow}`,
    headlineLines: ["Need help now?", "We are ready", "to respond."],
    accentLineIndex: 2,
    subhead: () => `Get a licensed professional from ${business.companyName} on the phone quickly. ${business.serviceArea}.`,
    primaryCtaLabel: () => base.primaryCtaLabel,
    secondaryCtaLabel: "Get a fast quote",
    secondaryCtaHref: base.secondaryCtaHref,
  };
  return <div className="ss-recipe ss-recipe-fast"><SiteHeader business={business} content={header} /><Hero business={business} content={hero} /><TrustStrip business={business} content={{ stats: [{ label: "Response", value: (b) => `${b.responseTimeMinutes} min` }, { label: "Rating", value: (b) => `${b.googleRating.toFixed(1)} stars` }, { label: "Experience", value: (b) => `${b.credentials.yearsInBusiness} yrs` }, { label: "Licensed", value: (b) => b.credentials.licenseNumber }] }} /><Services business={business} content={{ eyebrow: "What we handle", heading: "Solutions without the runaround", icons: serviceIcons }} /><About business={business} content={about} /><Testimonials testimonials={business.testimonials} content={{ eyebrow: "What customers say", heading: "Reliable work, real relief" }} /><Contact business={business} content={contact} /><Footer business={business} tier={tier} /></div>;
}

function PremiumProfessionalRecipe({ business, tier }: SmartSiteRenderProps) {
  const { base, about, contact } = contentFor(business);
  const hero: HeroSplitContent = {
    eyebrow: `Professional ${base.eyebrow}`,
    headlineLines: ["Thoughtful work.", "Built around", "your needs."],
    accentLineIndex: 2,
    subhead: () => base.subhead,
    primaryCtaLabel: "Discuss your project",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: (b) => `Call ${b.phone}`,
    motif: "blueprint-lines",
  };
  return <div className="ss-recipe ss-recipe-premium"><SiteHeader business={business} content={header} variant="light" /><HeroSplit business={business} content={hero} /><About business={business} content={about} variant="light" /><Services business={business} content={{ eyebrow: "Our work", heading: "A higher standard of service", icons: serviceIcons }} /><Testimonials testimonials={business.testimonials} content={{ eyebrow: "Client experiences", heading: "What good work feels like" }} /><Contact business={business} content={contact} /><Footer business={business} tier={tier} /></div>;
}

function TrustedLocalRecipe({ business, tier }: SmartSiteRenderProps) {
  const { base, aboutOrganic, contact } = contentFor(business);
  const hero: HeroOrganicContent = {
    eyebrow: `Local ${base.eyebrow}`,
    headlineLines: ["A team you", "can count on", "near home."],
    accentLineIndex: 1,
    subhead: () => `${business.companyName} serves neighbors across ${business.serviceArea} with straightforward advice and familiar faces.`,
    primaryCtaLabel: () => base.primaryCtaLabel,
    secondaryCtaLabel: "Learn about us",
    secondaryCtaHref: "#about",
  };
  return <div className="ss-recipe ss-recipe-local"><SiteHeader business={business} content={header} variant="light" /><HeroOrganic business={business} content={hero} /><Testimonials testimonials={business.testimonials} content={{ eyebrow: "From the neighborhood", heading: "Neighbors recommend us" }} /><Services business={business} cardStyle="rounded" content={{ eyebrow: "How we help", heading: "Practical help for your home", icons: serviceIcons }} /><AboutOrganic business={business} content={aboutOrganic} /><Contact business={business} content={contact} /><Footer business={business} tier={tier} /></div>;
}

export const sharedStyleRecipes: Record<StyleVariant, ComponentType<SmartSiteRenderProps>> = {
  "fast-response": FastResponseRecipe,
  "premium-professional": PremiumProfessionalRecipe,
  "trusted-local": TrustedLocalRecipe,
};
