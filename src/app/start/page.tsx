import type { Metadata } from "next";
import "../funnel.css";

export const metadata: Metadata = {
  title: "Choose Your FREE Website Path — FreeSites",
  description: "Choose how you want to start: build it yourself free or have FreeSites take a shot free.",
};

export default function StartPage() {
  return (
    <main className="funnel-page">
      <div className="funnel-shell">
        <header className="funnel-nav">
          <a className="funnel-wordmark" href="/"><span>Free</span>Sites</a>
          <a href="/">Back to FreeSites</a>
        </header>

        <section className="funnel-hero">
          <p className="funnel-kicker">YOUR FREE START IS UNLOCKED</p>
          <h1>Choose your kind of <i>FREE.</i></h1>
          <p>Your email is in. Now choose how you want to move forward. You can build it yourself with leading AI tools—or tell FreeSites about your project and let us take a shot.</p>
        </section>

        <section className="funnel-grid" aria-label="Two free website paths">
          <article className="funnel-card">
            <span className="num">PATH 01 / DO IT YOURSELF</span>
            <h2>BUILD IT YOURSELF — <i>FREE</i></h2>
            <p>Get the FreeSites Website Starter Prompt, leading AI options, a practical Domain Guide and a Launch Checklist.</p>
            <ul>
              <li>One powerful starter prompt</li>
              <li>Leading AI website options</li>
              <li>Domain and launch essentials</li>
            </ul>
            <a className="funnel-button" href="/diy">START BUILDING FREE →</a>
          </article>

          <article className="funnel-card dark">
            <span className="num">PATH 02 / DONE FOR YOU</span>
            <h2>HAVE FREESITES BUILD IT — <i>FREE</i></h2>
            <p>Tell us about your business or organization. If we select your project, we’ll design and show you what we create before you pay anything.</p>
            <ul>
              <li>No upfront design fee</li>
              <li>See the idea before paying</li>
              <li>No obligation to continue</li>
            </ul>
            <a className="funnel-button" href="/build-mine">TELL US ABOUT MY PROJECT →</a>
          </article>
        </section>

        <footer className="funnel-footer">
          No credit card. No obligation. <a href="/affiliate-disclosure">Affiliate Disclosure</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
        </footer>
      </div>
    </main>
  );
}
