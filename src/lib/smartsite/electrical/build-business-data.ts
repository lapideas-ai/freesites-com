import type { BusinessData } from "../types";
import type { WizardState } from "@/lib/wizard-context";
import { voltrightSample } from "./sample-data";

// Builds a real BusinessData object for the live demo by overlaying what the
// wizard actually collected (name, phone, email, city, tagline) onto the
// sample data for everything a brand-new signup wouldn't have yet
// (services, testimonials, credentials, gallery). No AI call, no backend —
// this is what makes the wizard's final step instant.
export function buildBusinessDataFromWizard(state: WizardState): BusinessData {
  const city = state.city.trim();
  return {
    ...voltrightSample,
    companyName: state.businessName.trim() || voltrightSample.companyName,
    tagline: state.tagline.trim() || voltrightSample.tagline,
    phone: state.phone.trim() || voltrightSample.phone,
    email: state.email.trim() || voltrightSample.email,
    address: {
      ...voltrightSample.address,
      city: city || voltrightSample.address.city,
    },
    serviceArea: city ? `${city} and surrounding communities` : voltrightSample.serviceArea,
  };
}
