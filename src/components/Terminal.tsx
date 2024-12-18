import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { Message } from '../types';
import { analyzeImage } from '../services/openRouter';
import { Header } from './Header';
import { MessageList } from './MessageList';
import { InputForm } from './InputForm';

export const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [playKeyPress] = useSound('/sounds/keypress.mp3');
  const [playEnter] = useSound('/sounds/enter.mp3');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    playEnter();
    setIsProcessing(true);

    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate Cheshire's response (replace with actual API call)
    setTimeout(() => {
      const response: Message = {
        role: 'assistant',
        content: "Well, well... what do we have here? *grins mischievously* A curious wanderer in my digital domain! How delightfully unexpected... or perhaps, entirely expected? In Wonderland, one never quite knows, do they? 🐱",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, response]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playKeyPress();
  };

  const handleImageAnalysis = async (imageUrl: string) => {
    setIsProcessing(true);
    
    const userMessage: Message = {
      role: 'user',
      content: `Analyze this image: ${imageUrl}`,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    const analysis = await analyzeImage(imageUrl);
    
    const response: Message = {
      role: 'assistant',
      content: analysis.error || analysis.content,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, response]);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-4 font-mono">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <Header />
        <MessageList 
          messages={messages}
          messagesEndRef={messagesEndRef}
        />
        <InputForm
          input={input}
          isProcessing={isProcessing}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onAnalyzeImage={handleImageAnalysis}
        />
      </motion.div>
    </div>
  );
};

export default Terminal;