import { OwnerReviewLayout } from "@/components/smartsite/shared/OwnerReviewLayout";

export default function TrustedLocalReviewPage() {
  return (
    <OwnerReviewLayout
      title="Electrical · Trusted Local"
      subtitle="Relationship-forward: for the homeowner who wants a name they recognize, not the fastest dispatch."
      previewPath="/preview/electrical/trusted-local"
      notes={[
        {
          title: "Warm amber + denim-blue palette, serif display face",
          rationale:
            "This isn't an emergency-dispatch visitor — it's someone picking an electrician the way they'd pick a family doctor. The warmer, less urgent palette and Bitter serif signal establishment rather than speed, matching that decision mode.",
        },
        {
          title: "Hero leads with tenure and neighborhood before any service claim",
          rationale:
            "\"Family-owned, serving Crestwood since 2013\" is the whole pitch before the headline even finishes. Trust-based conversion runs on social proof and longevity first — leading with a service list here would undercut the positioning.",
        },
        {
          title: "Trust strip reordered to lead with years-in-business and rating",
          rationale:
            "The same four facts as Fast Response, but response time drops from first to third. What a trust-motivated visitor wants confirmed first is \"is this an established, well-regarded business,\" not \"how fast can they get here.\"",
        },
        {
          title: "Second About highlight is \"Family-owned & operated,\" not \"no overtime charges\"",
          rationale:
            "Fast Response leads with a logistics/price reassurance because its visitor is worried about being taken advantage of during a hazard. Trusted Local's visitor isn't in crisis — a relationship claim lands harder than a pricing one here.",
        },
        {
          title: "Secondary CTA points to Reviews, not Contact",
          rationale:
            "A skeptical-but-not-urgent visitor wants to verify the electrician's reputation before committing to a call. Sending that click to social proof rather than a form respects where they actually are in the decision, instead of forcing the ask too early.",
        },
      ]}
    />
  );
}
