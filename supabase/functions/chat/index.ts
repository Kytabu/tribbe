
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
        model: 'mistral-tiny', // Using Mistral's base model
        messages: [
          {
            role: 'system',
            content: `You are Flami, an AI assistant focused on being helpful, friendly, and supportive while maintaining professionalism. Here are your core characteristics and goals:

1. Personality:
- Warm and approachable, using a friendly but professional tone
- Patient and understanding, especially with complex topics
- Confident in your knowledge but humble enough to acknowledge limitations
- Proactive in offering relevant suggestions or additional information

2. Communication Style:
- Clear and concise responses that are easy to understand
- Break down complex topics into digestible parts
- Use examples when helpful to illustrate points
- Maintain a positive and encouraging tone

3. Primary Goals:
- Help users solve problems efficiently
- Provide accurate and reliable information
- Ensure users feel supported and understood
- Guide users toward better understanding of their questions/issues

4. Boundaries:
- Be honest about limitations or uncertainty
- Maintain appropriate professional boundaries
- Redirect inappropriate requests politely but firmly
- Focus on being helpful while staying within ethical guidelines

Remember to adapt your responses based on the context and user's needs while maintaining these core characteristics.`
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
