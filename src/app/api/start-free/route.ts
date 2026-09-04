import { NextResponse } from "next/server";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status });
}

function safeGhlDiagnostic(raw: string) {
  try {
    const data = JSON.parse(raw);
    const candidate = data?.message ?? data?.error ?? data?.error_description ?? data?.msg;
    if (typeof candidate !== "string") return "No GHL error message returned";
    return candidate
      .replace(/Bearer\s+[A-Za-z0-9._~+\/-]+/gi, "Bearer [redacted]")
      .replace(/pit-[A-Za-z0-9_-]+/gi, "[redacted-token]")
      .slice(0, 240);
  } catch {
    return "Non-JSON error response from GHL";
  }
}

export async function POST(request: Request) {
  let payload: { email?: unknown; fields?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return json({ ok: false, error: "VALID_EMAIL_REQUIRED" }, 400);
  }

  const token = process.env.GHL_FREESITES_STARTER_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error("start-free: GHL Contacts API is not configured");
    return json({ ok: false, error: "CRM_NOT_CONFIGURED" }, 503);
  }

  const fields = payload.fields && typeof payload.fields === "object" && !Array.isArray(payload.fields)
    ? payload.fields as Record<string, unknown>
    : {};

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

    const raw = await response.text();
    let data: any = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { /* diagnostic below */ }

    if (!response.ok) {
      const ghlMessage = safeGhlDiagnostic(raw);
      console.error("start-free GHL Contacts API error:", response.status, raw);
      return json({ ok: false, error: "CRM_REJECTED_CONTACT", upstream_status: response.status, upstream_message: ghlMessage }, 502);
    }

    const contact = data?.contact;
    const returnedEmail = typeof contact?.email === "string" ? contact.email.trim().toLowerCase() : "";
    const returnedLocationId = typeof contact?.locationId === "string" ? contact.locationId : "";
    const contactId = typeof contact?.id === "string" ? contact.id : "";

    if (!contactId || returnedEmail !== email || returnedLocationId !== locationId) {
      console.error("start-free GHL response could not be verified:", JSON.stringify({ status: response.status, hasContactId: Boolean(contactId), emailMatch: returnedEmail === email, locationMatch: returnedLocationId === locationId, response: data }));
      return json({ ok: false, error: "CRM_UNVERIFIED_RESPONSE", upstream_status: response.status }, 502);
    }

    console.log("start-free GHL verified contact:", JSON.stringify({ contactId, email, locationSuffix: locationId.slice(-4) }));
    return json({ ok: true, verified: true, contact_id: contactId, location_suffix: locationId.slice(-4) });
  } catch (error) {
    console.error("start-free GHL Contacts API unavailable:", error instanceof Error ? error.message : String(error));
    return json({ ok: false, error: "CRM_UNAVAILABLE" }, 502);
  }
}
