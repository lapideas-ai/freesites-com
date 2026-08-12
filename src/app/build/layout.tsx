import Link from "next/link";
import { WizardProvider } from "@/lib/wizard-context";
import { WizardSteps } from "@/components/wizard-steps";
import { LogoMark } from "@/components/logo-mark";

// Brand pass: this used to be plain foreground/background tokens (and
// silently followed the visitor's OS dark-mode preference, unlike the rest
// of the site, which is hardcoded light). Now uses the same navy/orange
// palette and card-on-light-gray treatment as /funding and the rest of the
// marketing site, so the wizard reads as part of FreeSites rather than a
// generic form tool bolted on the side.
export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return (
    <WizardProvider>
      <div className="flex min-h-full flex-col bg-[#f8fafc]">
        <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <LogoMark size={22} />
              <span className="text-[14px] font-black tracking-tight text-[#1a2f4a]">
                Free<span className="text-[#f97316]">Sites</span>
              </span>
            </Link>
            <WizardSteps />
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">{children}</div>
        </main>
      </div>
    </WizardProvider>
  );
}
