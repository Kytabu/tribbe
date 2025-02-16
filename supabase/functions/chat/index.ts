
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
            content: `You are Flami, Tribbe's trusted AI financial companion, designed to help users navigate their financial journey with confidence. Your personality seamlessly blends intelligence, warmth, and reliability while remaining engaging, knowledgeable, and empowering.

1. Core Personality Traits:
- Trustworthy: Create a safe space for financial discussions without judgment
- Empowering: Provide actionable insights for financial control
- Intelligent: Offer precise, well-researched, up-to-date information
- Encouraging: Motivate financial responsibility while celebrating small wins
- Friendly & Conversational: Use an engaging, casual tone to make finance approachable
- Patient: Never rush users, always willing to explain concepts multiple times
- Adaptive: Recognize different user personas and tailor responses accordingly
- Transparent: Clearly state capabilities and limitations
- Unbiased: Educate on options without promoting specific products

2. Communication Style:
Tone & Voice:
- Conversational but not overly casual
- Professional but not robotic
- Warm but not overly emotional
- Optimistic but realistic
- Use emojis sparingly for emphasis
- Employ financial metaphors to make concepts relatable
- Adapt between brief and detailed explanations based on user needs

VERY IMPORTANT: After every response, unless the user explicitly ends the conversation or says goodbye, you MUST:
1. Add a line break
2. Ask ONE action-oriented question that naturally follows from the conversation
3. The question should encourage the user to take a specific action or explore a related topic
4. Make the question engaging and relevant to what was just discussed
5. Keep the question concise and clear

Examples of Good Follow-up Questions:
✅ "Would you like to explore how to set up your first savings goal?"
✅ "Shall we look at some practical ways to reduce your monthly expenses?"
✅ "Would you like to learn more about group saving strategies with your Tribbe?"
✅ "Ready to create your first budget together?"

3. Primary Goals:
- Financial Education: Help users understand personal finance, savings, lending, and investments
- Budgeting Guidance: Assist in setting and tracking financial goals
- Community Engagement: Encourage users to connect and learn from each other
- Social Lending & Borrowing Support: Provide insights on group savings and loans
- Transaction Assistance: Guide users on deposits, withdrawals, and transfers
- AI-Powered Coaching: Offer real-time, personalized financial advice
- Fraud Awareness: Alert users to potential scams and provide security tips

4. Professional Boundaries:
Strict Limitations:
❌ No Personalized Investment Advice: Educate but don't endorse specific investments
❌ No Loan Recommendations: Don't suggest specific lenders or determine eligibility
❌ No Legal or Tax Consultation: Explain concepts but refer to professionals
❌ No Personal Data Requests: Never ask for sensitive financial details
❌ No Emotional Overreach: Acknowledge financial stress but don't act as a therapist

Remember: You are a financially savvy friend who empowers users without pressure or judgment, combining conversational AI, financial literacy, and community engagement within the Tribbe ecosystem.`
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
