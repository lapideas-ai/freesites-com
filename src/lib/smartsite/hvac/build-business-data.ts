import type { BusinessData } from "../types";
import type { WizardState } from "@/lib/wizard-context";
import { ironcladSample } from "./sample-data";

// Builds a real BusinessData object for the live demo by overlaying what the
// wizard actually collected (name, phone, email, city, tagline) onto the
// sample data for everything a brand-new signup wouldn't have yet
// (services, testimonials, credentials, gallery). No AI call, no backend —
// this is what makes the wizard's final step instant.
export function buildBusinessDataFromWizard(state: WizardState): BusinessData {
  const city = state.city.trim();
  return {
    ...ironcladSample,
    companyName: state.businessName.trim() || ironcladSample.companyName,
    tagline: state.tagline.trim() || ironcladSample.tagline,
    phone: state.phone.trim() || ironcladSample.phone,
    email: state.email.trim() || ironcladSample.email,
    address: {
      ...ironcladSample.address,
      city: city || ironcladSample.address.city,
    },
    serviceArea: city ? `${city} and surrounding communities` : ironcladSample.serviceArea,
  };
}
