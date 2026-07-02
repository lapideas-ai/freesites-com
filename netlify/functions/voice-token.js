exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method not allowed' };
  }
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'XAI_API_KEY not configured' }) };
  }
  try {
    const res = await fetch('https://api.x.ai/v1/realtime/tokens', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: 'agent_BN1cRSL8ZKJdSZWX',
        ttl: 60,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('xAI token error:', err);
      return { statusCode: 502, headers: corsHeaders, body: JSON.stringify({ error: 'Could not get voice token' }) };
    }
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: data.token }),
    };
  } catch (error) {
    console.error('voice-token error:', error.message);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Internal error' }) };
  }
};
