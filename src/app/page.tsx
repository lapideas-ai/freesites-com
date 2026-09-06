import type { Metadata } from "next";
import "./sites-v3.css";
import SitesV3Home from "@/components/sites-v3-home";

export const metadata: Metadata = {
  title: { absolute: "FreeSites — Build Your Website Free" },
  description: "Websites used to cost thousands. Build one free—or have FreeSites build it free.",
  alternates: { canonical: "https://freesites.com" },
};

export default function HomePage() {
  return (
    <>
      <div style={{background:"#071a34",color:"white",textAlign:"center",padding:"10px 18px",fontSize:"14px",lineHeight:1.4}}>
        <strong>HOME SERVICE BUSINESS?</strong>{" "}
        See the FreeSites website + 24/7 SmartReply offer for contractors.{" "}
        <a href="/contractors" style={{color:"#c8ff24",fontWeight:800,textDecoration:"underline",whiteSpace:"nowrap"}}>FOR HOME SERVICES →</a>
      </div>
      <SitesV3Home />
    </>
  );
}
