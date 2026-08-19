// Same FreeSites number as the Smart Operator demo line on /build/review
// (src/app/build/review/page.tsx) — reusing the one existing production
// number rather than inventing a second one. Kept as its own small literal
// here (not imported from that page) so this stays a self-contained,
// low-risk addition that can't affect the working /build/review funnel.
const FREESITES_PHONE_DISPLAY = "(716) 317-5111";
const FREESITES_PHONE_TEL = "tel:+17163175111";
const FREESITES_PHONE_SMS = "sms:+17163175111";

// Desktop-only, deliberately subordinate to the primary "Claim My FREE
// SmartSite" CTA it sits next to in Header — small and muted rather than a
// second competing button. Labeled "24/7 SmartReply" rather than "Questions?"
// so it reads as a demonstration of the product (FreeSites answers by
// phone/text around the clock) rather than a generic support line.
export function HeaderContactLink() {
  return (
    <a
      href={FREESITES_PHONE_TEL}
      className="hidden whitespace-nowrap text-[11px] font-medium text-slate-400 transition-colors hover:text-slate-600 lg:inline-block"
    >
      24/7 SmartReply — Call or Text <span className="font-semibold text-slate-500">{FREESITES_PHONE_DISPLAY}</span>
    </a>
  );
}

// Mobile-only persistent Call/Text bar, fixed to the bottom of the
// viewport so it stays reachable while scrolling without duplicating the
// phone number inline in page content. Opt-in per page (not global layout)
// so it only appears on the funnel's key entry surfaces, not stamped on
// every route. The caption row exists so the buttons read as "try our live
// demo" rather than a bare, unexplained Call/Text utility.
export function MobileContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="border-b border-slate-100 bg-slate-50 px-3 py-1 text-center text-[10px] font-semibold text-slate-500">
        SmartReply answers 24/7 — try it now ↓
      </div>
      <div className="flex">
        <a
          href={FREESITES_PHONE_TEL}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[13px] font-bold text-[#1a2f4a] active:bg-slate-50"
        >
          📞 Call
        </a>
        <div className="w-px bg-slate-200" />
        <a
          href={FREESITES_PHONE_SMS}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[13px] font-bold text-[#1a2f4a] active:bg-slate-50"
        >
          💬 Text
        </a>
      </div>
    </div>
  );
}

// Prominent, dedicated live-demo section — restores the historically strong
// "call/text our own number and see SmartReply answer" CTA as its own
// section near the top of the journey (rendered right after Hero — see
// HomeClient.tsx), rather than just enlarging the header's subordinate
// link. Visually mirrors the existing Smart Operator demo block on
// /build/review (same navy card, oversized tappable number, orange CTA) —
// that block IS the proven "strongest CTA" this restores, not a new pattern.
export function SmartReplyLiveDemo() {
  return (
    <section className="bg-[#1a2f4a] py-12">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-300">
          Live Demo
        </span>
        <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">
          See SmartReply Work — Right Now
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-white/70">
          Your customers shouldn&apos;t have to wait for a callback. SmartReply Voice + SMS responds 24/7 — when
          you&apos;re on a job, after hours, on weekends, or simply can&apos;t answer. For an urgent customer,
          waiting can mean calling the next contractor.
        </p>

        <a
          href={FREESITES_PHONE_TEL}
          className="mt-6 block text-4xl font-black tracking-tight text-white transition-colors hover:text-orange-300 sm:text-5xl"
        >
          ☎ {FREESITES_PHONE_DISPLAY}
        </a>
        <p className="mt-2 text-[12px] font-semibold text-white/50">
          Try it now. See what your customers experience.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={FREESITES_PHONE_TEL}
            className="inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
          >
            Call Now →
          </a>
          <a
            href={FREESITES_PHONE_SMS}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:border-white/40"
          >
            Text Now →
          </a>
        </div>
      </div>
    </section>
  );
}

// The one meaningful SmartReply demonstration on the homepage — positioned
// right before FinalCTA (after Testimonials builds trust) so the last
// impression before the final ask is "they won't lose me to a competitor
// while they're out on a job." A mock text exchange demonstrates the
// product rather than just restating the phone number a second time.
export function SmartReply247Section() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 md:grid-cols-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">Always On</span>
          <h2 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
            Your Business Doesn&apos;t Close at 5 PM.
            <br />
            Neither Should Your Response.
          </h2>
          <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">
            SmartReply Voice + SMS helps you respond 24/7 — nights, weekends, while you&apos;re on another job, or
            when you simply can&apos;t answer. For an urgent customer, waiting can mean calling the next contractor.
          </p>

          <div className="mt-4 rounded-lg bg-[#1a2f4a] px-4 py-3">
            <p className="text-[12px] font-bold leading-snug text-white">
              Your SmartSite brings them in.{" "}
              <span className="text-[#f97316]">SmartReply helps make sure you don&apos;t lose them.</span>
            </p>
          </div>

          <a
            href={FREESITES_PHONE_TEL}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-[#1a2f4a] transition-colors hover:border-orange-300"
          >
            📞 24/7 SmartReply — Call or Text <span className="text-[#ea6c0a]">{FREESITES_PHONE_DISPLAY}</span>
          </a>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">11:47 PM · Text</div>
          <div className="mt-2 flex flex-col gap-2">
            <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white px-3.5 py-2 text-[13px] leading-snug text-slate-700 shadow-sm">
              Hi, my water heater just started leaking everywhere. Can someone come tonight??
            </div>
            <div className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-[#f97316] px-3.5 py-2 text-[13px] leading-snug text-white shadow-sm">
              Sorry to hear that! We can help — what&apos;s your address? A technician will follow up shortly.
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold text-[#16a34a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
            Answered instantly by SmartReply
          </div>
        </div>
      </div>
    </section>
  );
}
