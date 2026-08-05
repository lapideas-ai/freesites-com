import Link from "next/link";
import { WizardProvider } from "@/lib/wizard-context";
import { WizardSteps } from "@/components/wizard-steps";

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return (
    <WizardProvider>
      <div className="flex min-h-full flex-col">
        <header className="border-b border-foreground/10 px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            <Link href="/" className="text-sm font-semibold">
              FreeSites
            </Link>
            <WizardSteps />
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>
      </div>
    </WizardProvider>
  );
}
