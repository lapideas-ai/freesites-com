import { ChevronDownIcon } from "../icons";

export type FaqContent = {
  eyebrow: string;
  heading: string;
  items: { question: string; answer: string }[];
};

export function Faq({ content }: { content: FaqContent }) {
  return (
    <section className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper)" }}>
      <div className="mx-auto max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
          {content.eyebrow}
        </span>
        <h2 className="ss-display mt-2 text-3xl" style={{ color: "var(--ss-text-on-light)" }}>
          {content.heading}
        </h2>

        <div className="mt-6 flex flex-col gap-2">
          {content.items.map((item) => (
            <details key={item.question} className="group rounded-xl px-5 py-4" style={{ background: "var(--ss-surface, #fff)", border: "1px solid var(--ss-line-dark)" }}>
              <summary className="flex items-center justify-between gap-4 text-sm font-bold" style={{ color: "var(--ss-text-on-light)" }}>
                {item.question}
                <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ss-text-on-light-dim)" }}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
