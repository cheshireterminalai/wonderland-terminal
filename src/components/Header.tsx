import React from 'react';
import { Cat } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => (
  <div className="text-center mb-6">
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="flex items-center gap-2">
        <Cat className="w-8 h-8 text-purple-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-orange-400 text-transparent bg-clip-text">
          Wonderland, by Cheshire Terminal
        </h1>
      </div>
      <div className="text-sm text-green-400">Powered by $GRIN on Solana</div>
      <motion.div
        animate={{ 
          opacity: [0.5, 1, 0.5],
          textShadow: [
            '0 0 7px #9F7AEA',
            '0 0 10px #9F7AEA',
            '0 0 7px #9F7AEA'
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="text-purple-400 font-mono"
      >
        7JofsgKgD3MerQDa7hEe4dfkY3c3nMnsThZzUuYyTFpE
      </motion.div>
    </motion.div>
  </div>
);

export default Header;