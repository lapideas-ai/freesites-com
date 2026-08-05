"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { slug: "trade", label: "Trade" },
  { slug: "style", label: "Style" },
  { slug: "personalize", label: "Personalize" },
  { slug: "review", label: "Review" },
];

export function WizardSteps() {
  const pathname = usePathname();
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
