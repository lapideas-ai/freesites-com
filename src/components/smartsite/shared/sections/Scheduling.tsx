import { CalendarIcon } from "../icons";

export type SchedulingContent = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  calendarSyncNote: string;
};

export function Scheduling({ content }: { content: SchedulingContent }) {
  return (
    <section className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-ink)" }}>
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--ss-ink-soft)", color: "var(--ss-accent)" }}>
            <CalendarIcon className="h-6 w-6" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-on-dark, var(--ss-accent))" }}>
              {content.eyebrow}
            </span>
            <h2 className="ss-display mt-1 text-2xl sm:text-3xl" style={{ color: "var(--ss-text-on-dark)" }}>
              {content.heading}
            </h2>
            <p className="mt-1 max-w-md text-sm" style={{ color: "var(--ss-text-on-dark-dim)" }}>
              {content.body}
            </p>
            <p className="mt-2 text-xs" style={{ color: "var(--ss-text-on-dark-dim)" }}>
              {content.calendarSyncNote}
            </p>
          </div>
        </div>
        <a
          href="#contact"
          className="shrink-0 rounded-lg px-6 py-3 text-sm font-bold"
          style={{ background: "var(--ss-accent)", color: "var(--ss-text-on-dark)" }}
        >
          {content.ctaLabel}
        </a>
      </div>
    </section>
  );
}
