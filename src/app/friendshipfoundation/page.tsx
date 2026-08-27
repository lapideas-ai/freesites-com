import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WebsitePreview from "./WebsitePreview";

export const metadata: Metadata = {
  title: "Friendship Foundation — Your Custom Website",
  description: "Friendship Foundation's custom website, built by FreeSites.",
  robots: { index: false, follow: false },
};

const included = [
  "Custom Friendship Foundation design",
  "Desktop + mobile responsive experience",
  "Friendship Foundation branding",
  "Custom hero imagery",
  "Donation-ready architecture",
  "Contact-ready architecture",
  "Search-friendly website foundation",
  "Domain-ready deployment",
  "FreeSites hosting/support available",
];

const contactChannels = [
  { icon: "✉", label: "Email" },
  { icon: "📝", label: "Contact Form" },
  { icon: "💬", label: "SMS" },
  { icon: "☎", label: "Phone" },
  { icon: "🎙", label: "SmartReply Voice Receptionist" },
];

export default function DesignReviewPage() {
  return (
    <div className="rev-page">
      <header className="rev-hero">
        <div className="rev-hero-brand">
          <Image src="/friendship-foundation-logo.jpg" alt="Friendship Foundation, Inc." width={120} height={73} />
        </div>
        <p className="rev-hero-eyebrow">Friendship Foundation</p>
        <h1>Your $5,000 Custom Website Design</h1>
        <p className="rev-hero-presented">Presented by FreeSites</p>

        <p className="rev-hero-statement">
          We didn&rsquo;t make you a proposal.<br />We built the website.
        </p>

        <div className="rev-value-strip">
          <div>
            <span>$5,000+</span>
            <p>Custom Website Value</p>
          </div>
          <div>
            <span>$0</span>
            <p>Upfront Design Cost</p>
          </div>
        </div>

        <p className="rev-hero-risk">No templates. No upfront design fee. No risk.</p>
        <p className="rev-hero-tagline">We build first. You decide what it&rsquo;s worth.</p>
      </header>

      <section className="rev-designs">
        <div className="rev-design">
          <div className="rev-design-heading">
            <p className="rev-design-label">Your Website</p>
            <h2>Hopeful Journey</h2>
            <p className="rev-design-rationale">
              A warm, atmospheric homepage built around the light-and-path imagery
              already present in the Friendship Foundation mark &mdash; a real, working
              website, fully responsive on desktop and mobile.
            </p>
          </div>

          <WebsitePreview
            desktopSrc="/design-review/hopeful-journey-desktop.png"
            mobileSrc="/design-review/hopeful-journey-mobile.png"
            siteHref="/friendshipfoundation/serenity"
          />
        </div>
      </section>

      <section className="rev-included">
        <h2>What We Built</h2>
        <ul className="rev-included-list">
          {included.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✓</span> {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rev-smartreply">
        <p className="rev-smartreply-eyebrow">FreeSites Capability Demo</p>
        <h2>Your Website Can Answer the Phone, Too.</h2>
        <p className="rev-smartreply-see">See SmartReply Work &mdash; Right Now</p>
        <p className="rev-smartreply-body">
          Friendship Foundation currently has an opportunity to provide a much
          better communications experience for supporters, donors, volunteers,
          and people looking for help. SmartReply Voice + SMS can respond 24/7 &mdash;
          after hours, on weekends, or whenever nobody is available. Nobody
          asking for help should reach a dead end.
        </p>
        <a className="rev-smartreply-call" href="tel:+17163175111">
          <span aria-hidden="true">☎</span> Call the Live FreeSites AI Demo — (716) 317-5111
        </a>
        <p className="rev-smartreply-note">
          This is a live demonstration of a FreeSites capability &mdash; optional, and
          not yet purchased or activated for Friendship Foundation.
        </p>
      </section>

      <section className="rev-contact">
        <h2>Ready to Connect</h2>
        <p className="rev-contact-intro">
          The architecture for every channel below is already built into your
          website. Final contact details will be connected as soon as they&rsquo;re
          confirmed with Friendship Foundation.
        </p>
        <div className="rev-contact-channels">
          {contactChannels.map((c) => (
            <div className="rev-contact-channel" key={c.label}>
              <span aria-hidden="true">{c.icon}</span>
              <p>{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="rev-footer">
        <p>Questions or feedback? Reach out any time.</p>
        <p className="rev-footer-attribution">
          Made with ❤️ by <Link href="https://www.freesites.com/">FreeSites</Link>
        </p>
      </footer>
    </div>
  );
}
