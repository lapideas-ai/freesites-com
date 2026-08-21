"use client";

import Link from "next/link";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";
import { inter } from "@/components/homepage/fonts";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { MobileContactBar } from "@/components/homepage/SmartReplyContact";
import { tiers } from "@/lib/tiers";

const JOURNEY_STEPS = [
  { icon: "🔍", label: "“Emergency plumber near me”" },
  { icon: "🌐", label: "SmartSite Competes to Be Found" },
  { icon: "📞", label: "Customer Calls or Texts" },
  { icon: "⚡", label: "SmartReply Responds 24/7" },
  { icon: "✅", label: "Better Chance to Win the Job" },
];

const BENEFITS = [
  {
    icon: "🔎",
    title: "Built for Local Search",
    body: "Service- and location-focused content designed to help search engines understand what you do and where you do it.",
  },
  {
    icon: "⚡",
    title: "SmartReply Voice + SMS — 24/7",
    body: "When you're on a job, after hours, or simply can't answer, SmartReply can respond immediately.",
  },
  {
    icon: "🎯",
    title: "Don't Lose the Lead",
    body: "Your SmartSite helps customers find you. SmartReply helps you respond while they're still looking for help.",
  },
];

// The Pro reinforcement bridge — same "sell it again before checkout"
// concept as the homepage's Custom bridge, but its own distinct offer: not
// custom-website/personalization, but local discovery (SmartSite) + 24/7
// response (SmartReply) so a prospect doesn't lose a lead to a competitor.
// Reached from TierCards' Pro CTA (see TierCards.tsx) instead of routing
// straight to checkout; the CTA here goes to the exact same, unchanged
// Pro checkout link sourced from tiers.ts — no new payment link.
export default function ProBridgePage() {
  const pro = tiers.pro;

  return (
    <div className={inter.className}>
      <ActiveTradeProvider>
        <Header showContact />
      </ActiveTradeProvider>
      <MobileContactBar />

      <section className="mx-auto max-w-3xl px-6 py-14 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">
          SmartSite Pro
        </span>
        <h1 className="mt-3 text-[28px] font-black leading-[1.15] tracking-tight text-[#1a2f4a] sm:text-[34px]">
          Get Found. Respond Fast. Win More Jobs.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
          When someone searches <span className="font-semibold text-[#1a2f4a]">&ldquo;emergency plumber near me,&rdquo;</span>{" "}
          they&apos;re not casually browsing. They need help.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">
          SmartSite Pro helps your business compete when high-intent customers search locally, while SmartReply Voice
          + SMS responds 24/7 so urgent leads do not move on because you could not answer.
        </p>

        {/* Simple pill-and-arrow journey strip — same visual language as
            PricingSection's ChannelStrip, not a new diagram component. */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5">
          {JOURNEY_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <span className="text-sm">{step.icon}</span>
                <span className="text-[11px] font-semibold text-slate-600">{step.label}</span>
              </div>
              {i < JOURNEY_STEPS.length - 1 && <span className="text-slate-300">→</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fafc] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="text-xl">{b.icon}</div>
                <div className="mt-2 text-[13px] font-bold uppercase tracking-wide text-[#1a2f4a]">{b.title}</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-[#1a2f4a] p-6 text-center">
            <p className="text-[15px] font-black leading-snug text-white sm:text-[17px]">
              Your SmartSite Brings Them In.
              <br />
              <span className="text-[#f97316]">SmartReply Helps Make Sure You Don&apos;t Lose Them.</span>
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 text-center">
            <a
              href={pro.checkoutHref}
              className="inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-6 py-3.5 text-[14px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
            >
              Get SmartSite Pro — {pro.price}
              {pro.cadence} →
            </a>
            <p className="text-[11px] text-slate-400">{pro.trialNote}</p>
            <Link href="/#pricing" className="mt-1 text-[12px] font-semibold text-[#1a6bbf] hover:underline">
              See Full Pricing →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
