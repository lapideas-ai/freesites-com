"use client";

import { useRouter } from "next/navigation";
import { useActiveTrade } from "@/lib/homepage-active-trade-context";

const FOUNDER_PHOTO: string | null = "/jeff-lapides.png";

function FounderPhoto() {
  if (FOUNDER_PHOTO) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local headshot, no remote-pattern config needed
      <img
        src={FOUNDER_PHOTO}
        alt="Jeff Lapides, Founder of FreeSites"
        className="h-[155px] w-[155px] rounded-2xl object-cover shadow-sm"
      />
    );
  }
  return (
    <div className="flex h-[155px] w-[155px] shrink-0 items-center justify-center rounded-2xl bg-[#1a2f4a] text-2xl font-black text-white shadow-sm">
      JL
    </div>
  );
}

export function FounderStory() {
  const router = useRouter();
  const { activeSlug, claimCtaLabel } = useActiveTrade();
  const onClaim = () => router.push(`/build?trade=${activeSlug}`);
  return (
    <section id="founder" className="bg-[#fafafa] py-10">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <FounderPhoto />
              <div className="mt-2.5 text-[12px] font-bold text-[#1a2f4a]">Jeff Lapides</div>
              <div className="text-[11px] text-slate-500">Founder, FreeSites</div>
            </div>

            <div className="text-left">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">Why I Built FreeSites</span>
              <h2 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
                A contractor&apos;s son, building the tools I wish my dad had.
              </h2>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-700">
                I grew up in a contractor&apos;s family. My father started as a one-man operation — finding the
                customers, selling the job, doing the installation himself, then coming back to service it later.
                Every part of the business ran through him.
              </p>
              <p className="mt-3 border-l-2 border-[#f97316] pl-3 text-[13px] font-bold italic leading-snug text-[#ea6c0a]">
                &ldquo;As the business grew, he discovered that selling the next job became more valuable than
                installing the last one.&rdquo;
              </p>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-700">
                That single realization changed everything. He shifted his time toward the phone, the follow-up
                calls, and the customer relationships — and that shift eventually helped him build America&apos;s
                largest manufacturer and retailer of rectangular above-ground swimming pools.
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-700">
                Watching that journey taught me something I&apos;ve never forgotten: contractors who grow fastest
                aren&apos;t always the ones with the best craftsmanship — they&apos;re the ones with better sales,
                marketing, and customer communication systems running in the background.
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-700">
                FreeSites was built to give today&apos;s contractors those same advantages without having to
                become marketers themselves. Every SmartSite comes with SmartReply built in, so email, text, and
                voice inquiries get an instant, professional response — even when you&apos;re on a job and
                can&apos;t pick up the phone.
              </p>
              <div className="mt-3 text-[12px] font-bold text-[#1a2f4a]">— Jeff Lapides</div>

              <button
                onClick={onClaim}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
              >
                {claimCtaLabel()}
              </button>

              <div className="mt-3 flex flex-col gap-1">
                {["Built by a contractor's son", "Designed for home service businesses", "No website experience required"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <span className="text-[#16a34a]">✓</span>
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
