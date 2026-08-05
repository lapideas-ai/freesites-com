import type { BusinessData } from "@/lib/smartsite/types";
import { PhoneIcon } from "../icons";

export type HeroContent = {
  eyebrow: string;
  headlineLines: string[];
  /** Index into headlineLines that gets the accent color treatment. */
  accentLineIndex?: number;
  subhead: (business: BusinessData) => string;
  primaryCtaLabel: (business: BusinessData) => string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export function Hero({ business, content }: { business: BusinessData; content: HeroContent }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16"
      style={{ background: "var(--ss-ink)", color: "var(--ss-text-on-dark)" }}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--ss-accent)" }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-start gap-5">
        <span
          className="ss-pulse inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
          style={{ background: "var(--ss-accent-soft, rgba(0,0,0,0.16))", color: "var(--ss-accent-on-dark, var(--ss-accent))" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ss-accent)" }} />
          {content.eyebrow}
        </span>

        <h1 className="ss-display text-[2.6rem] leading-[0.95] sm:text-6xl">
          {content.headlineLines.map((line, i) => (
            <span key={i} style={i === content.accentLineIndex ? { color: "var(--ss-accent)" } : undefined}>
              {line}
              {i < content.headlineLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <p className="max-w-md text-base leading-relaxed" style={{ color: "var(--ss-text-on-dark-dim)" }}>
          {content.subhead(business)}
        </p>

        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-bold"
            style={{ background: "var(--ss-accent)", color: "var(--ss-text-on-dark)" }}
          >
            <PhoneIcon className="h-5 w-5" />
            {content.primaryCtaLabel(business)}
          </a>
          <a
            href={content.secondaryCtaHref}
            className="flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-4 text-base font-bold"
            style={{ borderColor: "var(--ss-line-strong, rgba(255,255,255,0.3))", color: "var(--ss-text-on-dark)" }}
          >
            {content.secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
