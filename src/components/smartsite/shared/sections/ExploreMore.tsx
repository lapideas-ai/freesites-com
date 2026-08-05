import type { IconComponent } from "../icons";

// Represents the deeper Pro content set (individual service pages,
// service-area pages, team, careers, blog) as in-page teaser cards for this
// slice, rather than fully separate routes — noted as a deliberate scope cut,
// not a silent omission.
export type ExploreMoreContent = {
  eyebrow: string;
  heading: string;
  items: { icon: IconComponent; title: string; description: string }[];
};

export function ExploreMore({ content }: { content: ExploreMoreContent }) {
  return (
    <section className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper-dim)" }}>
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
          {content.eyebrow}
        </span>
        <h2 className="ss-display mt-2 text-3xl" style={{ color: "var(--ss-text-on-light)" }}>
          {content.heading}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-2 rounded-xl p-4"
              style={{ background: "var(--ss-surface, #fff)", border: "1px solid var(--ss-line-dark)" }}
            >
              <item.icon className="h-5 w-5" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }} />
              <div className="text-sm font-bold" style={{ color: "var(--ss-text-on-light)" }}>
                {item.title}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "var(--ss-text-on-light-dim)" }}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
