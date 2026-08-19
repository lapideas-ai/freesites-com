import type { TierId } from "@/lib/tiers";
import { tierList } from "@/lib/tiers";
import { CHANNEL_STEPS } from "./SmartReplyLadder";

const CARD_STYLE: Record<string, { wrap: string; badge: string; button: string }> = {
  starter: {
    wrap: "border-slate-200",
    badge: "bg-slate-100 text-slate-600",
    button: "bg-[#1a2f4a] text-white hover:bg-[#1e3a5f]",
  },
  pro: {
    wrap: "border-[#f97316] border-2 shadow-md shadow-orange-500/10",
    badge: "bg-orange-100 text-[#ea6c0a]",
    button: "bg-[#f97316] text-white hover:bg-[#ea6c0a]",
  },
  growth: {
    wrap: "border-[#1a2f4a] border-2",
    badge: "bg-[#1a2f4a] text-white",
    button: "bg-[#1a2f4a] text-white hover:bg-[#1e3a5f]",
  },
};

function includedChannels(tierId: string) {
  const order = ["starter", "pro", "growth"];
  const tierRank = order.indexOf(tierId);
  return CHANNEL_STEPS.filter((step) => order.indexOf(step.tier) <= tierRank);
}

// Extracted verbatim from PricingSection's card grid so the homepage and the
// post-claim /build/upgrade screen render the exact same approved pricing
// presentation from one source — it's structurally impossible for the two
// to drift apart. Only the button's label/behavior differs by mode, since
// "upgrade" needs to know which tier was clicked and show the tier they
// already have as already-theirs rather than clickable.
export function TierCards({
  mode,
  onSelect,
  currentTier,
  claimLabel,
}: {
  mode: "homepage" | "upgrade";
  /** Only invoked for tiers without a checkoutHref (Starter) — Pro/Growth
   * navigate directly via a real anchor instead. Optional because
   * upgrade mode never needs it: Starter is always disabled there. */
  onSelect?: (tierId: TierId) => void;
  currentTier?: TierId;
  claimLabel?: string;
}) {
  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      {tierList.map((tier) => {
        const style = CARD_STYLE[tier.id];
        const channels = includedChannels(tier.id);
        const isCurrent = mode === "upgrade" && tier.id === currentTier;
        return (
          <div key={tier.id} className={`relative rounded-lg border bg-white p-5 ${style.wrap}`}>
            {tier.id === "pro" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f97316] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md shadow-orange-500/30">
                Founder&apos;s Pricing
              </div>
            )}
            <div className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${style.badge}`}>
              {tier.id === "starter" ? "Free Forever" : tier.id === "pro" ? "Most Popular" : "Custom Website"}
            </div>
            <div className="mt-2.5 text-[15px] font-black text-[#1a2f4a]">{tier.name}</div>
            {tier.pitchHeadline && (
              <div className="mt-1.5 text-[12px] font-bold leading-snug text-[#1a2f4a]">{tier.pitchHeadline}</div>
            )}
            {tier.pitchBody && <p className="mt-1 text-[11px] leading-snug text-slate-500">{tier.pitchBody}</p>}
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[28px] font-black tracking-tight text-[#1a2f4a]">{tier.price}</span>
              {tier.price !== "Free" && <span className="text-[11px] font-medium text-slate-500">{tier.cadence}</span>}
              {tier.savingsBadge && (
                <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-green-700">
                  {tier.savingsBadge}
                </span>
              )}
            </div>
            <div className="mt-0.5 text-[10px] font-semibold text-slate-400">{tier.billingNote || tier.creditCardNote}</div>
            {tier.trialNote && (
              <div className="mt-0.5 text-[10px] font-semibold text-[#16a34a]">{tier.trialNote}</div>
            )}

            <div className="mt-3 flex gap-1 border-t border-slate-100 pt-3">
              {CHANNEL_STEPS.map((step) => {
                const active = channels.includes(step);
                return (
                  <div
                    key={step.label}
                    title={step.label}
                    className={`flex-1 rounded py-1 text-center text-[8px] font-bold uppercase ${
                      active ? "bg-orange-50 text-[#ea6c0a]" : "bg-slate-50 text-slate-300"
                    }`}
                  >
                    {step.icon}
                  </div>
                );
              })}
            </div>

            <ul className="mt-3 flex flex-col gap-1.5 border-t border-slate-100 pt-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-1.5 text-[11px] leading-snug text-slate-700">
                  <span className="text-[#16a34a]">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            {tier.checkoutHref ? (
              <>
                {tier.postTrialNote && (
                  <div className="mt-3 border-t border-slate-100 pt-3 text-[10px] leading-snug text-slate-400">
                    {tier.postTrialNote}
                  </div>
                )}
                <a
                  // Pro routes through the reinforcement bridge (/pro) first
                  // instead of straight to checkout — same checkout link,
                  // reached one hop later. Growth is unaffected; its card
                  // still links straight to tier.checkoutHref as before.
                  href={tier.id === "pro" ? "/pro" : tier.checkoutHref}
                  className={`mt-4 block w-full rounded-md py-2.5 text-center text-[12px] font-bold transition-all hover:-translate-y-0.5 ${style.button}`}
                >
                  {tier.ctaLabel ?? `Start ${tier.name}`}
                </a>
                {tier.monthToMonthPrice && tier.monthToMonthCheckoutHref && (
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <div className="text-[10px] font-semibold text-slate-400">
                      Prefer monthly? <span className="font-bold text-[#1a2f4a]">{tier.monthToMonthPrice}/mo</span>
                    </div>
                    {tier.trialNote && (
                      <div className="mt-0.5 text-[10px] font-semibold text-[#16a34a]">{tier.trialNote}</div>
                    )}
                    {tier.monthToMonthPostTrialNote && (
                      <div className="mt-0.5 text-[10px] text-slate-400">{tier.monthToMonthPostTrialNote}</div>
                    )}
                    <a
                      href={tier.monthToMonthCheckoutHref}
                      className="mt-2 block w-full rounded-md border border-slate-200 py-2 text-center text-[11px] font-bold text-[#1a2f4a] transition-colors hover:border-orange-300"
                    >
                      {tier.ctaLabel ?? `Start ${tier.name}`}
                    </a>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => onSelect?.(tier.id)}
                disabled={isCurrent}
                className={`mt-4 w-full rounded-md py-2.5 text-[12px] font-bold transition-all ${
                  isCurrent ? "cursor-default bg-slate-100 text-slate-400" : `hover:-translate-y-0.5 ${style.button}`
                }`}
              >
                {isCurrent ? "You're already on this" : (claimLabel ?? `Claim ${tier.name}`)}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
