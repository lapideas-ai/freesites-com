const ITEMS = ["Built in minutes", "SmartReply included", "Mobile optimized", "Google-ready", "No credit card"];

export function CredibilityRow() {
  return (
    <div className="border-y border-slate-200 bg-white py-3">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1.5 px-6">
        {ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1a2f4a]">
            <span className="text-[#16a34a]">✓</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
