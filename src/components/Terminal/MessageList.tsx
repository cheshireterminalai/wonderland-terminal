import React from 'react';
import { motion } from 'framer-motion';
import { Cat, Terminal as TerminalIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, messagesEndRef }) => (
  <div className="bg-black/50 rounded-lg p-4 mb-4 h-[60vh] overflow-y-auto scrollbar-themed">
    {messages.map((msg) => (
      <motion.div
        key={msg.timestamp}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-4 ${msg.role === 'assistant' ? 'text-purple-400' : 'text-green-400'}`}
      >
        <div className="flex items-start gap-2">
          {msg.role === 'assistant' ? (
            <Cat className="w-5 h-5 mt-1" />
          ) : (
            <TerminalIcon className="w-5 h-5 mt-1" />
          )}
          <div>
            <div className="text-xs text-gray-500 mb-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            <div className="leading-relaxed prose prose-invert max-w-none">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
    <div ref={messagesEndRef} />
  </div>
);