import type { Metadata } from "next";
import { HomeClient } from "@/components/homepage/HomeClient";

// Homepage-specific override of the root layout's generic default — this is
// what actually serves "/" (Next.js resolves the closest metadata that sets
// a given field), including its own canonical (safe here specifically
// because this is the one page whose real URL genuinely IS "/" — see
// layout.tsx for why this isn't set as a shared default instead).
export const metadata: Metadata = {
  title: "FreeSites — Free SmartSites & 24/7 SmartReply for Home Service Businesses",
  description:
    "FreeSites.com gives home service businesses a FREE SmartSite built to compete for local search, plus SmartReply Voice + SMS so you never miss a customer call — 24/7. See it live, right now.",
  alternates: { canonical: "https://freesites.com" },
  openGraph: {
    title: "FreeSites — Free SmartSites & 24/7 SmartReply for Home Service Businesses",
    description:
      "A FREE SmartSite built to compete for local search, plus SmartReply Voice + SMS so you never miss a customer call.",
    url: "https://freesites.com",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
