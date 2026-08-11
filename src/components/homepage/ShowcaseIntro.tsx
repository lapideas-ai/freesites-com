import Link from "next/link";

// Sits immediately above LiveExamples (the six-example showcase grid) so
// a visitor understands what they're about to see before it appears —
// today the rotating examples show up with no framing. Deliberately leads
// with the business outcome and the familiar word "website," not
// "SmartSite" — a cold visitor doesn't know what a SmartSite is yet or why
// they'd want one; that term gets introduced once the benefit already
// landed (see the rest of the homepage, which uses "SmartSite" freely
// after this point).
//
// "business funding" links to /funding as a deliberately subtle inline
// mention, not a competing CTA — the FREE SmartSite claim stays the only
// prominent action on this page.
export function ShowcaseIntro() {
  return (
    <section className="bg-white pt-10">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
          Built for Home Service Businesses — From Your First Customer to Your Next Stage of Growth
        </h2>
        <p className="mx-auto mt-2.5 max-w-xl text-[13px] leading-relaxed text-slate-600">
          FreeSites helps contractors get online, get found, respond to customers and win more jobs — starting
          with a professional SmartSite that&apos;s FREE Forever.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-slate-600">
          As their businesses grow, FreeSites can help with more — including AI customer response, booking,
          reputation, marketing and access to{" "}
          <Link href="/funding" className="text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-[#1a2f4a]">
            business funding
          </Link>
          .
        </p>
        <a
          href="#examples"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[12px] font-bold text-[#1a2f4a] transition-colors hover:border-orange-300"
        >
          See What Your FREE SmartSite Can Look Like ↓
        </a>
      </div>
    </section>
  );
}
