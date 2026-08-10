export const CHANNEL_STEPS = [
  { label: "Email", tier: "starter", icon: "✉️" },
  { label: "SMS", tier: "pro", icon: "💬" },
  { label: "Voice", tier: "pro", icon: "📞" },
  { label: "Booking", tier: "pro", icon: "📅" },
  { label: "Follow-Up", tier: "growth", icon: "⭐" },
] as const;

const TIER_DOT: Record<string, string> = { starter: "bg-slate-400", pro: "bg-[#f97316]", growth: "bg-[#1a2f4a]" };

// A compact legend, not its own section — it sits directly inside
// PricingSection, immediately above the three cards, so the channels and
// the plans that unlock them read as one connected block.
export function ChannelStrip() {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {CHANNEL_STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1">
            <span className={`h-1.5 w-1.5 rounded-full ${TIER_DOT[step.tier]}`} />
            <span className="text-xs">{step.icon}</span>
            <span className="text-[11px] font-semibold text-slate-600">{step.label}</span>
          </div>
          {i < CHANNEL_STEPS.length - 1 && <span className="text-slate-300">→</span>}
        </div>
      ))}
    </div>
  );
}
