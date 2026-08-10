import { useRouter } from "next/navigation";
import { tierList } from "@/lib/tiers";
import { useActiveTrade } from "@/lib/homepage-active-trade-context";
import { ChannelStrip } from "./SmartReplyLadder";
import { TierCards } from "./TierCards";

// Derived from tiers.ts's own feature strings rather than retyped, so the
// table can't quietly drift out of sync with the actual pricing data.
const COMPARISON_ROWS = [
  { label: "SmartReply Email", starter: true, pro: true, growth: true },
  { label: "SmartReply SMS", starter: false, pro: true, growth: true },
  { label: "SmartReply Voice", starter: false, pro: true, growth: true },
  { label: "SmartReply Booking", starter: false, pro: true, growth: true },
  { label: "Branding Removed", starter: false, pro: true, growth: true },
  { label: "Custom Domain", starter: false, pro: true, growth: true },
  { label: "Custom SmartSite & Advanced Features", starter: false, pro: false, growth: true },
];

export function PricingSection() {
  const router = useRouter();
  const { activeSlug, claimCtaLabel } = useActiveTrade();
  const onClaim = () => router.push(`/build?trade=${activeSlug}`);
  return (
    <section id="pricing" className="bg-[#f8fafc] py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">Pricing</span>
          <h2 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
            Start Free. Grow When You&apos;re Ready.
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-[12px] leading-relaxed text-slate-500">
            One SmartReply platform — every tier below unlocks more of it.
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <ChannelStrip />
        </div>

        <TierCards mode="homepage" onSelect={() => onClaim()} claimLabel={claimCtaLabel()} />

        <div className="mx-auto mt-8 max-w-2xl overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[420px] border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-2 text-left font-semibold">Feature</th>
                {tierList.map((tier) => (
                  <th
                    key={tier.id}
                    className={`px-3 py-2 text-center font-bold ${tier.id === "pro" ? "bg-orange-50 text-[#ea6c0a]" : "text-[#1a2f4a]"}`}
                  >
                    {tier.name.replace("SmartSite ", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 1 ? "bg-slate-50/60" : ""}>
                  <td className="px-3 py-2 text-slate-700">{row.label}</td>
                  <td className="px-3 py-2 text-center">{row.starter ? <span className="text-[#16a34a]">✓</span> : <span className="text-slate-300">—</span>}</td>
                  <td className={`px-3 py-2 text-center ${row.pro ? "bg-orange-50/60" : ""}`}>{row.pro ? <span className="text-[#16a34a]">✓</span> : <span className="text-slate-300">—</span>}</td>
                  <td className="px-3 py-2 text-center">{row.growth ? <span className="text-[#16a34a]">✓</span> : <span className="text-slate-300">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
