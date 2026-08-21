const LEAD_CAPTURE_ENDPOINT = "/.netlify/functions/ghl-lead-capture";

export type LeadType = "SmartSite Lead" | "Funding Opportunity";

export type LeadPayload = {
  lead_type: LeadType;
  page_path: string;
  email?: string;
  phone?: string;
  first_name?: string;
  business_name?: string;
  trade?: string;
  site_url?: string;
  fields?: Record<string, unknown>;
};

// Fire-and-forget: never blocks the UI. Forwarded server-side to the
// matching HighLevel webhook by netlify/functions/ghl-lead-capture.js.
export function reportLead(payload: LeadPayload) {
  fetch(LEAD_CAPTURE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}
