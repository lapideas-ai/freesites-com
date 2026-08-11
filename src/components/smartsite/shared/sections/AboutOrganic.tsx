import type { BusinessData } from "@/lib/smartsite/types";
import type { IconComponent } from "../icons";

// A structural departure from `About.tsx`'s always-dark two-column layout,
// not just a light recolor of it: a single rounded card with a soft blob
// accent, highlights shown as a horizontal row of pill badges rather than
// stacked cards. For Landscaping's warm, organic register.
export type AboutOrganicContent = {
  eyebrow: (business: BusinessData) => string;
  heading: (business: BusinessData) => string;
  highlights: { icon: IconComponent; title: string; subtitle: (business: BusinessData) => string }[];
};

export function AboutOrganic({ business, content }: { business: BusinessData; content: AboutOrganicContent }) {
  return (
    <section id="about" className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper-dim)" }}>
      <div className="mx-auto max-w-4xl">
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12"
          style={{ background: "var(--ss-surface, #fff)", border: "1px solid var(--ss-line-dark)" }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-15"
            style={{ background: "var(--ss-accent)" }}
            aria-hidden
          />
          <span className="relative text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
            {content.eyebrow(business)}
          </span>
          <h2 className="ss-display relative mt-2 max-w-lg text-3xl sm:text-4xl" style={{ color: "var(--ss-text-on-light)" }}>
            {content.heading(business)}
          </h2>
          <p className="relative mt-4 max-w-lg text-base leading-relaxed" style={{ color: "var(--ss-text-on-light-dim)" }}>
            {business.description}
          </p>

          <div className="relative mt-6 flex flex-wrap gap-3">
            {content.highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2.5 rounded-full px-4 py-2.5"
                style={{ background: "var(--ss-paper-dim)" }}
              >
                <item.icon className="h-4 w-4 shrink-0" style={{ color: "var(--ss-success)" }} />
                <div>
                  <div className="text-xs font-bold" style={{ color: "var(--ss-text-on-light)" }}>
                    {item.title}
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--ss-text-on-light-dim)" }}>
                    {item.subtitle(business)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
