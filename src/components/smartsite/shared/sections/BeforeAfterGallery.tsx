// Represents comfort/quality transformation abstractly (muted "before" panel
// vs. crisp "after" panel) rather than placeholder photography — a personalized
// site will eventually swap in the contractor's real project photos here.
export type BeforeAfterGalleryContent = {
  eyebrow: string;
  heading: string;
  items: { title: string; beforeLabel: string; afterLabel: string; beforeDescription: string; afterDescription: string }[];
};

export function BeforeAfterGallery({ content }: { content: BeforeAfterGalleryContent }) {
  return (
    <section className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper)" }}>
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
          {content.eyebrow}
        </span>
        <h2 className="ss-display mt-2 text-3xl sm:text-4xl" style={{ color: "var(--ss-text-on-light)" }}>
          {content.heading}
        </h2>

        <div className="mt-8 flex flex-col gap-6">
          {content.items.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--ss-line-dark)" }}>
              <div className="px-5 py-3 text-sm font-bold" style={{ background: "var(--ss-surface, #fff)", color: "var(--ss-text-on-light)" }}>
                {item.title}
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col justify-end gap-1 p-5" style={{ background: "color-mix(in srgb, var(--ss-ink) 55%, var(--ss-paper-dim))" }}>
                  <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--ss-text-on-dark-dim)" }}>
                    {item.beforeLabel}
                  </span>
                  <span className="text-sm" style={{ color: "var(--ss-text-on-dark)" }}>
                    {item.beforeDescription}
                  </span>
                </div>
                <div className="flex flex-col justify-end gap-1 p-5" style={{ background: "var(--ss-accent)" }}>
                  <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--ss-text-on-dark-dim)" }}>
                    {item.afterLabel}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--ss-text-on-dark)" }}>
                    {item.afterDescription}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
