import "./fast-response.css";
import { displayFont, bodyFont, monoFont } from "./fonts";
import * as content from "./content";
import type { SmartSiteRenderProps } from "@/lib/smartsite/types";
import { SiteHeader } from "@/components/smartsite/shared/sections/SiteHeader";
import { Hero } from "@/components/smartsite/shared/sections/Hero";
import { TrustStrip } from "@/components/smartsite/shared/sections/TrustStrip";
import { Services } from "@/components/smartsite/shared/sections/Services";
import { About } from "@/components/smartsite/shared/sections/About";
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

// Composition root for Electrical · Fast Response. Every section here is a
// shared component — this file's only job is wiring business data + this
// style's content/tokens into them, and gating by product tier. Trusted
// Local and Premium Professional are siblings of this file, not copies of
// it. Structurally identical to HVAC's and Plumbing's Fast Response
// composition roots by design — only the CSS import, root class name, and
// content module differ.
//
// Tier ladder: Starter (free, core site) -> Pro (adds booking + the
// communication ladder — "first experience with our communication
// platform") -> Growth (adds expanded site content: gallery, credentials,
// FAQ, financing, explore-more).
export function FastResponseSmartSite({ business, tier, ownerPreview = false }: SmartSiteRenderProps) {
  const showPro = tier === "pro" || tier === "growth";
  const showGrowth = tier === "growth";
  const showStarterBoundary = ownerPreview && showPro;
  const showProBoundary = ownerPreview && showGrowth;

  return (
    <div className={`efr-smartsite ${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <SiteHeader business={business} content={content.header} />
      <Hero business={business} content={content.hero} />
      <TrustStrip business={business} content={content.trustStrip} />
      <Services business={business} content={content.services} />
      <About business={business} content={content.about} />
      <Testimonials testimonials={business.testimonials} content={content.testimonials} />
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

          <section className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper)" }}>
            <div className="mx-auto max-w-5xl">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
                Always reachable
              </span>
              <h2 className="ss-display mt-2 text-3xl" style={{ color: "var(--ss-text-on-light)" }}>
                Every way a customer can reach {business.companyName}
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
