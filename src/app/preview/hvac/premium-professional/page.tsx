"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PremiumProfessionalSmartSite } from "@/components/smartsite/hvac/premium-professional/PremiumProfessionalSmartSite";
import { ironcladSample } from "@/lib/smartsite/hvac/sample-data";
import type { Tier } from "@/lib/smartsite/types";

const TIER_OPTIONS: { id: Tier; label: string }[] = [
  { id: "starter", label: "Starter" },
  { id: "pro", label: "Pro" },
  { id: "growth", label: "Growth" },
];

function isTier(value: string | null): value is Tier {
  return value === "starter" || value === "pro" || value === "growth";
}

// Internal review surface only — not part of the wizard, not connected to
// generation/Stripe/GHL. Accepts ?tier=starter|pro|growth so the owner
// review page can embed a locked view per tier, side by side.
function PremiumProfessionalPreviewInner() {
  const searchParams = useSearchParams();
  const paramTier = searchParams.get("tier");
  const initialTier: Tier = isTier(paramTier) ? paramTier : "growth";
  const [tier, setTier] = useState<Tier>(initialTier);
  const [ownerPreview, setOwnerPreview] = useState(true);

  return (
    <div>
      <div className="sticky top-0 z-[100] flex flex-wrap items-center gap-4 border-b border-black/10 bg-white px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
          Internal review — HVAC · Premium Professional
        </span>
        <div className="flex gap-1 rounded-full bg-black/5 p-1">
          {TIER_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setTier(option.id)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                tier === option.id ? "bg-black text-white" : "text-black/60"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1.5 text-xs font-medium text-black/60">
          <input
            type="checkbox"
            checked={ownerPreview}
            onChange={(e) => setOwnerPreview(e.target.checked)}
            disabled={tier === "starter"}
          />
          Show boundary markers
        </label>
      </div>

      <PremiumProfessionalSmartSite business={ironcladSample} tier={tier} ownerPreview={ownerPreview} />
    </div>
  );
}

export default function PremiumProfessionalPreviewPage() {
  return (
    <Suspense fallback={null}>
      <PremiumProfessionalPreviewInner />
    </Suspense>
  );
}
