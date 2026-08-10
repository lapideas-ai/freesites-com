"use client";

import { useRouter } from "next/navigation";
import { ScaledPreview } from "@/components/scaled-preview";
import { ironcladSample } from "@/lib/smartsite/hvac/sample-data";
import { FastResponseSmartSite } from "@/components/smartsite/hvac/fast-response/FastResponseSmartSite";
import { TrustedLocalSmartSite } from "@/components/smartsite/hvac/trusted-local/TrustedLocalSmartSite";
import { PremiumProfessionalSmartSite } from "@/components/smartsite/hvac/premium-professional/PremiumProfessionalSmartSite";

const PHONES = [
  { id: "fast-response", name: "Fast Response", Component: FastResponseSmartSite, rotate: -7, z: 10, x: 0 },
  { id: "trusted-local", name: "Trusted Local", Component: TrustedLocalSmartSite, rotate: 0, z: 20, x: 34 },
  { id: "premium-professional", name: "Premium Professional", Component: PremiumProfessionalSmartSite, rotate: 7, z: 10, x: 68 },
] as const;

// The hero's signature element: the three real HVAC SmartSites, rendered
// live (not screenshots) at their own mobile breakpoint, fanned like a hand
// of cards. This is the "show the result, don't ask the visitor to imagine
// it" requirement — clicking any phone links into the wizard.
//
// Each phone renders a real SmartSite, which has its own internal <a> (the
// logo) and <button> (the mobile menu toggle) — so the clickable wrapper
// here can't be an <a> or <button> itself (nested interactive elements are
// invalid HTML and break click behavior unpredictably). A keyboard-
// accessible div does the same job safely.
export function PhoneFan() {
  const router = useRouter();

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-sm sm:h-[460px]">
      {PHONES.map((phone) => (
        <div
          key={phone.id}
          role="link"
          tabIndex={0}
          onClick={() => router.push("/build")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              router.push("/build");
            }
          }}
          aria-label={`Start building with the ${phone.name} style`}
          className="group absolute top-0 w-[240px] cursor-pointer overflow-hidden rounded-[2rem] border-[6px] border-[var(--fs-navy)] bg-[var(--fs-navy)] shadow-[0_20px_45px_rgba(26,47,74,0.25)] transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:shadow-[0_28px_60px_rgba(26,47,74,0.35)] focus-visible:z-30 focus-visible:-translate-y-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--fs-blue3)]"
          style={{
            left: `calc(50% - 120px + ${phone.x}px - 34px)`,
            transform: `rotate(${phone.rotate}deg)`,
            zIndex: phone.z,
          }}
        >
          <div className="h-[500px] w-full">
            <ScaledPreview height={500} canonicalWidth={390}>
              <phone.Component business={ironcladSample} tier="starter" />
            </ScaledPreview>
          </div>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--fs-navy)] to-transparent px-3 pb-2.5 pt-6 text-center text-[11px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
            {phone.name} — Start here →
          </span>
        </div>
      ))}
    </div>
  );
}
