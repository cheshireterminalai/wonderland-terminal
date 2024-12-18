import {
  AI_MODELS,
  API_CONFIG,
} from '../../config/models';
import type { Message } from '../../types';
import {
  openai,
  validateApiResponse,
} from '../api/openRouter';
import { CHAT_SYSTEM_PROMPT } from './prompts';

export async function sendMessage(message: string, messageHistory: Message[] = []): Promise<string> {
  try {
    const messages = [
      {
        role: 'system',
        content: CHAT_SYSTEM_PROMPT
      },
      ...messageHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: AI_MODELS.chat,
      messages: messages as any[],
      temperature: API_CONFIG.temperature,
      max_tokens: API_CONFIG.maxTokens,
      presence_penalty: API_CONFIG.presencePenalty,
      frequency_penalty: API_CONFIG.frequencyPenalty,
    });

    return validateApiResponse(
      completion.choices[0]?.message?.content,
      'Invalid API response format'
    );
  } catch (error) {
    console.error('Error in sendMessage:', error);
    throw error;
  }
}
