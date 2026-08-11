// Sits immediately above LiveExamples (the six-example showcase grid) so
// a visitor understands what they're about to see before it appears —
// today the rotating examples show up with no framing. Deliberately leads
// with the business outcome and the familiar word "website," not
// "SmartSite" — a cold visitor doesn't know what a SmartSite is yet or why
// they'd want one; that term gets introduced once the benefit already
// landed (see the rest of the homepage, which uses "SmartSite" freely
// after this point).
export function ShowcaseIntro() {
  return (
    <section className="bg-white pt-10">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">
          Built for Home Service Companies Like Yours
        </span>
        <h2 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
          A Better Website Can Help You Win More Customers
        </h2>
        <p className="mx-auto mt-2.5 max-w-xl text-[13px] leading-relaxed text-slate-600">
          See different trades. Different styles. Different businesses. Every example is a starting point — we&apos;ll
          personalize yours for your company, and you can start FREE.
        </p>
        <a
          href="#examples"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[12px] font-bold text-[#1a2f4a] transition-colors hover:border-orange-300"
        >
          See Recent Examples ↓
        </a>
      </div>
    </section>
  );
}
