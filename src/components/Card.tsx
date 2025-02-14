import React from 'react';
import type { CardType } from '../types';

interface CardProps {
  value: CardType;
  isRevealed?: boolean;
}

const cardColors = {
  hearts: 'text-red-500',
  diamonds: 'text-blue-500',
  rectangle: 'text-green-500',
  joker: 'text-purple-500'
};

const cardSymbols = {
  hearts: '♥️',
  diamonds: '♦️',
  rectangle: '▯',
  joker: '🃏'
};

export function Card({ value, isRevealed = false }: CardProps) {
  return (
    <div className="relative w-32 h-48 perspective-1000">
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
        {/* Card Front */}
        <div className="absolute w-full h-full bg-white rounded-lg border-2 border-gray-300 shadow-lg flex items-center justify-center backface-hidden">
          <div className="text-blue-600 text-4xl font-bold">?</div>
        </div>
        
        {/* Card Back */}
        <div className="absolute w-full h-full bg-white rounded-lg border-2 border-gray-300 shadow-lg flex flex-col items-center justify-center backface-hidden rotate-y-180">
          <div className={`text-6xl ${cardColors[value]}`}>
            {cardSymbols[value]}
          </div>
          <div className={`text-lg font-semibold mt-2 ${cardColors[value]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
}