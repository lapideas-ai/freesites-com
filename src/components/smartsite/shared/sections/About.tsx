import type { BusinessData } from "@/lib/smartsite/types";
import type { IconComponent } from "../icons";

export type AboutContent = {
  eyebrow: (business: BusinessData) => string;
  heading: (business: BusinessData) => string;
  highlights: { icon: IconComponent; title: string; subtitle: (business: BusinessData) => string }[];
};

export function About({ business, content }: { business: BusinessData; content: AboutContent }) {
  return (
    <section id="about" className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-ink)" }}>
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-[1.3fr_1fr] sm:items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-on-dark, var(--ss-accent))" }}>
            {content.eyebrow(business)}
          </span>
          <h2 className="ss-display mt-2 text-3xl sm:text-4xl" style={{ color: "var(--ss-text-on-dark)" }}>
            {content.heading(business)}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "var(--ss-text-on-dark-dim)" }}>
            {business.description}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {content.highlights.map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-xl p-4" style={{ background: "var(--ss-ink-soft)" }}>
              <item.icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--ss-success)" }} />
              <div>
                <div className="text-sm font-bold" style={{ color: "var(--ss-text-on-dark)" }}>
                  {item.title}
                </div>
                <div className="text-xs" style={{ color: "var(--ss-text-on-dark-dim)" }}>
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
