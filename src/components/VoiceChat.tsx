import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceChatProps {
  isActive: boolean;
  onToggle: () => void;
}

export const VoiceChat: React.FC<VoiceChatProps> = ({ isActive, onToggle }) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 hover:bg-purple-400/20 rounded-lg transition-colors relative group"
      title={isActive ? "Disable Voice Chat" : "Enable Voice Chat"}
    >
      <motion.div
        initial={false}
        animate={isActive ? {
          opacity: [0.5, 1],
          scale: [1, 1.1, 1],
        } : {}}
        transition={{
          repeat: isActive ? Infinity : 0,
          duration: 2,
        }}
      >
        {isActive ? (
          <Volume2 className="w-5 h-5 text-purple-400" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.div>
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isActive ? "Voice Chat Active" : "Enable Voice Chat"}
      </span>
    </motion.button>
  );
};