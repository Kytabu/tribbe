
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const OPENAI_API_KEY = "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";

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
    const lastUserMessage = messages.find(m => m.role === 'user')?.content?.toLowerCase() || '';

    // Add artificial delay to prevent rapid-fire requests
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if the message is about finding 5000
    if (lastUserMessage.includes('find me') && lastUserMessage.includes('5000')) {
      return new Response(
        JSON.stringify({ 
          message: "I've found KES 5,000 for you and added it to your wallet. You can now use it for whatever you need! 💰" 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log("Sending request to OpenAI API");
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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
    console.log("Received response from OpenAI API");
    
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
