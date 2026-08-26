import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./modern-impact.css";

export const metadata: Metadata = {
  title: "Modern Impact | Friendship Foundation",
  description:
    "Friendship Foundation — a bold, contemporary, impact-oriented homepage direction built on Western New York's own path-forward brand colors.",
};

const support = [
  { title: "Opportunity", copy: "Education, employment, and independence programs.", cls: "mi-block-blue", icon: "◐" },
  { title: "Wellness", copy: "Physical health, mental health, and community integration.", cls: "mi-block-aqua", icon: "♡" },
  { title: "Stability", copy: "Housing, food security, and daily-life fundamentals.", cls: "mi-block-green", icon: "⌂" },
];

const pathway = [
  ["01", "Stability", "A safe place to begin again."],
  ["02", "Wellness", "Support for mind, body, and spirit."],
  ["03", "Independence", "Building skills and confidence for life."],
  ["04", "Renewed Purpose", "A future filled with hope and possibility."],
];

const ways = [
  { title: "Donate", copy: "Fund programs and services across Western New York.", cls: "mi-block-blue", cta: "Donate", href: "#donate" },
  { title: "Volunteer", copy: "Give your time and skills to the mission.", cls: "mi-block-aqua", cta: "Learn more", href: "#footer" },
  { title: "Share", copy: "Spread the word about the work happening here.", cls: "mi-block-green", cta: "Learn more", href: "#footer" },
];

export default function ModernImpactPage() {
  return (
    <div className="mi-page">
      <header className="mi-header">
        <div className="mi-header-inner">
          <Link href="/friendshipfoundation/modern-impact" className="mi-mark" aria-label="Friendship Foundation home">
            <span className="mi-logo-chip">
              <Image src="/friendship-foundation-logo.jpg" alt="Friendship Foundation, Inc." width={40} height={24} priority />
            </span>
          </Link>
          <nav className="mi-nav" aria-label="Primary navigation">
            <a href="#numbers">Our Impact</a>
            <a href="#support">What We Do</a>
            <a href="#path">A Path Forward</a>
            <a href="#ways">Get Involved</a>
          </nav>
          <a className="mi-donate-btn" href="#donate">Donate</a>
        </div>
      </header>

      <main>
        <section className="mi-hero">
          <div className="mi-hero-main mi-block-blue">
            <p className="mi-eyebrow mi-eyebrow-invert">Friendship Foundation</p>
            <h1>A New Path to a New Beginning</h1>
            <p className="mi-hero-lede">
              Empowering individuals facing homelessness, addiction, and mental
              illness to overcome challenges and regain stability across Western
              New York.
            </p>
            <a className="mi-button mi-button-gold" href="#donate">Donate Now</a>
          </div>
          <div className="mi-hero-side">
            <div className="mi-hero-photo mi-block-aqua">
              <div className="mi-photo-placeholder">
                <span>Photography placeholder<br />pending approved imagery</span>
              </div>
            </div>
            <div className="mi-hero-stat mi-block-gold">
              <span>Our Mission</span>
              <p>Illuminating pathways toward opportunity, wellness, and recovery.</p>
            </div>
          </div>
        </section>

        <section className="mi-numbers" id="numbers">
          <p className="mi-eyebrow">By The Numbers</p>
          <h2 className="mi-section-title">Building Toward Measurable Change</h2>
          <div className="mi-numbers-grid">
            <div className="mi-number-tile mi-block-blue"><span>&mdash;</span><p>Program outcomes<br />data pending</p></div>
            <div className="mi-number-tile mi-block-aqua"><span>&mdash;</span><p>Individuals served<br />data pending</p></div>
            <div className="mi-number-tile mi-block-green"><span>&mdash;</span><p>Years of service<br />data pending</p></div>
          </div>
          <small className="mi-numbers-note">Placeholder &mdash; figures to be added once verified program data is available.</small>
        </section>

        <section className="mi-support" id="support">
          <p className="mi-eyebrow">What We Support</p>
          <h2 className="mi-section-title">Programs That Open Doors</h2>
          <div className="mi-support-grid">
            {support.map((item) => (
              <div className={`mi-support-block ${item.cls}`} key={item.title}>
                <span className="mi-support-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mi-path" id="path">
          <div className="mi-path-copy">
            <p className="mi-eyebrow">A Path Forward</p>
            <h2 className="mi-section-title">Four Steps Toward Renewal</h2>
            <div className="mi-path-list">
              {pathway.map(([n, title, copy]) => (
                <div className="mi-path-item" key={n}>
                  <span className="mi-path-n">{n}</span>
                  <div><strong>{title}</strong><p>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mi-path-photo">
            <div className="mi-photo-placeholder mi-block-green">
              <span>Photography placeholder<br />pending approved imagery</span>
            </div>
          </div>
        </section>

        <section className="mi-community">
          <p className="mi-eyebrow mi-eyebrow-invert">Community &amp; Connection</p>
          <h2>You Are Not Alone</h2>
          <p className="mi-community-copy">
            Friendship Foundation fosters belonging, mutual support, and
            advocacy for the dignity and potential of every person we walk
            alongside in Western New York.
          </p>
        </section>

        <section className="mi-donate" id="donate">
          <p className="mi-eyebrow">Together, We Create New Beginnings</p>
          <h2>Help Someone Find a Path Forward</h2>
          <p>Every contribution creates opportunity for dignity, stability, wellness, and recovery.</p>
          <a className="mi-button mi-button-ink" href="#footer">Donate Now</a>
        </section>

        <section className="mi-ways" id="ways">
          <p className="mi-eyebrow">Ways to Help</p>
          <h2 className="mi-section-title">Support This Work</h2>
          <div className="mi-ways-grid">
            {ways.map((item) => (
              <div className={`mi-ways-block ${item.cls}`} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a className="mi-ways-cta" href={item.href}>{item.cta}</a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mi-footer" id="footer">
        <div className="mi-footer-stripe" aria-hidden="true" />
        <div className="mi-footer-grid">
          <div className="mi-footer-brand">
            <span className="mi-logo-chip mi-logo-chip-lg">
              <Image src="/friendship-foundation-logo.jpg" alt="Friendship Foundation, Inc." width={140} height={85} />
            </span>
            <strong>Friendship Foundation, Inc.</strong>
            <span>Partners for Recovery</span>
          </div>
          <div>
            <h4>Contact</h4>
            <p>66 Englewood Avenue<br />Buffalo, NY 14214-1235<br />(716) 515-8242<br />ffibflo@gmail.com</p>
            <strong className="mi-verify">VERIFY BEFORE LAUNCH</strong>
          </div>
          <div>
            <h4>Get Involved</h4>
            <a href="#donate">Donate</a>
            <a href="#ways">Volunteer</a>
            <a href="#ways">Partner With Us</a>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="#numbers">Our Impact</a>
            <a href="#support">What We Do</a>
            <a href="#path">A Path Forward</a>
          </div>
        </div>
        <p className="mi-footer-bottom">
          Made with ❤️ by <Link href="https://freesites.com">FreeSites</Link>
        </p>
      </footer>
    </div>
  );
}
