"use client";

import { Suspense } from "react";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";
import { inter } from "@/components/homepage/fonts";
import { CustomQueryParamSync } from "@/components/homepage/CustomQueryParamSync";
import { Header } from "@/components/homepage/Header";
import { MobileContactBar, SmartReplyLiveDemo, SmartReply247Section } from "@/components/homepage/SmartReplyContact";
import { Hero } from "@/components/homepage/Hero";
import { CredibilityRow } from "@/components/homepage/CredibilityRow";
import { BenefitCards } from "@/components/homepage/BenefitCards";
import { ShowcaseIntro } from "@/components/homepage/ShowcaseIntro";
import { LiveExamples } from "@/components/homepage/LiveExamples";
import { TradeSection } from "@/components/homepage/TradeSection";
import { PricingSection } from "@/components/homepage/PricingSection";
import { FounderStory } from "@/components/homepage/FounderStory";
import { Testimonials } from "@/components/homepage/Testimonials";
import { FinalCTA } from "@/components/homepage/FinalCTA";
import { Footer } from "@/components/homepage/Footer";

// Launch-candidate polish pass: this is the approved design foundation, not
// a redesign. Orange is primary, navy is structural, every CTA reads "Claim
// My FREE SmartSite". The SmartOperator phone-demo widget was removed
// entirely (not production-ready) rather than de-emphasized.
//
// Section order leads with SmartReply, then pricing, then the founder story
// — pricing and trust come before deeper exploration (examples, trades,
// benefits) rather than after it. SmartReplyLiveDemo sits directly after
// Hero — restoring the live-phone-demo concept as a prominent, dedicated
// section near the top of the journey, not just a bigger header number.
// SmartReply247Section stays near the bottom as a second, differently-
// purposed reinforcement (the "don't lose the lead" close) right before
// the final CTA — this is the actual page content, split out of page.tsx
// so page.tsx can stay a Server Component and export real metadata
// (homepage title/description/canonical) instead of only inheriting the
// generic layout-level default.
export function HomeClient() {
  return (
    <div className={inter.className}>
      <ActiveTradeProvider>
        <Suspense fallback={null}>
          <CustomQueryParamSync />
        </Suspense>
        <Header showContact />
        <MobileContactBar />
        <main>
          <Hero />
          <SmartReplyLiveDemo />
          <CredibilityRow />
          <PricingSection />
          <FounderStory />
          <ShowcaseIntro />
          <LiveExamples />
          <TradeSection />
          <BenefitCards />
          <Testimonials />
          <SmartReply247Section />
          <FinalCTA />
        </main>
      </ActiveTradeProvider>
      <Footer />
    </div>
  );
}
