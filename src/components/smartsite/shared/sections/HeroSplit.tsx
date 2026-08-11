import type { BusinessData } from "@/lib/smartsite/types";
import { PhoneIcon } from "../icons";

// A genuinely different Hero structure, not `Hero.tsx` recolored: light
// background instead of always-dark, two-column split with a dedicated
// visual panel instead of a single centered text block, and the primary
// CTA is a consultation ask rather than a phone call — for Premium
// Professional trades that want a calmer, higher-ticket register (Painting,
// Remodeling). `motif` swaps the abstract panel treatment — no real or
// placeholder photography, consistent with this codebase's existing
// BeforeAfterGallery precedent.
export type HeroSplitContent = {
  eyebrow: string;
  headlineLines: string[];
  /** Index into headlineLines that gets the accent color treatment. */
  accentLineIndex?: number;
  subhead: (business: BusinessData) => string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: (business: BusinessData) => string;
  motif: "swatch-grid" | "blueprint-lines";
};

function SwatchGridPanel() {
  const swatches = [1, 0.7, 0.45, 0.85, 0.35, 0.6, 0.25, 0.95, 0.5];
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-6 sm:p-8">
      {swatches.map((opacity, i) => (
        <div key={i} className="aspect-square rounded-2xl" style={{ background: "var(--ss-accent)", opacity }} />
      ))}
    </div>
  );
}

function BlueprintLinesPanel() {
  return (
    <div
      className="h-full p-6 sm:p-8"
      style={{
        backgroundImage:
          "linear-gradient(var(--ss-line-dark) 1px, transparent 1px), linear-gradient(90deg, var(--ss-line-dark) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" stroke="var(--ss-accent-dark, var(--ss-accent))" strokeWidth="1.5">
        <rect x="28" y="26" width="144" height="96" rx="2" />
        <path d="M28 88h144M96 26v96M138 122v52M64 122v52" strokeLinecap="round" />
        <circle cx="152" cy="152" r="18" />
        <path d="M152 140v24M140 152h24" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function HeroSplit({ business, content }: { business: BusinessData; content: HeroSplitContent }) {
  return (
    <section
      id="top"
      className="px-4 py-14 sm:px-8 sm:py-20"
      style={{ background: "var(--ss-paper)", color: "var(--ss-text-on-light)" }}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
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

          <div className="mt-2 flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={content.primaryCtaHref}
              className="flex items-center justify-center gap-2 rounded-full border-2 px-6 py-3.5 text-base font-bold transition-opacity hover:opacity-80"
              style={{ borderColor: "var(--ss-accent-dark, var(--ss-accent))", color: "var(--ss-accent-dark, var(--ss-accent))" }}
            >
              {content.primaryCtaLabel}
            </a>
            <a
              href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-2 px-2 py-3.5 text-sm font-semibold"
              style={{ color: "var(--ss-text-on-light-dim)" }}
            >
              <PhoneIcon className="h-4 w-4" />
              {content.secondaryCtaLabel(business)}
            </a>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-3xl"
          style={{ background: "var(--ss-paper-dim)", border: "1px solid var(--ss-line-dark)", aspectRatio: "1 / 1" }}
        >
          {content.motif === "swatch-grid" ? <SwatchGridPanel /> : <BlueprintLinesPanel />}
        </div>
      </div>
    </section>
  );
}
