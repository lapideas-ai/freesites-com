const BENEFITS = [
  {
    icon: "📞",
    title: "Never Miss a Call",
    body: "SmartReply answers every question 24/7 — qualifying leads and booking jobs while you're on the job.",
    result: "More jobs booked",
  },
  {
    icon: "📅",
    title: "Book Jobs Automatically",
    body: "Customers book directly into your calendar — no phone tag, no missed opportunities.",
    result: "Fuller calendar",
  },
  {
    icon: "✉️",
    title: "Follow Up Instantly",
    body: "Every visitor gets an instant reply — even at 2am — before they call a competitor.",
    result: "More conversions",
  },
  {
    icon: "⭐",
    title: "Get More Reviews",
    body: "SmartReply follows up after every job to ask happy customers for a Google review.",
    result: "Better rankings",
  },
];

export function BenefitCards() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">How FreeSites Grows Your Business</span>
        <h2 className="mt-1 max-w-xl text-xl font-extrabold leading-tight tracking-tight text-[#1a2f4a] sm:text-2xl">
          Everything Works Together To Get You More Customers
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-orange-200"
            >
              <div className="text-lg">{b.icon}</div>
              <h3 className="mt-1.5 text-[13px] font-bold text-[#1a2f4a]">{b.title}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{b.body}</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-[#ea6c0a]">
                ✓ {b.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
