import type { BusinessData } from "@/lib/smartsite/types";
import type { IconComponent } from "../icons";

export type ServicesContent = {
  eyebrow: string;
  heading: string;
  icons: IconComponent[];
};

export function Services({ business, content }: { business: BusinessData; content: ServicesContent }) {
  return (
    <section id="services" className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper)" }}>
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
          {content.eyebrow}
        </span>
        <h2 className="ss-display mt-2 text-3xl sm:text-4xl" style={{ color: "var(--ss-text-on-light)" }}>
          {content.heading}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {business.services.map((service, i) => {
            const Icon = content.icons[i % content.icons.length];
            return (
              <div
                key={service.name}
                className="flex flex-col gap-3 rounded-xl p-5"
                style={{ background: "var(--ss-surface, #fff)", border: "1px solid var(--ss-line-dark)" }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ background: "var(--ss-paper-dim)", color: "var(--ss-accent-dark, var(--ss-accent))" }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold" style={{ color: "var(--ss-text-on-light)" }}>
                  {service.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ss-text-on-light-dim)" }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
