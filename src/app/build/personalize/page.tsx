"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { buildBusinessDataFromWizard } from "@/lib/smartsite/hvac/build-business-data";
import { FastResponseSmartSite } from "@/components/smartsite/hvac/fast-response/FastResponseSmartSite";
import { TrustedLocalSmartSite } from "@/components/smartsite/hvac/trusted-local/TrustedLocalSmartSite";
import { PremiumProfessionalSmartSite } from "@/components/smartsite/hvac/premium-professional/PremiumProfessionalSmartSite";
import type { StyleVariant } from "@/lib/smartsite/types";

const STYLE_COMPONENTS: Record<StyleVariant, typeof FastResponseSmartSite> = {
  "fast-response": FastResponseSmartSite,
  "trusted-local": TrustedLocalSmartSite,
  "premium-professional": PremiumProfessionalSmartSite,
};

export default function PersonalizePage() {
  const router = useRouter();
  const { state, update } = useWizard();

  useEffect(() => {
    if (!state.tradeSlug || !state.styleVariant) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, state.styleVariant, router]);

  if (!state.tradeSlug || !state.styleVariant) return null;

  const Component = STYLE_COMPONENTS[state.styleVariant];
  const business = buildBusinessDataFromWizard(state);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/build/review");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Make it yours</h1>
      <p className="mt-1 text-foreground/60">
        This shows up on your new site — watch the preview update live.
      </p>

      <div className="mt-4 h-[210px] overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <div style={{ width: 1440, transform: "scale(0.3)", transformOrigin: "top left" }}>
          <Component business={business} tier="starter" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Business name</span>
          <input
            required
            type="text"
            value={state.businessName}
            onChange={(e) => update({ businessName: e.target.value })}
            placeholder="Ironclad Air & Heat"
            className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">
            Tagline <span className="text-foreground/40">optional</span>
          </span>
          <input
            type="text"
            value={state.tagline}
            onChange={(e) => update({ tagline: e.target.value })}
            placeholder="Fast, reliable comfort — day or night."
            className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">City</span>
            <input
              required
              type="text"
              value={state.city}
              onChange={(e) => update({ city: e.target.value })}
              placeholder="Austin, TX"
              className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Phone</span>
            <input
              required
              type="tel"
              value={state.phone}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="(555) 123-4567"
              className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Email</span>
          <input
            required
            type="email"
            value={state.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="you@example.com"
            className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
          />
          <span className="text-xs text-foreground/40">
            Shown on your site for customers to reach you.
          </span>
        </label>

        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/build/style")}
            className="text-sm text-foreground/50 hover:text-foreground"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
