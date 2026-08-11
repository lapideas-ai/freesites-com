import type { BusinessData } from "@/lib/smartsite/types";
import { PhoneIcon } from "../icons";

// A third distinct Hero structure — light and warm rather than `Hero.tsx`'s
// always-dark treatment, but single-column and rounded/soft rather than
// `HeroSplit`'s crisp two-panel layout, with a filled warm CTA (not
// outlined) so it reads as inviting rather than restrained. For Trusted
// Local trades that need genuine neighborhood warmth (Landscaping).
export type HeroOrganicContent = {
  eyebrow: string;
  headlineLines: string[];
  accentLineIndex?: number;
  subhead: (business: BusinessData) => string;
  primaryCtaLabel: (business: BusinessData) => string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

function OrganicBlobs() {
  return (
    <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <path
        d="M42 58 Q18 96 48 138 Q80 182 132 158 Q182 136 172 86 Q162 34 108 26 Q58 18 42 58Z"
        fill="var(--ss-accent)"
        opacity="0.14"
      />
      <path
        d="M120 20 Q150 20 158 48 Q166 76 142 88 Q118 100 104 78 Q90 56 104 38 Q112 24 120 20Z"
        fill="var(--ss-accent2, var(--ss-accent))"
        opacity="0.22"
      />
    </svg>
  );
}

export function HeroOrganic({ business, content }: { business: BusinessData; content: HeroOrganicContent }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 py-14 sm:px-8 sm:py-20"
      style={{ background: "var(--ss-paper)", color: "var(--ss-text-on-light)" }}
    >
      <OrganicBlobs />
      <div className="relative mx-auto flex max-w-2xl flex-col items-start gap-5">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
          style={{ background: "var(--ss-accent-soft, rgba(0,0,0,0.08))", color: "var(--ss-accent-dark, var(--ss-accent))" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ss-accent)" }} />
          {content.eyebrow}
        </span>

        <h1 className="ss-display text-[2.4rem] leading-[1.08] sm:text-5xl">
          {content.headlineLines.map((line, i) => (
            <span key={i} style={i === content.accentLineIndex ? { color: "var(--ss-accent-dark, var(--ss-accent))" } : undefined}>
              {line}
              {i < content.headlineLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <p className="max-w-md text-base leading-relaxed" style={{ color: "var(--ss-text-on-light-dim)" }}>
          {content.subhead(business)}
        </p>

        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold"
            style={{ background: "var(--ss-accent)", color: "var(--ss-text-on-dark)" }}
          >
            <PhoneIcon className="h-4 w-4" />
            {content.primaryCtaLabel(business)}
          </a>
          <a
            href={content.secondaryCtaHref}
            className="flex items-center justify-center gap-2 rounded-full border-2 px-6 py-3.5 text-base font-bold"
            style={{ borderColor: "var(--ss-line-dark)", color: "var(--ss-text-on-light)" }}
          >
            {content.secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
