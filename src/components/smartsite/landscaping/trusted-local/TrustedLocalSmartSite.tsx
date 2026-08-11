import "./trusted-local.css";
import { displayFont, bodyFont, monoFont } from "./fonts";
import * as content from "./content";
import type { SmartSiteRenderProps } from "@/lib/smartsite/types";
import { SiteHeader } from "@/components/smartsite/shared/sections/SiteHeader";
import { HeroOrganic } from "@/components/smartsite/shared/sections/HeroOrganic";
import { Services } from "@/components/smartsite/shared/sections/Services";
import { AboutOrganic } from "@/components/smartsite/shared/sections/AboutOrganic";
import { Testimonials } from "@/components/smartsite/shared/sections/Testimonials";
import { Contact } from "@/components/smartsite/shared/sections/Contact";
import { Footer } from "@/components/smartsite/shared/sections/Footer";
import { BeforeAfterGallery } from "@/components/smartsite/shared/sections/BeforeAfterGallery";
import { TrustBadges } from "@/components/smartsite/shared/sections/TrustBadges";
import { Faq } from "@/components/smartsite/shared/sections/Faq";
import { Financing } from "@/components/smartsite/shared/sections/Financing";
import { Scheduling } from "@/components/smartsite/shared/sections/Scheduling";
import { ExploreMore } from "@/components/smartsite/shared/sections/ExploreMore";
import { CommunicationLadder } from "@/components/smartsite/shared/CommunicationLadder";
import { SectionBoundaryMarker } from "@/components/smartsite/shared/SectionBoundaryMarker";

// Composition root for Landscaping · Trusted Local. Deliberately reordered
// from HVAC/Plumbing Trusted Local's lineup: Testimonials come right after
// the hero, before Services — "neighbors already trust us" leads the
// story, "here's our service menu" follows, matching a community-oriented
// register rather than a service-catalog one. HeroOrganic + AboutOrganic
// keep the whole page light and warm, zero dark sections.
export function TrustedLocalSmartSite({ business, tier, ownerPreview = false }: SmartSiteRenderProps) {
  const showPro = tier === "pro" || tier === "growth";
  const showGrowth = tier === "growth";
  const showStarterBoundary = ownerPreview && showPro;
  const showProBoundary = ownerPreview && showGrowth;

  return (
    <div className={`lstl-smartsite ${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <SiteHeader business={business} content={content.header} variant="light" />
      <HeroOrganic business={business} content={content.hero} />
      <Testimonials testimonials={business.testimonials} content={content.testimonials} />
      <Services business={business} content={content.services} cardStyle="rounded" />
      <AboutOrganic business={business} content={content.about} />
      <Contact business={business} content={content.contact} />

      {showStarterBoundary && (
        <SectionBoundaryMarker
          label="Starter ends here"
          note="Everything below is SmartSite Pro — the same site, continuing, not a different one."
        />
      )}

      {showPro && (
        <>
          <Scheduling content={content.scheduling} />

          <section className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper-dim)" }}>
            <div className="mx-auto max-w-5xl">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
                Always reachable
              </span>
              <h2 className="ss-display mt-2 text-3xl" style={{ color: "var(--ss-text-on-light)" }}>
                Every way a client can reach {business.companyName}
              </h2>
              <div className="mt-8">
                <CommunicationLadder tier={tier} />
              </div>
            </div>
          </section>
        </>
      )}

      {showProBoundary && (
        <SectionBoundaryMarker
          label="Pro ends here"
          note="Everything below is SmartSite Growth — deeper content, still the same continuous site."
        />
      )}

      {showGrowth && (
        <>
          <BeforeAfterGallery content={content.beforeAfter} />
          <TrustBadges content={content.trustBadges} />
          <Faq content={content.faq} />
          <Financing content={content.financing} />
          <ExploreMore content={content.exploreMore} />
        </>
      )}

      <Footer business={business} tier={tier} />
    </div>
  );
}
