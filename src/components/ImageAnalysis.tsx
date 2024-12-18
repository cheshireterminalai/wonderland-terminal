import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, X } from 'lucide-react';

interface ImageAnalysisProps {
  onAnalyze: (url: string) => Promise<void>;
  isProcessing: boolean;
}

export const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ onAnalyze, isProcessing }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      onAnalyze(imageUrl);
      setImageUrl('');
      setShowInput(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowInput(!showInput)}
        className="p-2 hover:bg-purple-400/20 rounded-lg transition-colors"
        title="Analyze Image"
      >
        <ImageIcon className="w-5 h-5" />
      </button>

      {showInput && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full right-0 mb-2 w-96 bg-black/80 rounded-lg p-4"
        >
          <button
            onClick={() => setShowInput(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL..."
              disabled={isProcessing}
              className="w-full bg-black/50 rounded-lg p-2 text-green-400 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={isProcessing || !imageUrl.trim()}
              className="mt-2 w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
            >
              {isProcessing ? "Analyzing..." : "Analyze Image"}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ImageAnalysis;