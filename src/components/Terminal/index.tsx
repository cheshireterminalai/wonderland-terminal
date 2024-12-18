import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { motion } from 'framer-motion';

import { useChat } from './hooks/useChat';

export const Terminal = () => {
  const { messages, isProcessing, handleSendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const message = input.trim();
    setInput('');
    await handleSendMessage(message);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 rounded-lg p-4 mb-4 h-[60vh] overflow-y-auto">
          {messages.map((msg) => (
            <motion.div
              key={msg.timestamp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 ${msg.role === 'assistant' ? 'text-purple-400' : 'text-green-400'}`}
            >
              <div className="flex items-start gap-2">
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            className="w-full bg-black/50 rounded-lg p-4 text-green-400 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder={isProcessing ? "Cheshire is thinking..." : "Enter your message..."}
          />
        </form>
      </div>
    </div>
  );
};
