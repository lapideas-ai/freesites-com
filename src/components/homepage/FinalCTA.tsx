"use client";

import { useRouter } from "next/navigation";
import { useActiveTrade } from "@/lib/homepage-active-trade-context";

export function FinalCTA() {
  const router = useRouter();
  const { claimCtaLabel, claimCtaHref } = useActiveTrade();
  const onClaim = () => router.push(claimCtaHref());
  return (
    <section className="bg-[#1a2f4a] py-10">
      <div className="mx-auto max-w-md px-6 text-center">
        <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">Claim Your FREE SmartSite Today</h2>
        <p className="mt-2.5 text-[13px] font-semibold leading-relaxed text-white/80">
          Your professional website.
          <br />
          SmartReply included.
          <br />
          Live in minutes.
          <br />
          FREE Forever.
        </p>
        <button
          onClick={onClaim}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
        >
          {claimCtaLabel()}
        </button>
      </div>
    </section>
  );
}
