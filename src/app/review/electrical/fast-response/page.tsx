import { OwnerReviewLayout } from "@/components/smartsite/shared/OwnerReviewLayout";

export default function FastResponseReviewPage() {
  return (
    <OwnerReviewLayout
      title="Electrical · Fast Response"
      subtitle="Urgency-and-safety-forward: for the homeowner who's smelling something burning and deciding, right now, who to call."
      previewPath="/preview/electrical/fast-response"
      notes={[
        {
          title: "Caution-amber signal color instead of red-orange or blue",
          rationale:
            "Amber is the real-world electrical safety color — caution tape, breaker warnings. Reusing HVAC's red-orange here would just be a re-skin; amber does actual positioning work specific to electrical hazard framing.",
        },
        {
          title: "Call button never leaves the header",
          rationale:
            "Someone who just saw a spark isn't reading a page top to bottom — they're scanning for the phone number. Keeping it sticky removes the single biggest friction point: making an urgent visitor scroll to act.",
        },
        {
          title: "FAQ includes a safety-action question, not just a financing question",
          rationale:
            "\"What should I do if I smell burning?\" answers the visitor's most anxious question directly and positions the business as safety-first, not just fast — a real content difference from HVAC/Plumbing's Fast Response, not a copy-paste with nouns swapped.",
        },
        {
          title: "Response-time and rating stats sit directly under the hero",
          rationale:
            "Every urgency-focused site claims to be fast. Putting the actual number (34 min) in front of the visitor before asking for anything answers the \"is this real or marketing copy\" skepticism immediately.",
        },
        {
          title: "SmartReply badge sits inside the contact form, not just the footer",
          rationale:
            "Form abandonment on contractor sites is often driven by \"will anyone actually see this.\" Naming the instant-reply system right next to the form the visitor is about to fill out directly addresses that doubt at the moment it matters.",
        },
        {
          title: "Communication ladder frames Pro and Growth as reach, not features",
          rationale:
            "The upsell pitch isn't a feature list — it's \"more ways to never miss a customer.\" That matches why a Fast-Response-positioned electrician upgrades in the first place: fear of a missed emergency call, not curiosity about SMS as a feature.",
        },
      ]}
    />
  );
}
