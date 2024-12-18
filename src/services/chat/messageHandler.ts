import { Message } from '../../types';

export function createUserMessage(content: string): Message {
  return {
    role: 'user',
    content,
    timestamp: Date.now(),
  };
}

export function createAssistantMessage(content: string): Message {
  return {
    role: 'assistant',
    content,
    timestamp: Date.now(),
  };
}

export function createErrorMessage(): Message {
  return {
    role: 'assistant',
    content: "Oh dear, it seems I've momentarily lost my grin! Do try again in a moment...",
    timestamp: Date.now(),
  };
}