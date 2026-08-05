"use client";

// Disabled for Launch Candidate 1: it depends on xAI's realtime API, which
// the freesites-ai backend's own DEVELOPER_SPEC.md logs as "abandoned — API
// doesn't exist publicly" — an unverified integration isn't worth the risk
// of a contractor clicking a broken mic button during a live demo.
//
// To restore once that's verified working, replace this with:
//   import { usePathname } from "next/navigation";
//   import { SmartOperator } from "./smart-operator";
//   export function SmartOperatorMount() {
//     const pathname = usePathname();
//     if (pathname?.startsWith("/build") || pathname?.startsWith("/preview") || pathname?.startsWith("/review")) return null;
//     return <SmartOperator />;
//   }
export function SmartOperatorMount() {
  return null;
}
