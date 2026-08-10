const QUOTES = [
  { quote: "My phone started ringing the same week. Best money I ever spent.", who: "Plumber · Buffalo, NY" },
  { quote: "It answers calls while I'm on the roof. I haven't missed a lead.", who: "Roofer · Western NY" },
  { quote: "Customers get a reply at 2am. They think I have a full office.", who: "HVAC Tech · Buffalo, NY" },
  { quote: "I was paying $1,500/month elsewhere. FreeSites does more for less.", who: "Electrician · Erie County" },
];

export function Testimonials() {
  return (
    <section className="bg-[#f8fafc] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUOTES.map((t) => (
            <div key={t.who} className="rounded-lg border border-slate-200 bg-white p-4 text-center">
              <div className="text-xs text-[#f97316]">★★★★★</div>
              <p className="mt-1.5 text-[11px] italic leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-2 text-[10px] font-bold text-slate-500">— {t.who}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
