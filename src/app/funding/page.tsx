"use client";

import { useState } from "react";
import { inter } from "@/components/homepage/fonts";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ActiveTradeProvider } from "@/lib/homepage-active-trade-context";
import { trades } from "@/lib/trades";

// V1 validation page for FreeSites Funding — introduces the concept and
// captures qualified lead interest. Deliberately NOT a lending product:
// no underwriting, no lender integrations, no payment functionality.
//
// NO BACKEND IS WIRED YET. handleSubmit below only sets local UI state —
// nothing is sent over the network or stored anywhere. Field names/ids on
// every input are stable (snake_case, matching common CRM custom-field
// conventions) specifically so a real destination (a Netlify function
// forwarding to a GoHighLevel webhook, a Kit API call, etc.) can be wired
// in later by replacing the body of handleSubmit — no redesign needed.
// Do not present this page as capturing real leads until that's done.

const YEARS_IN_BUSINESS_OPTIONS = ["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "10+ years"];

const ANNUAL_REVENUE_OPTIONS = ["Under $250K", "$250K–$500K", "$500K–$1M", "$1M–$3M", "$3M+"];

const FUNDING_AMOUNT_OPTIONS = [
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000–$250,000",
  "$250,000+",
];

const FUNDING_USE_OPTIONS = [
  "Equipment",
  "Vehicle(s)",
  "Marketing",
  "Hiring",
  "Working Capital",
  "Expansion / New Location",
  "Acquire Another Business",
  "Other",
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
  "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR",
  "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

type FundingLeadForm = {
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  phone: string;
  trade: string;
  city: string;
  state: string;
  years_in_business: string;
  annual_revenue: string;
  funding_amount: string;
  funding_use: string[];
  goal_notes: string;
};

const emptyForm: FundingLeadForm = {
  first_name: "",
  last_name: "",
  business_name: "",
  email: "",
  phone: "",
  trade: "",
  city: "",
  state: "",
  years_in_business: "",
  annual_revenue: "",
  funding_amount: "",
  funding_use: [],
  goal_notes: "",
};

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-[#1a2f4a] outline-none focus:border-orange-300";
const labelClass = "text-[13px] font-semibold text-[#1a2f4a]";

export default function FundingPage() {
  const [form, setForm] = useState<FundingLeadForm>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [fundingUseError, setFundingUseError] = useState(false);

  function update<K extends keyof FundingLeadForm>(key: K, value: FundingLeadForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFundingUse(option: string) {
    setFundingUseError(false);
    setForm((prev) => ({
      ...prev,
      funding_use: prev.funding_use.includes(option)
        ? prev.funding_use.filter((v) => v !== option)
        : [...prev.funding_use, option],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.funding_use.length === 0) {
      setFundingUseError(true);
      return;
    }
    // No backend wired yet — see the file header comment. `form` is a
    // ready-to-send payload once a real destination exists.
    setSubmitted(true);
  }

  return (
    <div className={inter.className}>
      <ActiveTradeProvider>
        <Header />
      </ActiveTradeProvider>

      <main>
        <section className="bg-[#f8fafc]">
          <div className="mx-auto max-w-3xl px-6 py-12 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#ea6c0a]">FreeSites Funding</span>
            <h1 className="mt-1.5 text-2xl font-black leading-tight tracking-tight text-[#1a2f4a] sm:text-3xl">
              Funding to Grow Your Home Service Business
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-slate-600">
              Already have customers and a business that works? Let&apos;s help you grow it.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-slate-600">
              FreeSites Funding helps home-service business owners explore financing for opportunities such as:
            </p>
            <p className="mt-2 text-[13px] font-bold text-[#1a2f4a]">
              Equipment • Vehicles • Marketing • Hiring • Working Capital • Business Acquisitions
            </p>

            <p className="mx-auto mt-6 max-w-xl text-[13px] leading-relaxed text-slate-500">
              FreeSites started with something simple: giving home-service businesses a professional website and
              the tools to respond to every customer, fast. As we&apos;ve talked with contractors, we&apos;ve heard
              the same thing again and again — a great website helps you win the next customer, but growing
              further often means new equipment, another vehicle, more marketing, or the working capital to take
              on bigger jobs. FreeSites is being built to help with that next stage too — not by making loans
              ourselves, but by helping you explore financing options and get the conversation started.
            </p>

            <a
              href="#funding-form"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-5 py-3 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea6c0a] hover:shadow-md"
            >
              Tell Us What You Want to Fund →
            </a>
          </div>
        </section>

        <section id="funding-form" className="bg-white py-12">
          <div className="mx-auto max-w-2xl px-6">
            {submitted ? (
              <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-8 text-center">
                <div className="text-lg font-bold text-[#1a2f4a]">Thanks — we&apos;ve got it.</div>
                <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-slate-600">
                  A member of the FreeSites team will follow up personally to learn more about your business and
                  what you&apos;re looking to fund.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1a2f4a]">Tell us about you and your business</h2>
                  <p className="mt-1 text-[12px] text-slate-500">
                    A few details so we can understand your business and follow up with the right options.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>First name</span>
                    <input
                      id="first_name"
                      name="first_name"
                      required
                      type="text"
                      value={form.first_name}
                      onChange={(e) => update("first_name", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Last name</span>
                    <input
                      id="last_name"
                      name="last_name"
                      required
                      type="text"
                      value={form.last_name}
                      onChange={(e) => update("last_name", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                </div>

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

                <div className="grid gap-4 sm:grid-cols-2">
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
                    <span className={labelClass}>Mobile phone</span>
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

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Trade / type of home-service business</span>
                  <select
                    id="trade"
                    name="trade"
                    required
                    value={form.trade}
                    onChange={(e) => update("trade", e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select your trade
                    </option>
                    {trades.map((trade) => (
                      <option key={trade.slug} value={trade.slug}>
                        {trade.name}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>City</span>
                    <input
                      id="city"
                      name="city"
                      required
                      type="text"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>State</span>
                    <select
                      id="state"
                      name="state"
                      required
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select state
                      </option>
                      {US_STATES.map((abbr) => (
                        <option key={abbr} value={abbr}>
                          {abbr}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Years in business</span>
                    <select
                      id="years_in_business"
                      name="years_in_business"
                      required
                      value={form.years_in_business}
                      onChange={(e) => update("years_in_business", e.target.value)}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {YEARS_IN_BUSINESS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Approximate annual revenue</span>
                    <select
                      id="annual_revenue"
                      name="annual_revenue"
                      required
                      value={form.annual_revenue}
                      onChange={(e) => update("annual_revenue", e.target.value)}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {ANNUAL_REVENUE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Approximate amount of funding wanted</span>
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

                <div>
                  <span className={labelClass}>What would you use the funding for?</span>
                  <p className="mt-1 text-[11px] text-slate-400">Select all that apply.</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {FUNDING_USE_OPTIONS.map((option) => {
                      const checked = form.funding_use.includes(option);
                      return (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors ${
                            checked
                              ? "border-[#f97316] bg-[#fff7ed] text-[#1a2f4a]"
                              : "border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            name="funding_use"
                            value={option}
                            checked={checked}
                            onChange={() => toggleFundingUse(option)}
                            className="sr-only"
                          />
                          {option}
                        </label>
                      );
                    })}
                  </div>
                  {fundingUseError && (
                    <p className="mt-1.5 text-[12px] font-medium text-red-600">Select at least one option.</p>
                  )}
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>
                    Tell us briefly what you&apos;re looking to accomplish{" "}
                    <span className="font-normal text-slate-400">(optional)</span>
                  </span>
                  <textarea
                    id="goal_notes"
                    name="goal_notes"
                    rows={3}
                    value={form.goal_notes}
                    onChange={(e) => update("goal_notes", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-[#f97316] py-3 text-sm font-bold text-white transition-colors hover:bg-[#ea6c0a]"
                >
                  Submit
                </button>

                <p className="text-center text-[11px] leading-relaxed text-slate-400">
                  FreeSites Funding helps connect you with financing options and partners suited to your goals.
                  FreeSites does not make loans and does not guarantee approval or financing terms.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
