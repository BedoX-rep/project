import React from 'react';

interface GamePhaseProps {
  phase: string;
  timeRemaining: number;
  round: number;
}

export function GamePhase({ phase, timeRemaining, round }: GamePhaseProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Round {round}</h2>
          <p className="text-gray-600 capitalize">{phase} Phase</p>
        </div>
        <div className="text-3xl font-mono bg-gray-100 px-4 py-2 rounded-lg">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}