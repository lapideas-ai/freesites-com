"use client";

import { useState } from "react";

const starterPrompt = `Build a professional website for my business that looks like it was custom-designed by a top agency rather than generated from a template. Before building it, understand/research my business, customers, competitors and industry. Determine the primary action I want visitors to take. Create the positioning, copy, visual direction, navigation and mobile experience around that goal. My business is: [BUSINESS / WEBSITE / DESCRIPTION].`;

const tools = [
  ["ChatGPT", "https://chatgpt.com/"],
  ["Grok", "https://grok.com/"],
  ["Gemini", "https://gemini.google.com/"],
  ["Claude", "https://claude.ai/"],
  ["Whop", "https://whop.com/"],
] as const;

export default function DiyClient() {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(starterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="funnel-page">
      <div className="funnel-shell">
        <header className="funnel-nav">
          <a className="funnel-wordmark" href="/"><span>Free</span>Sites</a>
          <a href="/start">Choose another path</a>
        </header>

        <section className="funnel-hero">
          <p className="funnel-kicker">BUILD IT YOURSELF — FREE</p>
          <h1>Your FREE website <i>starter kit.</i></h1>
          <p>Start with one useful prompt, try the leading AI options, then use the domain and launch essentials below to turn the first draft into something real.</p>
        </section>

        <section className="funnel-section">
          <p className="funnel-kicker">01 / YOUR STARTER PROMPT</p>
          <h2>One powerful FREE prompt.</h2>
          <div className="prompt-box">
            <p>“{starterPrompt}”</p>
            <button type="button" onClick={copyPrompt}>{copied ? "COPIED ✓" : "COPY PROMPT"}</button>
          </div>
        </section>

        <section className="funnel-section">
          <p className="funnel-kicker">02 / LEADING AI OPTIONS</p>
          <h2>Pick a tool and start.</h2>
          <p>FreeSites is platform-agnostic. These tools change quickly, so use whichever one gives you the strongest result for your business.</p>
          <div className="tool-list">
            {tools.map(([name, href]) => (
              <a className="tool-link" href={href} target="_blank" rel="noreferrer" key={name}>
                <span>{name}</span><span>Try it →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="funnel-section">
          <p className="funnel-kicker">03 / FREE DOMAIN GUIDE</p>
          <h2>Don’t let the domain stop the build.</h2>
          <h3>Use the domain you already own.</h3>
          <p>If you already have a good domain, keep moving. A new AI-built website does not require a new domain.</p>
          <h3>If you need one, favor clarity.</h3>
          <p>A short, easy-to-say name that matches your business usually beats a clever name people cannot remember or spell. A .com remains a strong default when it is reasonably available, but the perfect domain is less important than launching a useful site.</p>
          <h3>Keep ownership in your name.</h3>
          <p>Register the domain in an account you control. Your domain is a business asset. Do not let a designer, agency or builder become the only party with access.</p>
        </section>

        <section className="funnel-section">
          <p className="funnel-kicker">04 / FREE LAUNCH CHECKLIST</p>
          <h2>Before you call it live.</h2>
          <ul>
            <li>Confirm the main action you want visitors to take.</li>
            <li>Check every page and button on desktop and mobile.</li>
            <li>Test forms, email delivery, phone links, booking and payments.</li>
            <li>Connect your own domain and confirm HTTPS works.</li>
            <li>Add a clear contact method plus Privacy and Terms pages where appropriate.</li>
            <li>Check page titles, descriptions and the wording that appears when the site is shared.</li>
            <li>Ask someone unfamiliar with the business what the site offers and what they should do next.</li>
          </ul>
        </section>

        <section className="funnel-cta">
          <p className="funnel-kicker">DON’T LOVE WHAT AI BUILT?</p>
          <h2>Have FreeSites take a shot — FREE.</h2>
          <p>Tell us about your business or organization. If we select the project, we’ll design and show you what we create before you pay anything.</p>
          <a className="funnel-button" href="/build-mine">HAVE FREESITES BUILD IT FREE →</a>
        </section>

        <footer className="funnel-footer">
          Third-party tools have their own terms, pricing and limitations. <a href="/affiliate-disclosure">Affiliate Disclosure</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
        </footer>
      </div>
    </main>
  );
}
