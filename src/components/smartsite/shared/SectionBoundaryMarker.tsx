// Internal-only annotation for the owner/reviewer preview, marking the real,
// implemented Starter/Pro boundary — not a candidate under consideration.
// Deliberately understated (a small status bar, not hazard tape): this is a
// shipped product decision being annotated for internal visibility, not a
// draft being pitched. Must only ever render when ownerPreview is true —
// never part of what a homeowner or contractor's published site can render.
export function SectionBoundaryMarker({
  label,
  note,
}: {
  label: string;
  note: string;
}) {
  return (
    <div role="note" aria-label={`Boundary: ${label}`} className="relative z-10 bg-slate-900 px-4 py-2.5 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Owner view only
        </span>
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-xs text-white/60">{note}</span>
      </div>
    </div>
  );
}
