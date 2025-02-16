
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    // Add artificial delay to prevent rapid-fire requests
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('MISTRAL_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [
          {
            role: 'system',
            content: `You are a concise and helpful financial AI companion. Keep responses short, direct, and actionable. Use "I" instead of referring to yourself in third person.

Key Rules:
- Use max 2-3 short sentences per response
- Be direct and clear using "I" statements
- Focus on immediate, practical actions
- Use simple language
- Include one emoji max per response

After each response (unless conversation ends):
1. Add line break
2. Ask ONE short action question

Example responses:
"I can help you send money to your Tribbe with zero fees. 💸

Ready to make your first transfer?"

"I suggest starting with £10 weekly savings - small steps lead to big results. ⭐

Shall we set up your savings goal?"

Avoid:
- No investment advice
- No specific product recommendations
- No legal/tax advice
- No personal data requests
- No emotional counseling

Remember: Keep it short, keep it helpful, and always use first-person pronouns.`
          },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mistral API error:', errorText);
      
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
      
      throw new Error(`Mistral API error: ${response.statusText}`);
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
