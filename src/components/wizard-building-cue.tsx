// Small, consistent reassurance shown on Steps 1-4 of the claim funnel
// (start/style/services/availability) — these are the "sparse form" steps
// before Personalize starts showing the actual SmartSite. Deliberately not
// more copy/fields/length, just a tasteful cue that something is being
// built, not just filled out. The fading dot trio is the same "something
// is actively happening" motif as a browser-chrome/loading indicator,
// static (no animation) so it costs nothing and needs no reduced-motion
// handling. Step 5 (Personalize) and Reveal already show the real
// SmartSite and don't need this.
export function WizardBuildingCue() {
  return (
    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[11px] font-semibold text-[#ea6c0a]">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]/30" />
      </span>
      We&apos;re building your FREE SmartSite as you go — you&apos;ll see it in about 60 seconds.
    </div>
  );
}
