import type { Tier } from "@/lib/smartsite/types";

// Shared across every trade/style — visualizes the real upgrade axis
// (communication reach), not a feature list. Reads only the common `--ss-*`
// token contract so any style variant's stylesheet can drive its colors.
//
// Rung count lit follows the product ladder: Starter reaches Email only;
// Pro adds SmartReply SMS/Voice plus booking (its whole positioning is
// "first experience with our communication platform"); Growth adds
// follow-up/reviews on top. Labels avoid "automation" per the approved
// customer-facing language — customers buy business results, not software.
const RUNGS: Array<{ label: string; sublabel: string }> = [
  { label: "Email", sublabel: "SmartReply Email" },
  { label: "SMS", sublabel: "SmartReply SMS" },
  { label: "Voice", sublabel: "SmartReply Voice" },
  { label: "Booking", sublabel: "Calendar sync" },
  { label: "Follow-Up", sublabel: "Reviews & rebooking" },
];

const ACTIVE_COUNT_BY_TIER: Record<Tier, number> = {
  starter: 1,
  pro: 4,
  growth: 5,
};

export function CommunicationLadder({ tier }: { tier: Tier }) {
  const activeCount = ACTIVE_COUNT_BY_TIER[tier];
  const activePercent =
    activeCount <= 1 ? 0 : ((activeCount - 1) / (RUNGS.length - 1)) * 80;

  return (
    <div className="relative">
      {/* Connector line — centered on each column, spanning circle 1 to circle 5 (10%–90%). Desktop only; mobile stacks rows and doesn't need it. */}
      <div className="absolute left-[10%] right-[10%] top-[18px] hidden h-0.5 sm:block" style={{ background: "var(--ss-line-dark)" }} />
      <div
        className="absolute left-[10%] top-[18px] hidden h-0.5 sm:block"
        style={{ width: `${activePercent}%`, background: "var(--ss-accent)" }}
      />

      <ol className="relative grid grid-cols-1 gap-5 sm:grid-cols-5 sm:gap-2">
        {RUNGS.map((rung, i) => {
          const active = i < activeCount;
          return (
            <li key={rung.label} className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 sm:text-center">
              <span
                className="ss-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold"
                style={{
                  borderColor: active ? "var(--ss-accent)" : "var(--ss-line-dark)",
                  background: active ? "var(--ss-accent)" : "var(--ss-paper)",
                  color: active ? "var(--ss-text-on-dark)" : "var(--ss-text-on-light-dim)",
                }}
              >
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-bold" style={{ color: active ? "var(--ss-text-on-light)" : "var(--ss-text-on-light-dim)" }}>
                  {rung.label}
                </div>
                <div className="text-[11px]" style={{ color: "var(--ss-text-on-light-dim)" }}>
                  {rung.sublabel}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
