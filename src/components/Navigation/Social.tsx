import React from 'react';
import { Twitter, MessageCircle, Github } from 'lucide-react';

const socialLinks = [
  { 
    icon: Twitter, 
    url: 'https://x.com/cheshiregpt',
    label: 'Twitter'
  },
  { 
    icon: MessageCircle, 
    url: 'https://t.me/cheshireterminal',
    label: 'Telegram'
  },
  { 
    icon: Github, 
    url: 'https://github.com/cheshireterminalai',
    label: 'GitHub'
  },
];

export const Social: React.FC = () => (
  <div className="flex items-center gap-4">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 transition-colors"
        title={link.label}
      >
        <link.icon className="w-5 h-5" />
      </a>
    ))}
  </div>
);