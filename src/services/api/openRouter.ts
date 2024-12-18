import OpenAI from 'openai';

import { API_KEYS } from '../../config/api';
import { API_CONFIG } from '../../config/models';

if (!API_KEYS.openRouterApiKey) {
  throw new Error('OpenRouter API key is not configured. Please check your .env file.');
}

export const openai = new OpenAI({
  baseURL: API_CONFIG.baseURL,
  apiKey: API_KEYS.openRouterApiKey,
  defaultHeaders: API_CONFIG.defaultHeaders,
  maxRetries: API_CONFIG.maxRetries,
  timeout: API_CONFIG.timeout,
});

// Helper function to validate API response
export function validateApiResponse<T>(response: T | null | undefined, errorMessage: string): T {
  if (!response) {
    throw new Error(errorMessage);
  }
  return response;
}

// Error handler for API calls
export function handleApiError(error: unknown): never {
  if (error instanceof OpenAI.APIError) {
    console.error('OpenRouter API Error:', {
      status: error.status,
      message: error.message,
      code: error.code,
      type: error.type
    });
    throw new Error(
      "Oh dear, it seems I've gotten terribly lost in Wonderland! " +
      "The connection to my mind seems to be playing tricks. " +
      "Perhaps we should try our conversation again in a moment? 🐱"
    );
  }
  
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    throw error;
  }
  
  console.error('Unknown API Error:', error);
  throw new Error('An unexpected error occurred');
}
