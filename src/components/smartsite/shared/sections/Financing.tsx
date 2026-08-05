export type FinancingContent = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
};

export function Financing({ content }: { content: FinancingContent }) {
  return (
    <section className="px-4 py-12 sm:px-8" style={{ background: "var(--ss-accent)" }}>
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-text-on-dark-dim)" }}>
            {content.eyebrow}
          </span>
          <h2 className="ss-display mt-1 text-2xl sm:text-3xl" style={{ color: "var(--ss-text-on-dark)" }}>
            {content.heading}
          </h2>
          <p className="mt-1 max-w-md text-sm" style={{ color: "var(--ss-text-on-dark-dim)" }}>
            {content.body}
          </p>
        </div>
        <a
          href="#contact"
          className="shrink-0 rounded-lg px-6 py-3 text-sm font-bold"
          style={{ background: "var(--ss-ink)", color: "var(--ss-text-on-dark)" }}
        >
          {content.ctaLabel}
        </a>
      </div>
    </section>
  );
}
