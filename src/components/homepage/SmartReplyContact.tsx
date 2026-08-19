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
// every route.
export function MobileContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
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
