"use client";

import { useState } from "react";
import { inter } from "@/components/homepage/fonts";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";

// V1 introduction + inquiry page for FreeSites Funding. Deliberately small:
// one screen, one short form — not a funding application, not a
// qualification engine. The FREE offer is the SmartSite, not this; this
// page exists to start a conversation, not to promise consulting,
// bookkeeping help, automatic matches, or guaranteed financing/approval.
//
// NO BACKEND IS WIRED YET. handleSubmit only sets local UI state — nothing
// is sent over the network or stored anywhere. Field names/ids are stable
// (snake_case) so a real destination (a Netlify function forwarding to a
// GoHighLevel webhook, a Kit API call, etc.) can be wired in later by
// replacing the body of handleSubmit — no redesign needed. Do not present
// this page as capturing real leads until that's done.

const FUNDING_AMOUNT_OPTIONS = ["Under $25K", "$25K–$50K", "$50K–$100K", "$100K–$250K", "$250K–$500K", "$500K+", "Not sure yet"];

type FundingInquiry = {
  funding_purpose: string;
  funding_amount: string;
  name: string;
  business_name: string;
  email: string;
  phone: string;
};

const emptyForm: FundingInquiry = {
  funding_purpose: "",
  funding_amount: "",
  name: "",
  business_name: "",
  email: "",
  phone: "",
};

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-[#1a2f4a] outline-none focus:border-orange-300";
const labelClass = "text-[13px] font-semibold text-[#1a2f4a]";

export default function FundingPage() {
  const [form, setForm] = useState<FundingInquiry>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FundingInquiry>(key: K, value: FundingInquiry[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend wired yet — see the file header comment. `form` is a
    // ready-to-send payload once a real destination exists.
    setSubmitted(true);
  }

  return (
    <div className={inter.className}>
      <ActiveTradeProvider>
        <Header />
      </ActiveTradeProvider>

      <main className="bg-[#f8fafc]">
        <section className="mx-auto max-w-2xl px-6 py-10 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">FreeSites Funding</span>
          <h1 className="mt-1.5 text-2xl font-black leading-tight tracking-tight text-[#1a2f4a] sm:text-3xl">
            What Could You Do With More Capital?
          </h1>
          <p className="mx-auto mt-2.5 max-w-xl text-[14px] leading-relaxed text-slate-600">
            Another truck. Better equipment. More crews. More marketing. Working capital. Even acquiring another
            home-service business or selling yours.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-slate-500">
            For more than four decades, we&apos;ve helped businesses find the capital they need to grow. Now
            we&apos;re bringing that experience to the home-service businesses FreeSites serves.
          </p>

          {submitted ? (
            <div className="mx-auto mt-7 max-w-md rounded-xl border border-slate-200 bg-white p-8">
              <div className="text-lg font-bold text-[#1a2f4a]">Thanks — we&apos;ve got it.</div>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                A member of the FreeSites team will follow up personally with{" "}
                {form.business_name || "your business"} to talk through what you need.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-7 flex max-w-md flex-col gap-3.5 text-left">
              <label className="flex flex-col gap-1.5">
                <span className={labelClass}>What are you looking to fund?</span>
                <textarea
                  id="funding_purpose"
                  name="funding_purpose"
                  required
                  rows={2}
                  placeholder="Tell us briefly what you have in mind"
                  value={form.funding_purpose}
                  onChange={(e) => update("funding_purpose", e.target.value)}
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelClass}>About how much capital are you looking for?</span>
                <select
                  id="funding_amount"
                  name="funding_amount"
                  required
                  value={form.funding_amount}
                  onChange={(e) => update("funding_amount", e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {FUNDING_AMOUNT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Name</span>
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Business name</span>
                  <input
                    id="business_name"
                    name="business_name"
                    required
                    type="text"
                    value={form.business_name}
                    onChange={(e) => update("business_name", e.target.value)}
                    className={inputClass}
                  />
                </label>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Email</span>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Phone</span>
                  <input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-full bg-[#f97316] py-3 text-sm font-bold text-white transition-colors hover:bg-[#ea6c0a]"
              >
                Let&apos;s Talk →
              </button>

              <p className="text-center text-[11px] leading-relaxed text-slate-400">
                FreeSites Funding does not make loans and does not guarantee approval or financing terms.
              </p>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
