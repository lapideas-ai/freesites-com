import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const locationId = process.env.GHL_LOCATION_ID || "MISSING";
  return NextResponse.json({ runtime_location_id: locationId });
}
