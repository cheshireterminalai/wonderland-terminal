import { openai } from '../api/openRouter';
import { AI_MODELS } from '../../config/models';
import { VISION_SYSTEM_PROMPT } from '../chat/prompts';

export async function analyzeImage(imageUrl: string): Promise<string> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.OPEN_ROUTER_API_KEY}`,
        'HTTP-Referer': 'https://wonderland.terminal',
        'X-Title': 'Wonderland Terminal',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: AI_MODELS.vision,
        messages: [
          {
            role: 'system',
            content: VISION_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              },
              {
                type: 'text',
                text: 'What do you see in this curious image?'
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}