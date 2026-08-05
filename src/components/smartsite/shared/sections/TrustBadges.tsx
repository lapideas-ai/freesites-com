import type { IconComponent } from "../icons";

export type TrustBadgesContent = {
  eyebrow: string;
  heading: string;
  badges: { icon: IconComponent; label: string }[];
};

export function TrustBadges({ content }: { content: TrustBadgesContent }) {
  return (
    <section className="px-4 py-12 sm:px-8" style={{ background: "var(--ss-paper-dim)" }}>
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
          {content.eyebrow}
        </span>
        <h2 className="ss-display mt-2 text-2xl sm:text-3xl" style={{ color: "var(--ss-text-on-light)" }}>
          {content.heading}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {content.badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: "var(--ss-surface, #fff)", border: "1px solid var(--ss-line-dark)", color: "var(--ss-text-on-light)" }}
            >
              <badge.icon className="h-4 w-4" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }} />
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
