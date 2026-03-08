/**
 * Example API Proxy for External Services
 * 
 * This pattern allows client-side to call your API securely,
 * while keeping secrets (API keys, MongoDB URI, etc.) server-side only.
 * 
 * Usage from client:
 * const data = await fetch('/api/proxy/external-service');
 */

import { NextResponse } from 'next/server';

// Example 1: External API with API Key (stored in env)
export async function GET(request) {
  try {
    const apiKey = process.env.EXTERNAL_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Call external API with secret key
    const response = await fetch('https://external-api.example.com/data', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    // Return data to client (secret stays on server)
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// Example 2: POST with body forwarding
export async function POST(request) {
  try {
    const body = await request.json();
    const apiKey = process.env.EXTERNAL_API_KEY;

    const response = await fetch('https://external-api.example.com/submit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Proxy POST error:', error);
    return NextResponse.json(
      { error: 'Failed to submit data' },
      { status: 500 }
    );
  }
}
