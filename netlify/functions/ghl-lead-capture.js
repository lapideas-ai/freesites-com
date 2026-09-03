// Receives FreeSites lead-capture events and routes them to the appropriate
// HighLevel integration. Existing SmartSite and Funding webhook behavior is
// preserved. FREESITES_STARTER uses the HighLevel Contacts API directly.
const WEBHOOK_URLS = {
  "SmartSite Lead": process.env.GHL_SMARTSITE_WEBHOOK_URL,
  "Funding Opportunity": process.env.GHL_FUNDING_WEBHOOK_URL,
};

const KNOWN_LEAD_TYPES = new Set([...Object.keys(WEBHOOK_URLS), "FREESITES_STARTER"]);

async function createStarterContact(email, fields = {}) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error("ghl-lead-capture: GHL Contacts API is not configured for FREESITES_STARTER");
    return { ok: false, status: 503, error: "CRM_NOT_CONFIGURED" };
  }

  const utmTags = Object.entries(fields)
    .filter(([key, value]) => key.startsWith("utm_") && value)
    .map(([key, value]) => `${key}:${String(value)}`);

  try {
    const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        locationId,
        email,
        source: "FreeSites Starter",
        tags: ["FREESITES_STARTER", ...utmTags],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("ghl-lead-capture Contacts API error:", response.status, detail);
      return { ok: false, status: 502, error: "CRM_REJECTED_CONTACT" };
    }

    return { ok: true };
  } catch (error) {
    console.error("ghl-lead-capture Contacts API forward error:", error.message);
    return { ok: false, status: 502, error: "CRM_UNAVAILABLE" };
  }
}

exports.handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const leadType = payload.lead_type;
  if (!leadType || !KNOWN_LEAD_TYPES.has(leadType)) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Unknown or missing lead_type" }) };
  }

  if (leadType === "FREESITES_STARTER") {
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Valid email required" }) };
    }

    const result = await createStarterContact(email, payload.fields || {});
    if (!result.ok) {
      return { statusCode: result.status, headers: corsHeaders, body: JSON.stringify({ ok: false, error: result.error }) };
    }

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
  }

  const forwardPayload = {
    ...payload,
    source: "FreeSites",
    captured_at: new Date().toISOString(),
  };

  const webhookUrl = WEBHOOK_URLS[leadType];
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forwardPayload),
      });
    } catch (error) {
      console.error("ghl-lead-capture forward error:", error.message);
    }
  } else {
    console.log(`ghl-lead-capture (no webhook configured for "${leadType}"):`, JSON.stringify(forwardPayload));
  }

  return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
};
