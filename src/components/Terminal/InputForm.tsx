import React from 'react';
import { VoiceChat } from '../VoiceChat';
import ImageAnalysis from '../ImageAnalysis';

interface InputFormProps {
  input: string;
  isProcessing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAnalyzeImage: (url: string) => Promise<void>;
}

export const InputForm: React.FC<InputFormProps> = ({
  input,
  isProcessing,
  onInputChange,
  onSubmit,
  onAnalyzeImage,
}) => {
  const [isVoiceActive, setIsVoiceActive] = React.useState(false);

  const toggleVoiceChat = () => {
    setIsVoiceActive(!isVoiceActive);
    const widget = document.querySelector('elevenlabs-convai');
    if (widget) {
      widget.setAttribute('style', `
        display: ${!isVoiceActive ? 'block' : 'none'} !important;
        position: fixed !important;
        bottom: 100px !important;
        right: 20px !important;
        z-index: 9999 !important;
      `);
    }
  };

  React.useEffect(() => {
    const widget = document.querySelector('elevenlabs-convai');
    if (widget) {
      widget.setAttribute('style', 'display: none !important;');
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        type="text"
        value={input}
        onChange={onInputChange}
        disabled={isProcessing}
        className="w-full bg-black/50 rounded-lg p-4 pr-32 text-green-400 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder={isProcessing ? "Cheshire is thinking..." : "Enter your message..."}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
        <ImageAnalysis 
          onAnalyze={onAnalyzeImage}
          isProcessing={isProcessing}
        />
        <VoiceChat 
          isActive={isVoiceActive}
          onToggle={toggleVoiceChat}
        />
      </div>
    </form>
  );
};