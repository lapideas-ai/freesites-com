import Link from "next/link";
import { tierList } from "@/lib/tiers";

const STEPS = [
  { n: "1", title: "Choose your trade", body: "Starting with HVAC — more trades coming soon." },
  { n: "2", title: "Choose your style", body: "Three real, complete designs. Pick the one that feels right." },
  { n: "3", title: "Personalize it", body: "Your name, your number, your city — see it update live." },
];

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center px-6 py-20 text-center sm:py-28">
        <span className="text-sm font-medium text-foreground/50">
          SmartSites by FreeSites
        </span>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
          A professional website for your business, live in minutes.
        </h1>
        <p className="mt-4 max-w-md text-lg text-foreground/60">
          Pick your trade, pick a style, personalize it — free to start, no
          credit card required.
        </p>
        <Link
          href="/build"
          className="mt-8 flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:opacity-90"
        >
          Build my free SmartSite
        </Link>
      </section>

      <section className="border-t border-foreground/10 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-foreground/40">
            How it works
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="rounded-xl border border-foreground/10 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-sm font-bold">
                  {step.n}
                </span>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-foreground/60">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-foreground/40">
            Start free. Grow when you&apos;re ready.
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {tierList.map((tier) => (
              <div key={tier.id} className="flex flex-col gap-2 rounded-xl border border-foreground/10 p-5">
                <span className="font-semibold">{tier.name}</span>
                <span className="text-2xl font-bold">
                  {tier.price}
                  <span className="text-sm font-normal text-foreground/50">{tier.cadence}</span>
                </span>
                {tier.billingNote && (
                  <span className="text-xs text-foreground/50">{tier.billingNote}</span>
                )}
                <span className="text-xs text-foreground/50">{tier.creditCardNote}</span>
                <p className="mt-1 text-sm text-foreground/60">{tier.tagline}</p>
                <ul className="mt-2 flex flex-col gap-1 text-xs text-foreground/70">
                  {tier.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold">Ready to see yours?</h2>
        <p className="mt-2 text-foreground/60">
          Free forever. No credit card. Live in minutes.
        </p>
        <Link
          href="/build"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:opacity-90"
        >
          Build my free SmartSite
        </Link>
      </section>
    </div>
  );
}
