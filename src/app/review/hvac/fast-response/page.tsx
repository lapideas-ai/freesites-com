import { OwnerReviewLayout } from "@/components/smartsite/shared/OwnerReviewLayout";

export default function FastResponseReviewPage() {
  return (
    <OwnerReviewLayout
      title="HVAC · Fast Response"
      subtitle="Urgency-forward: for the homeowner who's mid-emergency and deciding, right now, who to call."
      previewPath="/preview/hvac/fast-response"
      notes={[
        {
          title: "Call button never leaves the header",
          rationale:
            "Someone with a broken AC in July isn't reading a page top to bottom — they're scanning for the phone number. Keeping it sticky removes the single biggest friction point: making an urgent visitor scroll to act.",
        },
        {
          title: "Dark, high-contrast \"dispatch board\" hero",
          rationale:
            "A homeowner in a comfort emergency responds to confidence, not cheerfulness. The bold Anton headline and dark ground read as competent and immediate rather than decorative.",
        },
        {
          title: "Response-time and rating stats sit directly under the hero",
          rationale:
            "Every urgency-focused site claims to be fast. Putting the actual number (47 min) in front of the visitor before asking for anything answers the \"is this real or marketing copy\" skepticism immediately.",
        },
        {
          title: "Two CTAs, not one",
          rationale:
            "\"Call\" captures the visitor ready to act now; \"Get a Fast Quote\" captures the one still comparing options. A single CTA optimized for urgency loses the second visitor entirely.",
        },
        {
          title: "SmartReply badge sits inside the contact form, not just the footer",
          rationale:
            "Form abandonment on contractor sites is often driven by \"will anyone actually see this.\" Naming the instant-reply system right next to the form the visitor is about to fill out directly addresses that doubt at the moment it matters.",
        },
        {
          title: "Communication ladder frames Pro and Growth as reach, not features",
          rationale:
            "The upsell pitch isn't a feature list — it's \"more ways to never miss a customer.\" Pro lights up Email through Booking (SmartReply SMS/Voice plus scheduling — the first paid communication platform); Growth adds Follow-Up on top. That matches why a Fast-Response-positioned business upgrades in the first place: fear of a missed call, not curiosity about SMS as a feature.",
        },
      ]}
    />
  );
}
