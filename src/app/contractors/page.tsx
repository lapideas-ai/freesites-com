import type { Metadata } from "next";
import { HomeClient } from "@/components/homepage/HomeClient";

export const metadata: Metadata = {
  title: "FreeSites for Home Service Businesses",
  description:
    "FreeSites.com gives home service businesses a FREE SmartSite built to compete for local search, plus SmartReply Voice + SMS so you never miss a customer call — 24/7.",
  alternates: { canonical: "https://freesites.com/contractors" },
  openGraph: {
    title: "FreeSites for Home Service Businesses",
    description:
      "A FREE SmartSite built to compete for local search, plus SmartReply Voice + SMS so you never miss a customer call.",
    url: "https://freesites.com/contractors",
  },
};

export default function ContractorsPage() {
  return <HomeClient />;
}
