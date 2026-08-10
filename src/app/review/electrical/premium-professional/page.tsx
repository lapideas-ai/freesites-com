import { OwnerReviewLayout } from "@/components/smartsite/shared/OwnerReviewLayout";

export default function PremiumProfessionalReviewPage() {
  return (
    <OwnerReviewLayout
      title="Electrical · Premium Professional"
      subtitle="Consultative and restrained: for the homeowner choosing a higher price point and expecting visual proof it's justified."
      previewPath="/preview/electrical/premium-professional"
      notes={[
        {
          title: "Restrained graphite + warm gold, generous whitespace",
          rationale:
            "A homeowner paying a premium wants visual confirmation they're not just getting the same site with different words. Low-saturation gold instead of a bright accent, and more breathing room per section, reads as considered rather than urgent — deliberately the opposite instinct from Fast Response.",
        },
        {
          title: "\"Schedule a Consultation\" instead of \"Get a Fast Quote\"",
          rationale:
            "\"Quote\" language frames the interaction as a price comparison, which undersells a premium position before the conversation even starts. \"Consultation\" sets a higher-touch, less commoditized expectation from the first click.",
        },
        {
          title: "Credentials over cost reassurance",
          rationale:
            "\"Master Electrician Certified\" and \"white-glove service standard\" replace the financing/overtime-rate claims used in the other two styles. A premium-position visitor is optimizing for quality assurance, not cost anxiety — leading with price reassurance here would work against the positioning.",
        },
        {
          title: "Contact copy asks to \"discuss your electrical,\" not \"tell us what's wrong\"",
          rationale:
            "\"What's wrong\" frames the homeowner as having a problem to triage — appropriate for Fast Response, wrong here. A consultative opening matches how a homeowner expects to be engaged when they're choosing the higher end of the market.",
        },
        {
          title: "Light-weight Spectral serif instead of a bold display face",
          rationale:
            "Bold, heavy type reads as urgent or industrial (right for Fast Response, wrong here). A lighter-weight, higher-contrast serif is a well-established visual shorthand for refinement — it does real positioning work before a single word is read.",
        },
      ]}
    />
  );
}
