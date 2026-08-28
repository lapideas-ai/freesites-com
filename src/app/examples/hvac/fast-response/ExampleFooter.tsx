import type { BusinessData } from "@/lib/smartsite/types";

// Route-local footer for THIS standalone example page only. Copies
// src/components/smartsite/shared/sections/Footer.tsx verbatim except the
// attribution line's exact wording/link, per an explicit request scoped to
// this page. Deliberately not a change to the shared Footer component —
// every other trade/style page (live SmartSites, /build/style, /preview,
// /review, /examples/[trade]/[style]) keeps rendering the original,
// unmodified. Only used at tier "starter", so unlike the shared Footer this
// has no tier prop/conditional — the attribution always renders here.
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
      <div className="mx-auto mt-6 flex max-w-5xl flex-col items-center gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {business.companyName}. All rights reserved.</span>
        <span className="text-[11px] italic opacity-55">
          Made with <span aria-hidden="true">❤️</span> by{" "}
          <a
            href="https://www.freesites.com/"
            className="not-italic underline decoration-dotted underline-offset-2 opacity-90 hover:opacity-100"
          >
            FreeSites
          </a>
        </span>
      </div>
    </footer>
  );
}
