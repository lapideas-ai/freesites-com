import { NextResponse } from "next/server";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status });
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

  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
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

    if (!response.ok) {
      const detail = await response.text();
      console.error("start-free GHL Contacts API error:", response.status, detail);
      return json({ ok: false, error: "CRM_REJECTED_CONTACT", upstream_status: response.status }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    console.error("start-free GHL Contacts API unavailable:", error instanceof Error ? error.message : String(error));
    return json({ ok: false, error: "CRM_UNAVAILABLE" }, 502);
  }
}
