import type { Tier } from "@/lib/smartsite/types";
import { DeviceFrame } from "./DeviceFrame";

export type ConversionNote = { title: string; rationale: string };

const FRAME_SPECS = [
  { label: "Desktop", width: 1440, height: 900 },
  { label: "Tablet", width: 834, height: 1194 },
  { label: "Mobile", width: 390, height: 844 },
] as const;

const TIER_GROUPS: { tier: Tier; groupLabel: string }[] = [
  { tier: "starter", groupLabel: "SmartSite Starter — Free forever, no credit card required" },
  { tier: "pro", groupLabel: "SmartSite Pro — $49/mo, billed annually, credit card required" },
  { tier: "growth", groupLabel: "SmartSite Growth — $97/mo, credit card required" },
];

// Shared layout for the "owner review" pages — one per trade/style. Internal
// tooling only: for us to evaluate a design's conversion reasoning, never
// linked from anything customer-facing. Shows all three product tiers as
// locked groups (via the preview page's ?tier= param) so they can be
// compared at a glance, not just toggled one at a time.
function FrameRow({ groupLabel, previewPath, tier }: { groupLabel: string; previewPath: string; tier: Tier }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wide text-black/60">{groupLabel}</h2>
      <div className="mt-3 flex flex-wrap items-start gap-6">
        {FRAME_SPECS.map((spec) => (
          <DeviceFrame
            key={spec.label}
            label={spec.label}
            width={spec.width}
            height={spec.height}
            scale={0.32}
            src={`${previewPath}?tier=${tier}`}
          />
        ))}
      </div>
    </div>
  );
}

export function OwnerReviewLayout({
  title,
  subtitle,
  previewPath,
  notes,
}: {
  title: string;
  subtitle: string;
  previewPath: string;
  notes: ConversionNote[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/40">
        Owner review — not for customers
      </div>
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      <p className="mt-1 max-w-2xl text-sm text-black/60">{subtitle}</p>

      <div className="mt-8 flex flex-col gap-10">
        {TIER_GROUPS.map((group) => (
          <FrameRow key={group.tier} groupLabel={group.groupLabel} previewPath={previewPath} tier={group.tier} />
        ))}
      </div>
      <p className="mt-2 text-xs text-black/40">
        Each frame is a live, scrollable preview at that device&rsquo;s real width, locked to the tier shown — not a static export, so no row can go stale.
      </p>

      <h2 className="mt-12 text-lg font-bold text-black">Why this design should convert</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {notes.map((note) => (
          <li key={note.title} className="rounded-lg border border-black/10 p-4">
            <div className="text-sm font-bold text-black">{note.title}</div>
            <div className="mt-1 text-sm leading-relaxed text-black/70">{note.rationale}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
