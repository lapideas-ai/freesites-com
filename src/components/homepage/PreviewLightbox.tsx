"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ironcladSample } from "@/lib/smartsite/hvac/sample-data";
import { FastResponseSmartSite } from "@/components/smartsite/hvac/fast-response/FastResponseSmartSite";
import { TrustedLocalSmartSite } from "@/components/smartsite/hvac/trusted-local/TrustedLocalSmartSite";
import { PremiumProfessionalSmartSite } from "@/components/smartsite/hvac/premium-professional/PremiumProfessionalSmartSite";

export const STYLE_COMPONENTS = {
  "fast-response": FastResponseSmartSite,
  "trusted-local": TrustedLocalSmartSite,
  "premium-professional": PremiumProfessionalSmartSite,
} as const;

export type PreviewStyleId = keyof typeof STYLE_COMPONENTS;

// "Allow visitors to enlarge each rendering, open a full preview" — a
// homepage-scoped modal, no new dependency, no backend. Closing does not
// change anything about the wizard itself.
export function PreviewLightbox({
  styleId,
  name,
  onClose,
}: {
  styleId: PreviewStyleId;
  name: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const Component = STYLE_COMPONENTS[styleId];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} full preview`}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--fs-navy3)]/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--fs-border)] px-5 py-3.5">
          <span className="text-sm font-bold text-[var(--fs-navy)]">{name}</span>
          <div className="flex items-center gap-3">
            <Link
              href="/build"
              className="rounded-lg bg-[var(--fs-navy)] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[var(--fs-navy2)]"
            >
              Choose This Style →
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[var(--fs-gray)] transition-colors hover:bg-[var(--fs-bg)] hover:text-[var(--fs-navy)]"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Rendered at the modal's natural width — the SmartSite's own
              responsive breakpoints handle the layout, no scaling needed. */}
          <Component business={ironcladSample} tier="starter" />
        </div>
      </div>
    </div>
  );
}
