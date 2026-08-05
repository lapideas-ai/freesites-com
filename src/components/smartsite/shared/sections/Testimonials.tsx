import type { Testimonial } from "@/lib/smartsite/types";

export type TestimonialsContent = {
  eyebrow: string;
  heading: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="ss-mono text-sm" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }} aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span style={{ color: "var(--ss-line-dark)" }}>{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export function Testimonials({
  testimonials,
  content,
}: {
  testimonials: Testimonial[];
  content: TestimonialsContent;
}) {
  return (
    <section id="reviews" className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper-dim)" }}>
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
          {content.eyebrow}
        </span>
        <h2 className="ss-display mt-2 text-3xl sm:text-4xl" style={{ color: "var(--ss-text-on-light)" }}>
          {content.heading}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.author} className="flex flex-col gap-3 rounded-xl p-5" style={{ background: "var(--ss-surface, #fff)", border: "1px solid var(--ss-line-dark)" }}>
              <Stars rating={t.rating} />
              <blockquote className="text-sm leading-relaxed" style={{ color: "var(--ss-text-on-light)" }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto text-xs font-semibold" style={{ color: "var(--ss-text-on-light-dim)" }}>
                {t.author} · {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
