"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { ironcladSample } from "@/lib/smartsite/hvac/sample-data";
import type { StyleVariant } from "@/lib/smartsite/types";
import { FastResponseSmartSite } from "@/components/smartsite/hvac/fast-response/FastResponseSmartSite";
import { TrustedLocalSmartSite } from "@/components/smartsite/hvac/trusted-local/TrustedLocalSmartSite";
import { PremiumProfessionalSmartSite } from "@/components/smartsite/hvac/premium-professional/PremiumProfessionalSmartSite";

const STYLES: {
  id: StyleVariant;
  name: string;
  vibe: string;
  Component: typeof FastResponseSmartSite;
}[] = [
  { id: "fast-response", name: "Fast Response", vibe: "Bold & urgent", Component: FastResponseSmartSite },
  { id: "trusted-local", name: "Trusted Local", vibe: "Warm & established", Component: TrustedLocalSmartSite },
  { id: "premium-professional", name: "Premium Professional", vibe: "Refined & upscale", Component: PremiumProfessionalSmartSite },
];

// "Pick the Best One for Me" resolves to one concrete style rather than
// storing an "auto" state — Trusted Local is the broadest-appeal default
// for HVAC until real signal exists to pick smarter.
const PICK_FOR_ME_DEFAULT: StyleVariant = "trusted-local";

export default function StylePage() {
  const router = useRouter();
  const { state, update } = useWizard();

  useEffect(() => {
    if (!state.tradeSlug) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, router]);

  if (!state.tradeSlug) return null;

  function selectStyle(id: StyleVariant) {
    update({ styleVariant: id });
    router.push("/build/personalize");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Pick a look for your site</h1>
      <p className="mt-1 text-foreground/60">
        Three real, complete designs — tap the one that feels right.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {STYLES.map(({ id, name, vibe, Component }) => (
          // A live SmartSite preview (including its own header button) renders
          // inside each card, so this can't be a <button> — nested buttons are
          // invalid HTML and break click behavior unpredictably. role="button"
          // + keyboard handler keeps it accessible without nesting.
          <div
            key={id}
            role="button"
            tabIndex={0}
            onClick={() => selectStyle(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectStyle(id);
              }
            }}
            className={`cursor-pointer rounded-2xl p-1 text-left transition-colors active:scale-[0.99] ${
              state.styleVariant === id
                ? "ring-2 ring-foreground"
                : "ring-1 ring-foreground/10 hover:ring-foreground/30"
            }`}
          >
            <div className="h-[210px] overflow-hidden rounded-xl">
              <div style={{ width: 1440, transform: "scale(0.3)", transformOrigin: "top left" }}>
                <Component business={ironcladSample} tier="starter" />
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-semibold">{name}</span>
              <span className="text-xs text-foreground/50">{vibe}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => selectStyle(PICK_FOR_ME_DEFAULT)}
        className="mt-4 w-full rounded-full border border-foreground/15 py-3 text-sm font-medium hover:border-foreground/30"
      >
        Pick the Best One for Me
      </button>

      <p className="mt-4 text-center text-xs text-foreground/40">
        These are real designs — your site will be personalized with your
        business details next.
      </p>

      <button
        type="button"
        onClick={() => router.push("/build/trade")}
        className="mt-6 text-sm text-foreground/50 hover:text-foreground"
      >
        ← Back
      </button>
    </div>
  );
}
