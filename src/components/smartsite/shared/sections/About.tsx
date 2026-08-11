import type { BusinessData } from "@/lib/smartsite/types";
import type { IconComponent } from "../icons";

export type AboutContent = {
  eyebrow: (business: BusinessData) => string;
  heading: (business: BusinessData) => string;
  highlights: { icon: IconComponent; title: string; subtitle: (business: BusinessData) => string }[];
};

// `variant` is additive: existing trades pass nothing and keep today's
// always-dark-ink section unchanged. "light" exists for styles that need
// zero dark sections anywhere on the page (Painting, Remodeling).
export function About({
  business,
  content,
  variant = "dark",
}: {
  business: BusinessData;
  content: AboutContent;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";
  const bg = isLight ? "var(--ss-paper)" : "var(--ss-ink)";
  const eyebrowColor = isLight ? "var(--ss-accent-dark, var(--ss-accent))" : "var(--ss-accent-on-dark, var(--ss-accent))";
  const headingColor = isLight ? "var(--ss-text-on-light)" : "var(--ss-text-on-dark)";
  const bodyColor = isLight ? "var(--ss-text-on-light-dim)" : "var(--ss-text-on-dark-dim)";
  const cardBg = isLight ? "var(--ss-surface, #fff)" : "var(--ss-ink-soft)";
  const cardBorder = isLight ? "1px solid var(--ss-line-dark)" : "none";

  return (
    <section id="about" className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: bg }}>
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-[1.3fr_1fr] sm:items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: eyebrowColor }}>
            {content.eyebrow(business)}
          </span>
          <h2 className="ss-display mt-2 text-3xl sm:text-4xl" style={{ color: headingColor }}>
            {content.heading(business)}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: bodyColor }}>
            {business.description}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {content.highlights.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: cardBg, border: cardBorder }}
            >
              <item.icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--ss-success)" }} />
              <div>
                <div className="text-sm font-bold" style={{ color: headingColor }}>
                  {item.title}
                </div>
                <div className="text-xs" style={{ color: bodyColor }}>
                  {item.subtitle(business)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
