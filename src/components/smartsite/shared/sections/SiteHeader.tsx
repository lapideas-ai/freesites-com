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
// never hardcodes a color or font.
export function SiteHeader({ business, content }: { business: BusinessData; content: SiteHeaderContent }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40"
      style={{ background: "var(--ss-ink)", borderBottom: "1px solid var(--ss-line)" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" style={{ color: "var(--ss-text-on-dark)" }}>
          {business.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- personalized logo, not a static asset
            <img src={business.logoUrl} alt={`${business.companyName} logo`} className="h-9 w-auto" />
          ) : (
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded"
              style={{ background: "var(--ss-accent)" }}
              aria-hidden
            >
              <span className="ss-display text-base leading-none" style={{ color: "var(--ss-text-on-dark)" }}>
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

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex" style={{ color: "var(--ss-text-on-dark-dim)" }}>
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
            style={{ background: "var(--ss-accent)", color: "var(--ss-text-on-dark)" }}
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
            style={{ background: "var(--ss-ink-soft)", color: "var(--ss-text-on-dark)" }}
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="flex flex-col gap-1 px-4 pb-4 md:hidden"
          style={{ color: "var(--ss-text-on-dark-dim)" }}
        >
          {content.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold"
              style={{ background: "var(--ss-ink-soft)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
