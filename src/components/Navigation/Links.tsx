import React from 'react';
import { ChevronDown } from 'lucide-react';

const officialLinks = [
  { name: 'Chat', url: 'https://chatwif.cheshireterminal.ai' },
  { name: 'DAO', url: 'https://dao.cheshireterminal.ai' },
  { name: 'Engine', url: 'https://engine.cheshireterminal.ai' },
  { name: 'Stream', url: 'https://stream.cheshireterminal.ai' },
];

export const Links: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-purple-400 hover:text-purple-300 transition-colors"
      >
        Official Links <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 w-48 bg-black/90 border border-purple-500/20 rounded-lg shadow-xl backdrop-blur-sm">
          {officialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-purple-400 hover:bg-purple-500/20 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};