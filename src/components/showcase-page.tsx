"use client";

import Link from "next/link";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import type { BusinessData, StyleVariant } from "@/lib/smartsite/types";

const STYLE_ORDER: { id: StyleVariant; label: string }[] = [
  { id: "fast-response", label: "Fast Response" },
  { id: "trusted-local", label: "Trusted Local" },
  { id: "premium-professional", label: "Premium Professional" },
];

export function ShowcasePage({ tradeSlug, business }: { tradeSlug: string; business: BusinessData }) {
  const registry = getTradeRegistry(tradeSlug);
  if (!registry) return null;

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-xs font-bold uppercase tracking-wide text-[#ea6c0a]">
          FreeSites
        </Link>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1a2f4a] sm:text-4xl">
          3 Website Ideas for Your Business
        </h1>
        <p className="mt-2 text-lg font-semibold text-[#1a2f4a]">Which one do you like best?</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          These are starting points. Pick the look you like best and we&apos;ll finish it just for your business — your colors, photos, services, offers and anything else you&apos;d like included.
        </p>

        <div className="mt-8 flex flex-col gap-8">
          {STYLE_ORDER.map(({ id, label }) => {
            const Component = registry.components[id];
            if (!Component) return null;
            const params = new URLSearchParams({ trade: tradeSlug, style: id });
            if (business.companyName !== registry.sample.companyName) params.set("business", business.companyName);
            if (business.address.city !== registry.sample.address.city) params.set("city", business.address.city);
            if (business.phone !== registry.sample.phone) params.set("phone", business.phone);
            const href = `/build/start?${params.toString()}`;

            return (
              <section key={id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-4 py-3">
                  <h2 className="text-base font-black text-[#1a2f4a]">{label}</h2>
                </div>
                <div className="h-[520px] overflow-y-auto">
                  <Component business={business} tier="starter" />
                </div>
                <div className="border-t border-slate-100 px-4 py-4">
                  <Link
                    href={href}
                    className="inline-flex rounded-lg bg-[#f97316] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#ea6c0a]"
                  >
                    Choose {label}
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
