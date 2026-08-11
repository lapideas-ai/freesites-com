"use client";

import { useState } from "react";
import type { BusinessData } from "@/lib/smartsite/types";
import { CloseIcon, MenuIcon, PhoneIcon } from "../icons";

export type SiteHeaderContent = {
  navLinks: { href: string; label: string }[];
  callButtonLabelShort: string;
};

// Generic across every trade/style. Visual identity comes entirely from the
// `--ss-*` tokens defined by the active style's stylesheet — this component
// never hardcodes a color or font. `variant` is additive: existing trades
// pass nothing and get today's always-dark bar unchanged; "light" exists
// for styles (Painting, Landscaping, Remodeling) that need zero dark
// sections anywhere on the page, not just a recolored dark bar.
export function SiteHeader({
  business,
  content,
  variant = "dark",
}: {
  business: BusinessData;
  content: SiteHeaderContent;
  variant?: "dark" | "light";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLight = variant === "light";
  const bg = isLight ? "var(--ss-surface, var(--ss-paper))" : "var(--ss-ink)";
  const border = isLight ? "1px solid var(--ss-line-dark)" : "1px solid var(--ss-line)";
  const text = isLight ? "var(--ss-text-on-light)" : "var(--ss-text-on-dark)";
  const textDim = isLight ? "var(--ss-text-on-light-dim)" : "var(--ss-text-on-dark-dim)";
  const badgeText = isLight ? "var(--ss-text-on-light)" : "var(--ss-text-on-dark)";
  const menuBg = isLight ? "var(--ss-paper-dim)" : "var(--ss-ink-soft)";

  return (
    <header className="sticky top-0 z-40" style={{ background: bg, borderBottom: border }}>
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" style={{ color: text }}>
          {business.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- personalized logo, not a static asset
            <img src={business.logoUrl} alt={`${business.companyName} logo`} className="h-9 w-auto" />
          ) : (
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded"
              style={{ background: "var(--ss-accent)" }}
              aria-hidden
            >
              <span className="ss-display text-base leading-none" style={{ color: badgeText }}>
                {business.companyName
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </span>
          )}
          <span className="ss-display text-lg leading-none tracking-wide">{business.companyName}</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex" style={{ color: textDim }}>
          {content.navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-opacity hover:opacity-80">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
            style={{ background: "var(--ss-accent)", color: badgeText }}
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{business.phone}</span>
            <span className="sm:hidden">{content.callButtonLabelShort}</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg md:hidden"
            style={{ background: menuBg, color: text }}
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 px-4 pb-4 md:hidden" style={{ color: textDim }}>
          {content.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold"
              style={{ background: menuBg }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
