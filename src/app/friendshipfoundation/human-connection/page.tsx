import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./human-connection.css";

export const metadata: Metadata = {
  title: "Human Connection | Friendship Foundation",
  description:
    "Friendship Foundation — an editorial, people-first homepage direction centered on dignity, community, and human connection.",
};

const walkBeside = [
  {
    n: "01",
    title: "Facing Homelessness",
    copy: "We support pathways to safe, stable housing and the independence that comes with a place to call home.",
  },
  {
    n: "02",
    title: "In Recovery",
    copy: "We stand alongside people working toward sustained recovery from addiction, without judgment and without labels.",
  },
  {
    n: "03",
    title: "Building Wellness",
    copy: "We support mental health and wellness services that create real, lasting pathways to stability.",
  },
];

const support = [
  {
    title: "Opportunity",
    copy: "Education, employment, and independence programs that open doors.",
  },
  {
    title: "Wellness",
    copy: "Physical health, mental health, and community integration support.",
  },
  {
    title: "Stability",
    copy: "Housing, food security, and the fundamentals of daily life.",
  },
];

const ways = [
  {
    title: "Give",
    copy: "A financial gift supports programs and services across Western New York.",
    cta: "Donate",
    href: "#donate",
  },
  {
    title: "Volunteer",
    copy: "Contribute your time and skills to the mission of recovery and renewal.",
    cta: "Learn more",
    href: "#footer",
  },
  {
    title: "Share",
    copy: "Tell someone about Friendship Foundation and the work happening here.",
    cta: "Learn more",
    href: "#footer",
  },
];

export default function HumanConnectionPage() {
  return (
    <div className="hc-page">
      <header className="hc-header">
        <div className="hc-header-inner">
          <Link href="/friendshipfoundation/human-connection" className="hc-mark" aria-label="Friendship Foundation home">
            <Image src="/friendship-foundation-logo.jpg" alt="Friendship Foundation, Inc." width={44} height={27} priority />
            <span>Friendship Foundation</span>
          </Link>
          <nav className="hc-nav" aria-label="Primary navigation">
            <a href="#mission">Our Mission</a>
            <a href="#walk-beside">Who We Help</a>
            <a href="#community">Community</a>
            <a href="#donate">Donate</a>
          </nav>
          <a className="hc-donate-pill" href="#donate">Donate</a>
        </div>
      </header>

      <main>
        <section className="hc-hero">
          <div className="hc-hero-copy">
            <p className="hc-eyebrow">Friendship Foundation</p>
            <h1>A New Path to a New Beginning</h1>
            <p className="hc-hero-lede">
              Friendship Foundation sees the person, not the problem. We walk
              alongside people in Western New York facing homelessness, addiction,
              and mental illness as they rebuild their lives with dignity and purpose.
            </p>
            <div className="hc-hero-actions">
              <a className="hc-button hc-button-primary" href="#donate">Donate</a>
              <a className="hc-button hc-button-text" href="#mission">Read our story <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="hc-hero-frame">
            <div className="hc-photo-placeholder hc-photo-tall">
              <span>Photography placeholder<br />pending approved imagery</span>
            </div>
          </div>
        </section>

        <section className="hc-pullquote" id="mission">
          <span className="hc-quote-mark" aria-hidden="true">&ldquo;</span>
          <p>
            Our mission is to help those who have lost their way find a new path
            to a new beginning.
          </p>
          <span className="hc-rule" aria-hidden="true" />
          <p className="hc-pullquote-body">
            We believe in the potential of every individual to contribute to a
            better world &mdash; to embrace their identity, define their future, and
            create positive change in their communities.
          </p>
        </section>

        <section className="hc-walk" id="walk-beside">
          <p className="hc-eyebrow hc-eyebrow-center">Who We Walk Beside</p>
          <h2 className="hc-section-title hc-center">People, Not Problems</h2>
          {walkBeside.map((item, i) => (
            <div className={`hc-walk-row ${i % 2 === 1 ? "hc-walk-row-reverse" : ""}`} key={item.n}>
              <div className="hc-photo-placeholder hc-photo-wide">
                <span>Photography placeholder<br />pending approved imagery</span>
              </div>
              <div className="hc-walk-text">
                <span className="hc-walk-n">{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="hc-support">
          <p className="hc-eyebrow">What We Support</p>
          <h2 className="hc-section-title">Programs That Open Pathways</h2>
          <div className="hc-support-list">
            {support.map((item) => (
              <div className="hc-support-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hc-community" id="community">
          <div className="hc-community-photo">
            <div className="hc-photo-placeholder hc-photo-square">
              <span>Photography placeholder<br />pending approved imagery</span>
            </div>
          </div>
          <div className="hc-community-copy">
            <p className="hc-eyebrow">Community &amp; Connection</p>
            <h2 className="hc-section-title">You Are Not Alone</h2>
            <p>
              Lasting change happens within community. Friendship Foundation
              fosters belonging, mutual support, and advocacy for the dignity and
              potential of every person we walk alongside.
            </p>
          </div>
        </section>

        <section className="hc-impact">
          <p className="hc-eyebrow hc-eyebrow-center">Our Impact</p>
          <h2 className="hc-section-title hc-center">Building Toward Measurable Change</h2>
          <div className="hc-impact-row">
            <div className="hc-impact-stat"><span>&mdash;</span><p>Program outcomes<br />data pending</p></div>
            <div className="hc-impact-stat"><span>&mdash;</span><p>Individuals served<br />data pending</p></div>
            <div className="hc-impact-stat"><span>&mdash;</span><p>Years of service<br />data pending</p></div>
          </div>
          <small className="hc-impact-note">Placeholder &mdash; figures to be added once verified program data is available.</small>
        </section>

        <section className="hc-donate-band" id="donate">
          <p className="hc-eyebrow hc-eyebrow-invert">Together, We Create New Beginnings</p>
          <h2>Help Someone Find a New Beginning</h2>
          <p className="hc-donate-copy">
            Your gift supports programs that create opportunity for dignity,
            stability, wellness, recovery, and a new beginning.
          </p>
          <a className="hc-button hc-button-invert" href="#footer">Donate Now</a>
        </section>

        <section className="hc-ways">
          <p className="hc-eyebrow hc-eyebrow-center">Ways to Help</p>
          <h2 className="hc-section-title hc-center">Support This Work</h2>
          <div className="hc-ways-list">
            {ways.map((item) => (
              <div className="hc-ways-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a href={item.href}>{item.cta} <span aria-hidden="true">→</span></a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="hc-footer" id="footer">
        <div className="hc-footer-brand">
          <Image src="/friendship-foundation-logo.jpg" alt="Friendship Foundation, Inc." width={150} height={91} />
          <strong>Friendship Foundation, Inc.</strong>
          <span>Partners for Recovery</span>
          <small>Serving Western New York</small>
        </div>
        <div>
          <h4>Contact</h4>
          <p>66 Englewood Avenue<br />Buffalo, NY 14214-1235<br />(716) 515-8242<br />ffibflo@gmail.com</p>
          <strong className="hc-verify">VERIFY BEFORE LAUNCH</strong>
        </div>
        <div>
          <h4>Get Involved</h4>
          <a href="#donate">Donate</a>
          <a href="#footer">Volunteer</a>
          <a href="#community">Advocate</a>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="#mission">Our Mission</a>
          <a href="#walk-beside">Who We Help</a>
          <a href="#donate">Donate</a>
        </div>
        <p className="hc-footer-bottom">
          Made with ❤️ by <Link href="https://freesites.com">FreeSites</Link>
        </p>
      </footer>
    </div>
  );
}
