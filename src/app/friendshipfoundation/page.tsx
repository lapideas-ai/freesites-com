import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DesignReviewGallery from "./DesignReviewGallery";

export const metadata: Metadata = {
  title: "Friendship Foundation — Custom Website Design Review",
  description:
    "Three custom homepage design directions for Friendship Foundation, presented by FreeSites.",
  robots: { index: false, follow: false },
};

const designs = [
  {
    key: "hopeful-journey",
    label: "Design A",
    name: "Hopeful Journey",
    href: "/friendshipfoundation/serenity",
    rationale:
      "A warm, atmospheric homepage built around the light-and-path imagery already present in the Friendship Foundation mark. One continuous visual journey — sunrise hero, mission, community, and a dedicated giving moment — designed to feel hopeful while remaining a credible Western New York nonprofit.",
    desktop: "/design-review/hopeful-journey-desktop.png",
    mobile: "/design-review/hopeful-journey-mobile.png",
  },
  {
    key: "human-connection",
    label: "Design B",
    name: "Human Connection",
    href: "/friendshipfoundation/human-connection",
    rationale:
      "An editorial, people-first homepage that reads like a considered magazine feature rather than a typical nonprofit template. Warm paper tones, refined serif typography, and alternating photo-and-story rows keep the people Friendship Foundation walks alongside at the center of every section.",
    desktop: "/design-review/human-connection-desktop.png",
    mobile: "/design-review/human-connection-mobile.png",
  },
  {
    key: "modern-impact",
    label: "Design C",
    name: "Modern Impact",
    href: "/friendshipfoundation/modern-impact",
    rationale:
      "A bold, contemporary homepage built from Friendship Foundation's own brand colors — blue, aqua, green, and gold — arranged in a confident, asymmetric grid. Energetic and optimistic while keeping impact and giving as the most visually prominent elements on the page.",
    desktop: "/design-review/modern-impact-desktop.png",
    mobile: "/design-review/modern-impact-mobile.png",
  },
];

export default function DesignReviewPage() {
  return (
    <div className="rev-page">
      <header className="rev-hero">
        <div className="rev-hero-brand">
          <Image src="/friendship-foundation-logo.jpg" alt="Friendship Foundation, Inc." width={120} height={73} />
        </div>
        <p className="rev-hero-eyebrow">Friendship Foundation</p>
        <h1>Custom Website Design Review</h1>
        <p className="rev-hero-presented">Presented by FreeSites</p>
      </header>

      <DesignReviewGallery designs={designs} />

      <footer className="rev-footer">
        <p>Questions or feedback on any of these directions? Reach out any time.</p>
        <p className="rev-footer-attribution">
          Made with ❤️ by <Link href="https://freesites.com">FreeSites</Link>
        </p>
      </footer>
    </div>
  );
}
