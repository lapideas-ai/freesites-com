import type { Metadata } from "next";
import "../funnel.css";
import DiyClient from "./diy-client";

export const metadata: Metadata = {
  title: "FREE Website Starter Kit — FreeSites",
  description: "A FREE website starter prompt, leading AI options, domain guide and launch checklist from FreeSites.",
};

export default function DiyPage() {
  return <DiyClient />;
}
