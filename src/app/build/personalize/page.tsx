"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { getTradeRegistry } from "@/lib/smartsite/registry";

const KEEP_ITEMS = ["Logo", "Colors", "Photos", "Tagline"];

export default function PersonalizePage() {
  const router = useRouter();
  const { state, update } = useWizard();
  const registry = state.tradeSlug ? getTradeRegistry(state.tradeSlug) : undefined;

  useEffect(() => {
    if (!state.tradeSlug || !state.styleVariant || !registry) {
      router.replace("/build/trade");
    }
  }, [state.tradeSlug, state.styleVariant, registry, router]);

  if (!state.tradeSlug || !state.styleVariant || !registry) return null;

  const Component = registry.components[state.styleVariant];
  const business = registry.buildBusinessDataFromWizard(state);

  function toggleKeepItem(item: string) {
    const has = state.keepItems.includes(item);
    update({
      keepItems: has ? state.keepItems.filter((i) => i !== item) : [...state.keepItems, item],
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/build/review");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Now let&apos;s make it yours.</h1>
      <p className="mt-1 text-foreground/60">
        This shows up on your new site — watch the preview update live.
      </p>

      <div className="mt-4 h-[210px] overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <div style={{ width: 1440, transform: "scale(0.3)", transformOrigin: "top left" }}>
          <Component business={business} tier="starter" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium">Would you rather start fresh, or keep what already works?</p>
        <p className="mt-1 text-xs text-foreground/40">
          We never pull colors, copy, or photos from an existing site or page automatically — a fresh look is the
          default for a reason.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => update({ approach: "fresh" })}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
              state.approach === "fresh" || !state.approach
                ? "border-[#f97316] bg-[#fff7ed]"
                : "border-foreground/15 hover:border-foreground/30"
            }`}
          >
            <span className="block font-semibold">Start Fresh</span>
            <span className="text-xs text-foreground/50">Give me a completely new look and message.</span>
          </button>
          <button
            type="button"
            onClick={() => update({ approach: "keep" })}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
              state.approach === "keep" ? "border-[#f97316] bg-[#fff7ed]" : "border-foreground/15 hover:border-foreground/30"
            }`}
          >
            <span className="block font-semibold">Keep What Works</span>
            <span className="text-xs text-foreground/50">I have things I like that I want carried over.</span>
          </button>
        </div>

        {state.approach === "keep" && (
          <div className="mt-4 rounded-xl border border-foreground/10 p-4">
            <p className="text-sm font-medium">What would you like us to carry over?</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {KEEP_ITEMS.map((item) => {
                const selected = state.keepItems.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleKeepItem(item)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      selected ? "border-foreground bg-foreground text-background" : "border-foreground/15 text-foreground/60"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <label className="mt-4 flex flex-col gap-1.5">
              <span className="text-sm font-medium">
                Existing website <span className="text-foreground/40">optional</span>
              </span>
              <input
                type="url"
                value={state.existingWebsiteUrl}
                onChange={(e) => update({ existingWebsiteUrl: e.target.value })}
                placeholder="https://yourcurrentsite.com"
                className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
              />
              <span className="text-xs text-foreground/40">
                Reference material only — we won&apos;t copy it, just use it to understand what to carry over.
              </span>
            </label>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Business name</span>
          <input
            required
            type="text"
            value={state.businessName}
            onChange={(e) => update({ businessName: e.target.value })}
            placeholder={registry.sample.companyName}
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
            placeholder={registry.sample.tagline}
            className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Primary phone</span>
          <input
            required
            type="tel"
            value={state.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="(555) 123-4567"
            className="rounded-lg border border-foreground/15 px-3 py-2.5 outline-none focus:border-foreground/40"
          />
        </label>

        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/build/availability")}
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
