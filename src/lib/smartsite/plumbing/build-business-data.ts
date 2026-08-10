import type { BusinessData } from "../types";
import type { WizardState } from "@/lib/wizard-context";
import { bluewaterSample } from "./sample-data";

// Builds a real BusinessData object for the live demo by overlaying what the
// wizard actually collected (name, phone, email, city, tagline) onto the
// sample data for everything a brand-new signup wouldn't have yet
// (services, testimonials, credentials, gallery). No AI call, no backend —
// this is what makes the wizard's final step instant.
export function buildBusinessDataFromWizard(state: WizardState): BusinessData {
  const city = state.city.trim();
  return {
    ...bluewaterSample,
    companyName: state.businessName.trim() || bluewaterSample.companyName,
    tagline: state.tagline.trim() || bluewaterSample.tagline,
    phone: state.phone.trim() || bluewaterSample.phone,
    email: state.email.trim() || bluewaterSample.email,
    address: {
      ...bluewaterSample.address,
      city: city || bluewaterSample.address.city,
    },
    serviceArea: city ? `${city} and surrounding communities` : bluewaterSample.serviceArea,
  };
}
