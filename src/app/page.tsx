import type { Metadata } from "next";
import "./sites-v3.css";
import SitesV3Home from "@/components/sites-v3-home";

export const metadata: Metadata = {
  title: { absolute: "FreeSites — Build Your Website Free" },
  description: "Websites used to cost thousands. Build one free—or have FreeSites build it free.",
  alternates: { canonical: "https://freesites.com" },
};

export default function HomePage() {
  return <SitesV3Home />;
}
