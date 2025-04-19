import { DEEPSEEK_CONFIG } from './config';
import { Message } from '@/types/chat';

export async function callDeepSeekAPI(messages: Message[]) {
  try {
    console.log('Sending request to DeepSeek API...');
    const response = await fetch(`${DEEPSEEK_CONFIG.BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_CONFIG.API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_CONFIG.MODEL,
        messages: [
          { role: 'system', content: DEEPSEEK_CONFIG.FLAMI_SYSTEM_PROMPT },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: DEEPSEEK_CONFIG.TEMPERATURE,
        max_tokens: DEEPSEEK_CONFIG.MAX_TOKENS,
        top_p: DEEPSEEK_CONFIG.TOP_P,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error response:', errorText);
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received response from DeepSeek API');
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw error;
  }
} 