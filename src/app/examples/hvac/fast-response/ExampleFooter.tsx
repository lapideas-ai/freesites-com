import type { BusinessData } from "@/lib/smartsite/types";

// Route-local footer for THIS standalone example page only. Based on
// src/components/smartsite/shared/sections/Footer.tsx but, per explicit
// request scoped to this page: drops the fictional sample company's
// copyright line (this page is a reusable Blueprint source, not a real
// business's site) and renders the FreeSites attribution as a clearly
// readable line rather than small/faint boilerplate-style text.
// Deliberately not a change to the shared Footer component — every other
// trade/style page (live SmartSites, /build/style, /preview, /review,
// /examples/[trade]/[style]) keeps rendering the original, unmodified.
// Only used at tier "starter", so unlike the shared Footer this has no
// tier prop/conditional — the attribution always renders here.
export function ExampleFooter({ business }: { business: BusinessData }) {
  return (
    <footer className="px-4 pb-8 pt-12 sm:px-8" style={{ background: "var(--ss-ink)", color: "var(--ss-text-on-dark-dim)" }}>
      <div className="mx-auto grid max-w-5xl gap-8 border-b pb-8 sm:grid-cols-3" style={{ borderColor: "var(--ss-line)" }}>
        <div>
          <div className="ss-display text-lg" style={{ color: "var(--ss-text-on-dark)" }}>
            {business.companyName}
          </div>
          <p className="mt-2 text-sm leading-relaxed">{business.tagline}</p>
        </div>
        <div className="text-sm">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--ss-text-on-dark)" }}>
            Contact
          </div>
          <div>{business.phone}</div>
          <div>{business.email}</div>
          <div>
            {business.address.street}, {business.address.city}, {business.address.state} {business.address.zip}
          </div>
        </div>
        <div className="text-sm">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--ss-text-on-dark)" }}>
            Licensing
          </div>
          <div>{business.credentials.licenseNumber}</div>
          <div>Licensed &amp; insured · {business.credentials.yearsInBusiness} years in business</div>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-5xl items-center justify-center text-center text-sm font-medium">
        <span style={{ color: "var(--ss-text-on-dark)" }}>
          Made with <span aria-hidden="true">❤️</span> by{" "}
          <a
            href="https://www.freesites.com/"
            className="font-bold underline decoration-dotted underline-offset-2 hover:opacity-80"
          >
            FreeSites
          </a>
        </span>
      </div>
    </footer>
  );
}
