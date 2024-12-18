import {
  useCallback,
  useState,
} from 'react';

import { sendMessage } from '../../../services/chat';
import {
  createAssistantMessage,
  createErrorMessage,
  createUserMessage,
} from '../../../services/chat/messageHandler';
import { analyzeImage } from '../../../services/vision';
import type { Message } from '../../../types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleSendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isProcessing) return;

    try {
      setIsProcessing(true);
      const userMessage = createUserMessage(input);
      addMessage(userMessage);

      const response = await sendMessage(input, messages);
      const assistantMessage = createAssistantMessage(response);
      addMessage(assistantMessage);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage = createErrorMessage();
      addMessage(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, messages, addMessage]);

  const handleImageAnalysis = useCallback(async (imageUrl: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const userMessage = createUserMessage(`Analyzing image: ${imageUrl}`);
      addMessage(userMessage);

      const analysis = await analyzeImage(imageUrl);
      const assistantMessage = createAssistantMessage(analysis);
      addMessage(assistantMessage);
    } catch (error) {
      console.error('Error analyzing image:', error);
      const errorMessage = createErrorMessage();
      addMessage(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, addMessage]);

  return {
    messages,
    isProcessing,
    handleSendMessage,
    handleImageAnalysis
  };
}
