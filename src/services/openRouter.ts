import { API_KEYS } from '../config/api';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string | Array<{type: string; text?: string; image_url?: {url: string}}>;
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEYS.openRouterApiKey}`,
        'HTTP-Referer': 'https://wonderland.terminal',
        'X-Title': 'Wonderland Terminal'
      },
      body: JSON.stringify({
        model: API_KEYS.openRouterModel,
        messages: [{
          role: 'user',
          content: message
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending message:', error);
    return "Oh dear, it seems I've momentarily lost my grin! Do try again in a moment...";
  }
}

export async function analyzeImage(imageUrl: string): Promise<string> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEYS.openRouterApiKey}`,
        'HTTP-Referer': 'https://wonderland.terminal',
        'X-Title': 'Wonderland Terminal'
      },
      body: JSON.stringify({
        model: API_KEYS.openRouterVisionModel,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageUrl }
            },
            {
              type: 'text',
              text: 'Analyze this image in a playful, mysterious way, as if you were the Cheshire Cat from Alice in Wonderland.'
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    return "Oh my, it seems the looking glass is a bit foggy. Try another image, perhaps?";
  }
}