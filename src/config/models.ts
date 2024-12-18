export const AI_MODELS = {
  chat: 'meta-llama/llama-3.3-70b-instruct',
  vision: 'x-ai/grok-vision-beta'
} as const;

export const API_CONFIG = {
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://wonderland.terminal',
    'X-Title': 'Wonderland Terminal',
  },
  maxRetries: 3,
  timeout: 30000,
  temperature: 0.7,
  maxTokens: 1000,
  presencePenalty: 0.6,
  frequencyPenalty: 0.5,
} as const;
