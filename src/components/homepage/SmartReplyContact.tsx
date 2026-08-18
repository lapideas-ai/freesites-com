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
// second competing button. Doubles as a quiet product demo: it shows a
// prospect FreeSites answers by phone/text, which is what SmartReply does
// for their own business too.
export function HeaderContactLink() {
  return (
    <a
      href={FREESITES_PHONE_TEL}
      className="hidden whitespace-nowrap text-[11px] font-medium text-slate-400 transition-colors hover:text-slate-600 lg:inline-block"
    >
      Questions? Call or Text <span className="font-semibold text-slate-500">{FREESITES_PHONE_DISPLAY}</span>
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
