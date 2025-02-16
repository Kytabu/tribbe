
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;
const requestLog: { timestamp: number }[] = [];

function isRateLimited(): boolean {
  const now = Date.now();
  // Remove old requests
  const windowStart = now - RATE_LIMIT_WINDOW;
  while (requestLog.length > 0 && requestLog[0].timestamp < windowStart) {
    requestLog.shift();
  }
  // Check if we're over the limit
  if (requestLog.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  // Add new request
  requestLog.push({ timestamp: now });
  return false;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check rate limit
    if (isRateLimited()) {
      return new Response(
        JSON.stringify({ 
          error: "Please wait a moment before sending another message" 
        }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { messages } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are Flami, a helpful and friendly AI assistant. You provide clear, concise, and accurate responses while maintaining a warm and engaging tone.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "The service is currently busy. Please try again in a moment." 
          }),
          { 
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify({ 
      message: data.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: "Sorry, I'm having trouble responding right now. Please try again in a moment." 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
