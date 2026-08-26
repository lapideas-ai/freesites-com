import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./serenity.css";

export const metadata: Metadata = {
  title: "Hopeful Journey | Friendship Foundation",
  description:
    "Friendship Foundation — a path toward possibility, stability, recovery, and a new beginning.",
};

const heroImage = "/ff-path-forward-hero-clean.png";

const peopleCards = [
  {
    title: "Housing & Stability",
    copy: "Supporting pathways to safe housing, stable living, and independent futures.",
    icon: "⌂",
    className: "hj-card-home",
  },
  {
    title: "Recovery & Wellness",
    copy: "Empowering individuals seeking wellness and sustainable paths to recovery.",
    icon: "♡",
    className: "hj-card-recovery",
  },
  {
    title: "Mental Health & Support",
    copy: "Fostering emotional stability and renewed hope through compassionate support.",
    icon: "◯",
    className: "hj-card-mind",
  },
];

const pathway = [
  ["STABILITY", "A safe place to begin again.", "⌂"],
  ["WELLNESS", "Support for mind, body, and spirit.", "♡"],
  ["INDEPENDENCE", "Building skills and confidence for life.", "◯"],
  ["RENEWED PURPOSE", "A future filled with hope, dignity, and possibility.", "☼"],
];

export default function HopefulJourneyPage() {
  return (
    <div className="hj-site">
      <header className="hj-header">
        <Link href="/friendshipfoundation/serenity" className="hj-header-logo" aria-label="Friendship Foundation home">
          <Image src="/friendship-foundation-logo.jpg" alt="Friendship Foundation, Inc. Partners for Recovery" width={260} height={160} priority />
        </Link>
        <nav className="hj-nav" aria-label="Primary navigation">
          <a href="#mission">Our Mission</a>
          <a href="#walk-with">Who We Help</a>
          <a href="#impact">Our Impact</a>
          <a href="#ways">Get Involved</a>
          <a href="#footer">Resources</a>
          <a href="#footer">About Us</a>
        </nav>
        <a className="hj-nav-donate" href="#donate"><span aria-hidden="true">♡</span> DONATE</a>
      </header>

      <main>
          <section className="hj-hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hj-hero-veil" aria-hidden="true" />
          <div className="hj-hero-copy">
            <p className="hj-eyebrow">FRIENDSHIP FOUNDATION</p>
            <h1>There Is a<br />Path Forward</h1>
            <p>When people have lost their way, Friendship Foundation helps create a path toward possibility, stability, recovery, and a new beginning.</p>
            <div className="hj-hero-actions">
              <a className="hj-button hj-button-gold" href="#donate"><span aria-hidden="true">♡</span> DONATE</a>
              <a className="hj-button hj-button-outline" href="#mission">OUR MISSION</a>
            </div>
          </div>
          <div className="hj-hero-curve" aria-hidden="true" />
        </section>

        <section className="hj-mission" id="mission">
          <div className="hj-sun" aria-hidden="true" />
          <div className="hj-mission-lead">
            <p className="hj-eyebrow hj-eyebrow-blue">OUR MISSION</p>
            <h2>Help those who have lost their way find a new path to a new beginning.</h2>
          </div>
          <div className="hj-mission-copy">
            <p>At Friendship Foundation, we believe in the potential of every individual to contribute to a better world. We empower people to embrace their identity, define their future, and create positive change in their communities.</p>
            <p>Through support, compassion, and community, we illuminate pathways toward opportunity, possibility, wellness, and recovery.</p>
          </div>
          <div className="hj-values" aria-label="Our values">
            <div><span className="hj-value-icon hj-value-people">♧</span><strong>Dignity</strong><small>Every person is valued.</small></div>
            <div><span className="hj-value-icon hj-value-sun">☼</span><strong>Possibility</strong><small>A better future is possible.</small></div>
            <div><span className="hj-value-icon hj-value-leaf">⌁</span><strong>Recovery</strong><small>Healing and hope are real.</small></div>
          </div>
        </section>

        <section className="hj-walk" id="walk-with">
          <p className="hj-eyebrow hj-eyebrow-blue">WHO WE WALK WITH</p>
          <h2>Who We Walk With</h2>
          <div className="hj-people-grid">
            {peopleCards.map((item) => (
              <article className={`hj-people-card ${item.className}`} key={item.title}>
                <div className="hj-card-photo"><span>Photography placeholder<br />pending approved imagery</span></div>
                <div className="hj-card-copy"><span className="hj-card-icon" aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="hj-pathway" id="path">
          <div className="hj-path-illustration" aria-hidden="true"><span className="hj-path-sun" /><span className="hj-path-road" /></div>
          <div className="hj-path-content">
            <p className="hj-eyebrow hj-eyebrow-blue">A NEW BEGINNING</p>
            <h2>A Path Toward Possibility</h2>
            <div className="hj-path-steps">
              {pathway.map(([title, copy, icon], index) => (
                <div className="hj-step" key={title}><span className="hj-step-icon">{icon}</span><strong>{title}</strong><p>{copy}</p>{index < pathway.length - 1 && <span className="hj-step-arrow" aria-hidden="true">→</span>}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="hj-community" id="community">
          <p className="hj-eyebrow hj-eyebrow-blue">COMMUNITY &amp; CONNECTION</p>
          <h2>You Are Not Alone</h2>
          <div className="hj-community-grid">
            <div className="hj-community-item">
              <span className="hj-value-icon hj-value-people" aria-hidden="true">♧</span>
              <div><strong>Belonging</strong><p>Friendship Foundation fosters connection so people rebuilding their lives feel supported, not isolated.</p></div>
            </div>
            <div className="hj-community-item">
              <span className="hj-value-icon hj-value-sun" aria-hidden="true">☼</span>
              <div><strong>Advocacy</strong><p>We champion the dignity and potential of every person we walk alongside in Western New York.</p></div>
            </div>
          </div>
        </section>

        <section className="hj-impact" id="impact">
          <p className="hj-eyebrow">OUR IMPACT</p>
          <h2>Building Toward Measurable Change</h2>
          <div className="hj-impact-grid">
            <div className="hj-impact-tile"><span className="hj-impact-mark" aria-hidden="true">—</span><p>Program outcomes<br />data pending</p></div>
            <div className="hj-impact-tile"><span className="hj-impact-mark" aria-hidden="true">—</span><p>Individuals served<br />data pending</p></div>
            <div className="hj-impact-tile"><span className="hj-impact-mark" aria-hidden="true">—</span><p>Years of service<br />data pending</p></div>
          </div>
          <small className="hj-impact-note">Placeholder — figures to be added once verified program data is available.</small>
        </section>

        <section className="hj-donate" id="donate">
          <div className="hj-donate-copy"><p className="hj-eyebrow">TOGETHER, WE CREATE NEW BEGINNINGS</p><h2>Help Someone Find a Path Forward</h2><p>Your gift supports programs that create opportunity for dignity, stability, wellness, recovery, and a new beginning. Every contribution matters.</p></div>
          <a className="hj-button hj-button-gold hj-donate-button" href="#footer"><span aria-hidden="true">♡</span> DONATE NOW</a>
          <div className="hj-donate-photo" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
        </section>

        <section className="hj-ways" id="ways">
          <p className="hj-eyebrow hj-eyebrow-blue">WAYS TO HELP</p>
          <h2>Support This Work</h2>
          <div className="hj-ways-grid">
            <div className="hj-ways-card">
              <span className="hj-step-icon" aria-hidden="true">♡</span>
              <h3>Donate</h3>
              <p>Make a financial gift to support programs and services in Western New York.</p>
              <a className="hj-button hj-button-gold" href="#donate">DONATE</a>
            </div>
            <div className="hj-ways-card">
              <span className="hj-step-icon" aria-hidden="true">⌂</span>
              <h3>Volunteer</h3>
              <p>Contribute your time and skills to support our mission of recovery and renewal.</p>
              <a className="hj-button hj-button-outline hj-button-ink" href="#footer">Learn More</a>
            </div>
            <div className="hj-ways-card">
              <span className="hj-step-icon" aria-hidden="true">☼</span>
              <h3>Share</h3>
              <p>Spread the word about Friendship Foundation and the work we do in our community.</p>
              <a className="hj-button hj-button-outline hj-button-ink" href="#footer">Learn More</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="hj-footer" id="footer">
        <div className="hj-footer-brand"><span className="hj-footer-logo-card"><Image src="/friendship-foundation-logo.jpg" alt="Friendship Foundation, Inc." width={230} height={140} /></span><strong>Friendship Foundation, Inc.</strong><span>Partners for Recovery</span><small>Serving Western New York</small></div>
        <div><h3>Contact Us</h3><p>66 Englewood Avenue<br />Buffalo, NY 14214-1235<br />(716) 515-8242<br />ffibflo@gmail.com</p><strong className="hj-verify">VERIFY BEFORE LAUNCH</strong></div>
        <div><h3>Get Involved</h3><a href="#donate">Donate</a><a href="#ways">Volunteer</a><a href="#community">Advocate</a><a href="#ways">Partner With Us</a></div>
        <div><h3>Quick Links</h3><a href="#mission">Our Mission</a><a href="#walk-with">Who We Help</a><a href="#impact">Our Impact</a><a href="#ways">Resources</a></div>
        <div><h3>Follow Us</h3><p className="hj-social">f &nbsp; ◎</p></div>
        <p className="hj-footer-bottom">
          Made with ❤️ by <Link href="https://freesites.com">FreeSites</Link>
        </p>
      </footer>
    </div>
  );
}
