"use client";

// Renders a live SmartSite preview at a real device viewport width, scaled
// down to fit on screen. Deliberately a live iframe rather than a static
// screenshot export — it can't go stale when content changes, and there's no
// screenshot pipeline to maintain as more trades/styles are added.
export function DeviceFrame({
  label,
  width,
  height,
  scale,
  src,
}: {
  label: string;
  width: number;
  height: number;
  scale: number;
  src: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
        {label} · {width}×{height}
      </div>
      <div
        className="overflow-hidden rounded-lg border border-black/15 bg-white shadow-sm"
        style={{ width: width * scale, height: height * scale }}
      >
        <iframe
          src={src}
          title={`${label} preview`}
          style={{
            width,
            height,
            border: "none",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </div>
  );
}
