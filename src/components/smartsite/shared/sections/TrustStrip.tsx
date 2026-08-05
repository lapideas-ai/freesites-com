import type { BusinessData } from "@/lib/smartsite/types";

export type TrustStripContent = {
  stats: { label: string; value: (business: BusinessData) => string }[];
};

export function TrustStrip({ business, content }: { business: BusinessData; content: TrustStripContent }) {
  return (
    <section
      className="grid grid-cols-2 gap-px sm:grid-cols-4"
      style={{ background: "var(--ss-line-dark)" }}
      aria-label="Quick facts"
    >
      {content.stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1 px-4 py-5 sm:px-6" style={{ background: "var(--ss-paper)" }}>
          <span className="ss-mono text-lg font-semibold sm:text-xl" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
            {stat.value(business)}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--ss-text-on-light-dim)" }}>
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  );
}
