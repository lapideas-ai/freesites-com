"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWizard, type WizardState } from "@/lib/wizard-context";
import { getTradeRegistry } from "@/lib/smartsite/registry";
import { getTradeBySlug } from "@/lib/trades";
import { reportLead } from "@/lib/report-lead";

// This is the whole "generation" step for the demo: no AI call, no backend,
// no deploy per visitor — the canonical SmartSite renders instantly with the
// data just collected. That's a feature for a live demo (zero latency, zero
// cost, zero flakiness), not a shortcut we're hiding.
//
// This is the last NUMBERED step in the claim funnel (see wizard-steps.tsx)
// — always Starter tier, no pricing chrome until the very end. Nothing here
// is actually hosted/published yet (no backend does that), so copy stays in
// "ready"/"built" language rather than "live"/"published" — see
// /smartsite-preview's own comment for the same constraint.
//
// The page is intentionally one long scroll with an escalating emotional
// sequence, not a feature-matrix dump: see it → explore it → understand
// what you got for free → experience what else FreeSites can do (Smart
// Operator, by phone) → see what Pro adds → only then the CTA into
// /build/upgrade, which is where actual pricing lives.
const FREE_BENEFITS = [
  {
    icon: "✉️",
    label: "SmartReply™ Email Included",
    body: "Responds to customer inquiries by email — even when you're busy working.",
  },
  {
    icon: "🔎",
    label: "Built for Local Search",
    body: "Search-friendly structure and local-business content built around your trade and area.",
  },
  {
    icon: "📱",
    label: "Mobile Ready",
    body: "Looks and works great for customers searching and calling from their phones.",
  },
  {
    icon: "🛠️",
    label: "Professional SmartSite",
    body: "A real web presence built around your trade, style, and business information.",
  },
];

const PRO_CAPABILITIES = [
  { icon: "🎨", label: "Custom Design & Branding", body: "More colors, imagery, layout, and messaging around your company." },
  { icon: "🏆", label: "Expanded About / Why Choose Us", body: "Your story, team, experience, credentials, and trust factors." },
  { icon: "🧰", label: "Expanded Services", body: "Deeper content around the services you actually want to sell." },
  { icon: "📸", label: "Project Galleries", body: "Your projects, trucks, crews, and before-and-after work." },
  { icon: "📍", label: "Expanded Service Areas", body: "More complete local and service-area content." },
  { icon: "🌐", label: "Custom Domain", body: "Your own business address, not just a FreeSites subdomain." },
];

const OPERATOR_STEPS = ["Answer", "Qualify", "Book", "Follow-Up"];

const FREESITES_PHONE_DISPLAY = "(716) 317-5111";
const FREESITES_PHONE_TEL = "tel:+17163175111";

// Dev-only reviewer seeds, one per live trade so all three style variants
// get exercised. Visit /build/review?demo=hvac (etc.) to land on this page
// directly without walking all six steps in this browser first — real
// wizard state lives in localStorage per-browser (see wizard-context.tsx),
// so a browser that never ran the wizard has none, and the guard below
// correctly bounces it to /build/trade. This is that same guard, just given
// a dev-only way to pre-fill state before it runs.
const DEMO_SEEDS: Record<string, Partial<WizardState>> = {
  hvac: {
    tradeSlug: "hvac",
    styleVariant: "fast-response",
    businessName: "Riverside Heating & Air",
    phone: "(512) 555-0148",
    email: "info@riversideheatingair.com",
    city: "Austin",
    stateZip: "TX 78701",
    tagline: "Keeping Austin comfortable, day and night.",
    tier: "starter",
    leadFirstName: "Jordan",
    leadEmail: "jordan@riversideheatingair.com",
    secondaryTradeSlugs: [],
    approach: "fresh",
    keepItems: [],
    existingWebsiteUrl: "",
  },
  plumbing: {
    tradeSlug: "plumbing",
    styleVariant: "trusted-local",
    businessName: "Coastline Plumbing Co.",
    phone: "(904) 555-0173",
    email: "office@coastlineplumbingco.com",
    city: "Jacksonville",
    stateZip: "FL 32202",
    tagline: "Honest plumbing, done right the first time.",
    tier: "starter",
    leadFirstName: "Morgan",
    leadEmail: "morgan@coastlineplumbingco.com",
    secondaryTradeSlugs: [],
    approach: "fresh",
    keepItems: [],
    existingWebsiteUrl: "",
  },
  electrical: {
    tradeSlug: "electrical",
    styleVariant: "premium-professional",
    businessName: "Bright Spark Electrical",
    phone: "(614) 555-0192",
    email: "hello@brightsparkelectrical.com",
    city: "Columbus",
    stateZip: "OH 43215",
    tagline: "Precision electrical work for discerning homeowners.",
    tier: "starter",
    leadFirstName: "Casey",
    leadEmail: "casey@brightsparkelectrical.com",
    secondaryTradeSlugs: [],
    approach: "fresh",
    keepItems: [],
    existingWebsiteUrl: "",
  },
};

function ReviewPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, update } = useWizard();
  const registry = state.tradeSlug ? getTradeRegistry(state.tradeSlug) : undefined;
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const demoParam = searchParams.get("demo");
  const reportedRef = useRef(false);

  useEffect(() => {
    if (reportedRef.current) return;
    if (!state.tradeSlug || !state.styleVariant || !state.businessName) return;
    reportedRef.current = true;
    const subdomainSlug = state.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbusiness";
    reportLead({
      lead_type: "SmartSite Lead",
      page_path: "/build/review",
      email: state.leadEmail || state.email,
      phone: state.phone,
      business_name: state.businessName,
      fields: { funnel_stage: "revealed", subdomain_slug: subdomainSlug },
    });
  }, [state.tradeSlug, state.styleVariant, state.businessName, state.leadEmail, state.email, state.phone]);

  useEffect(() => {
    // NODE_ENV is hard-set to "production" by `next build`/`next start`
    // regardless of query string, so this branch is dead code (and stripped
    // at build time) in any production bundle — a real visitor can never
    // trigger it by guessing the param.
    const seed = process.env.NODE_ENV !== "production" && demoParam ? DEMO_SEEDS[demoParam] : undefined;
    if (seed && !state.businessName) {
      update(seed);
      return;
    }
    if (!state.tradeSlug || !state.styleVariant || !state.businessName || !registry) {
      router.replace("/build/trade");
    }
  }, [demoParam, state.tradeSlug, state.styleVariant, state.businessName, registry, router, update]);

  if (!state.tradeSlug || !state.styleVariant || !state.businessName || !registry) return null;

  const trade = getTradeBySlug(state.tradeSlug);
  if (!trade) return null;

  const Component = registry.components[state.styleVariant];
  // Unreachable in practice — see registry.ts's TradeRegistryEntry comment.
  if (!Component) return null;
  const business = registry.buildBusinessDataFromWizard(state);
  const subdomainSlug = state.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbusiness";

  return (
    <div>
      {/* --- Reveal --- */}
      <h1 className="text-2xl font-semibold">Your {trade.name} SmartSite is ready.</h1>
      <p className="mt-1 text-foreground/60">
        {state.businessName}&apos;s new SmartSite — built, mobile-ready, and ready to start working for you.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {["FREE Forever", "No Credit Card Required"].map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-1 text-[10px] font-semibold text-foreground/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            {item}
          </span>
        ))}
      </div>

      <div className="mt-4 inline-flex rounded-full border border-foreground/15 p-0.5">
        {(["desktop", "mobile"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setDevice(id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
              device === id ? "bg-foreground text-background" : "text-foreground/60"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      <div className="relative mt-4 overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <div className={device === "mobile" ? "mx-auto max-w-[390px]" : ""}>
          <div className="h-[520px] overflow-y-auto">
            <Component business={business} tier="starter" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-2">
          <span className="fs-scroll-cue rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white">
            ↓ Scroll to explore your new SmartSite
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-1">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/[0.03] px-3.5 py-1.5 font-mono text-xs font-semibold text-foreground/70">
          🔗 {subdomainSlug}.freesites.com
        </div>
        <span className="text-[10px] text-foreground/35">Reserved for your SmartSite</span>
      </div>

      <a
        href="/smartsite-preview"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center text-sm font-semibold text-[#1a6bbf] hover:underline"
      >
        Open Full Site ↗
      </a>

      {/* --- Value of FREE --- */}
      <div className="mt-12 border-t border-foreground/10 pt-8">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">More Than a FREE Website</span>
        <h2 className="mt-1 text-xl font-bold">You just got a FreeSites SmartSite.</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/60">
          Your SmartSite isn&apos;t just something for customers to look at. It&apos;s built to help customers find
          you, contact you, and get an answer from you.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {FREE_BENEFITS.map((b) => (
            <div key={b.label} className="rounded-xl border border-foreground/10 p-3.5">
              <div className="text-lg">{b.icon}</div>
              <div className="mt-1.5 text-sm font-bold">{b.label}</div>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/55">{b.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-sm font-semibold">
          And it&apos;s yours FREE Forever. <span className="font-normal text-foreground/50">No trial. No credit card.</span>
        </p>
      </div>

      {/* --- Experience what FreeSites can do --- */}
      <div className="mt-12 border-t border-foreground/10 pt-8">
        <h2 className="text-xl font-bold">Your SmartSite can do even more.</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/60">
          SmartReply™ Email is already included FREE. FreeSites can also make your business respond by text and
          voice, book appointments, follow up with prospects, and help turn more inquiries into paying customers.
        </p>

        <div className="mt-5 rounded-2xl bg-[#1a2f4a] p-6 text-center text-white">
          <div className="text-base font-black">Meet Smart Operator™</div>
          <p className="mt-1 text-sm text-white/60">Don&apos;t just read about it. Call ours.</p>

          <a
            href={FREESITES_PHONE_TEL}
            className="mt-4 block text-3xl font-black tracking-tight text-white hover:text-orange-300 sm:text-4xl"
          >
            ☎ {FREESITES_PHONE_DISPLAY}
          </a>
          <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-white/50">
            Experience the AI operator that answers for FreeSites — and imagine it answering for{" "}
            {state.businessName}.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
            {OPERATOR_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white/80">
                  {step}
                </span>
                {i < OPERATOR_STEPS.length - 1 && <span className="text-white/25">→</span>}
              </div>
            ))}
          </div>

          <a
            href={FREESITES_PHONE_TEL}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
          >
            Call Smart Operator™ Now →
          </a>
        </div>
      </div>

      {/* --- Sell Pro / custom --- */}
      <div className="mt-12 border-t border-foreground/10 pt-8">
        <h2 className="text-xl font-bold">Like your FREE SmartSite? We&apos;ll make it even better.</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/60">
          Your FREE SmartSite gives your business a professional online presence fast — and it&apos;s yours FREE
          Forever. SmartSite Pro lets FreeSites take it further and make it truly yours.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRO_CAPABILITIES.map((c) => (
            <div key={c.label} className="rounded-xl border border-foreground/10 p-3.5">
              <div className="text-lg">{c.icon}</div>
              <div className="mt-1.5 text-sm font-bold">{c.label}</div>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/55">{c.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-foreground/40">
          Add even more as your business grows — reputation management, social media, and other advanced
          capabilities become available as you scale.
        </p>
      </div>

      {/* --- Unify + CTA --- */}
      <div className="mt-12 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 text-center">
        <h2 className="text-lg font-bold leading-snug">
          Your FREE SmartSite gets you online. Pro makes it yours — and puts it to work.
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-foreground/60">
          Keep the FREE SmartSite forever — or let FreeSites customize it further and put more of your customer
          acquisition on autopilot.
        </p>
        <button
          type="button"
          onClick={() => router.push("/build/upgrade")}
          className="mt-5 w-full rounded-full bg-[#f97316] py-3 text-sm font-bold text-white transition-colors hover:bg-[#ea6c0a] sm:w-auto sm:px-8"
        >
          See SmartSite Pro Pricing →
        </button>
      </div>

      <button
        type="button"
        onClick={() => router.push("/build/personalize")}
        className="mt-6 block text-center text-sm text-foreground/50 hover:text-foreground"
      >
        ← Edit details
      </button>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={null}>
      <ReviewPageInner />
    </Suspense>
  );
}
