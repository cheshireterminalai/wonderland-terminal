import React from 'react';
import { Links } from './Links';
import { Social } from './Social';

export const Navigation: React.FC = () => (
  <nav className="absolute top-4 right-4 flex items-center gap-6">
    <Links />
    <Social />
  </nav>
);