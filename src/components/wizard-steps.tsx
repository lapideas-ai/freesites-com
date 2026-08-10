"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// "trade" is deliberately not in this list — it's a pre-numbered fallback
// entry (same as /build/upgrade is a post-numbered follow-on), not part of
// the counted claim sequence. The sequence starts at "start" (lead capture)
// and ends at "review" (the reveal) — Upgrade is handled as a special case
// below, never rendered as "step 7."
const steps = [
  { slug: "start", label: "You" },
  { slug: "style", label: "Style" },
  { slug: "services", label: "Services" },
  { slug: "availability", label: "Area" },
  { slug: "personalize", label: "Personalize" },
  { slug: "review", label: "Reveal" },
];

export function WizardSteps() {
  const pathname = usePathname();

  if (pathname?.includes("/build/upgrade")) {
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1 text-sm font-medium">
        <span aria-hidden="true">✓</span> Your FREE SmartSite is live
      </span>
    );
  }

  const activeIndex = steps.findIndex((step) =>
    pathname.includes(`/build/${step.slug}`)
  );

  return (
    <ol className="flex items-center gap-2 text-sm">
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;
        return (
          <li key={step.slug} className="flex items-center gap-2">
            <Link
              href={`/build/${step.slug}`}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                isActive
                  ? "bg-foreground text-background font-medium"
                  : isDone
                    ? "text-foreground"
                    : "text-foreground/40"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  isActive
                    ? "bg-background text-foreground"
                    : isDone
                      ? "bg-foreground text-background"
                      : "bg-foreground/10"
                }`}
              >
                {index + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </Link>
            {index < steps.length - 1 && (
              <span className="text-foreground/20">—</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
