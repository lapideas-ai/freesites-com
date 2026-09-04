import type { Metadata } from "next";
import "../funnel.css";

export const metadata: Metadata = {
  title: "Have FreeSites Build It FREE — FreeSites",
  description: "Tell FreeSites about your business or organization and apply for a FREE done-for-you website build.",
};

export default function BuildMinePage() {
  return (
    <main className="funnel-page">
      <div className="funnel-shell">
        <header className="funnel-nav">
          <a className="funnel-wordmark" href="/"><span>Free</span>Sites</a>
          <a href="/start">Choose another path</a>
        </header>

        <section className="funnel-hero">
          <p className="funnel-kicker">DONE FOR YOU — FREE</p>
          <h1>Have FreeSites take a <i>shot.</i></h1>
          <p>Tell us about your business or organization. We selectively choose projects where we think we can create something worth showing you.</p>
        </section>

        <section className="application-grid">
          <article className="application-panel">
            <p className="funnel-kicker">HOW THE FREE BUILD WORKS</p>
            <h2>See the possibility before you pay.</h2>
            <ul>
              <li>You tell us about your business, organization or idea.</li>
              <li>If we select the project, FreeSites designs and builds a website concept.</li>
              <li>We show you what we created before you pay anything.</li>
              <li>If you want help turning it into a working, published site, we can discuss the optional next steps.</li>
            </ul>
            <p><strong>The build is FREE. Our time isn’t.</strong> We therefore cannot accept every project, and a free build creates no obligation to purchase anything.</p>
          </article>

          <article className="application-panel dark">
            <p className="funnel-kicker">TELL US ABOUT YOUR PROJECT</p>
            <h2>Want us to build yours?</h2>
            <p>We’re opening the FreeSites build queue selectively. Send us the business or organization name, current website if you have one, and the result you most want the new site to produce.</p>
            <a className="funnel-button" href="mailto:admin@freesites.com?subject=FreeSites%20FREE%20Build%20Request&body=Business%20or%20organization%3A%0A%0ACurrent%20website%20(if%20any)%3A%0A%0AWhat%20I%20want%20the%20website%20to%20help%20me%20do%3A%0A%0AAnything%20else%20FreeSites%20should%20know%3A">TELL US ABOUT MY PROJECT →</a>
            <p className="small-note">No credit card. No obligation. Selection is not guaranteed.</p>
          </article>
        </section>

        <footer className="funnel-footer">
          Made with ❤️ by <a href="https://www.freesites.com/">FreeSites</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
        </footer>
      </div>
    </main>
  );
}
