// Forwards FreeSites lead-capture events (SmartSite builder + /funding) to
// the matching HighLevel inbound webhook, selected by lead_type. Dormant
// (logs only) for any lead_type whose *_WEBHOOK_URL env var isn't set yet —
// same pattern as ghl-lead.js.
const WEBHOOK_URLS = {
  "SmartSite Lead": process.env.GHL_SMARTSITE_WEBHOOK_URL,
  "Funding Opportunity": process.env.GHL_FUNDING_WEBHOOK_URL,
};

exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method not allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const leadType = payload.lead_type;
  if (!leadType || !(leadType in WEBHOOK_URLS)) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Unknown or missing lead_type' }) };
  }

  const forwardPayload = {
    ...payload,
    source: 'FreeSites',
    captured_at: new Date().toISOString(),
  };

  const webhookUrl = WEBHOOK_URLS[leadType];
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(forwardPayload),
      });
    } catch (error) {
      console.error('ghl-lead-capture forward error:', error.message);
    }
  } else {
    console.log(`ghl-lead-capture (no webhook configured for "${leadType}"):`, JSON.stringify(forwardPayload));
  }

  return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
};
