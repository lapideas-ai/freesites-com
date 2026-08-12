"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <span className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-[#ea6c0a]">
        <span aria-hidden="true">✓</span> Your FREE SmartSite is live
      </span>
    );
  }

  const activeIndex = steps.findIndex((step) => pathname.includes(`/build/${step.slug}`));

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
                isActive ? "bg-[#1a2f4a] font-medium text-white" : isDone ? "text-[#1a2f4a]" : "text-slate-400"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  isActive ? "bg-[#f97316] text-white" : isDone ? "bg-[#1a2f4a] text-white" : "bg-slate-100"
                }`}
              >
                {index + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </Link>
            {index < steps.length - 1 && <span className="text-slate-300">—</span>}
          </li>
        );
      })}
    </ol>
  );
}
