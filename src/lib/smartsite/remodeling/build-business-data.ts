import type { BusinessData } from "../types";
import type { WizardState } from "@/lib/wizard-context";
import { ashfordSample } from "./sample-data";

// Builds a real BusinessData object for the live demo by overlaying what the
// wizard actually collected (name, phone, email, city, tagline) onto the
// sample data for everything a brand-new signup wouldn't have yet
// (services, testimonials, credentials, gallery). No AI call, no backend —
// this is what makes the wizard's final step instant.
export function buildBusinessDataFromWizard(state: WizardState): BusinessData {
  const city = state.city.trim();
  return {
    ...ashfordSample,
    companyName: state.businessName.trim() || ashfordSample.companyName,
    tagline: state.tagline.trim() || ashfordSample.tagline,
    phone: state.phone.trim() || ashfordSample.phone,
    email: state.email.trim() || ashfordSample.email,
    address: {
      ...ashfordSample.address,
      city: city || ashfordSample.address.city,
    },
    serviceArea: city ? `${city} and surrounding communities` : ashfordSample.serviceArea,
  };
}
