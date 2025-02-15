import React from 'react';
import { Card } from './Card';
import type { Player, CardType } from '../types';

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
  onMakeGuess: (guess: CardType) => void;
  gameStatus: string;
}

export function PlayerList({ players, currentPlayerId, onMakeGuess, gameStatus }: PlayerListProps) {
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const isGuessingPhase = gameStatus === 'guessing';
  const gameStarted = gameStatus !== 'waiting';

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-6 justify-center">
        {players.map((player) => (
          <div
            key={player.id}
            className={`p-4 rounded-lg ${
              player.id === currentPlayerId
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-gray-100'
            }`}
          >
            <p className="font-semibold text-center mb-2">{player.name}</p>
            {gameStarted && player.id !== currentPlayerId && (
              <Card 
                value={player.disguisedCard || 'hearts'} 
                isRevealed={true}
              />
            )}
            {gameStarted && player.id === currentPlayerId && player.isJoker && (
              <div>
                <p className="text-sm text-purple-600 font-medium mb-2">You are the Joker!</p>
                <Card value="joker" isRevealed={true} />
              </div>
            )}
            <p className="text-sm text-gray-600 text-center mt-2">
              {player.isReady ? '✅ Ready' : '⏳ Waiting...'}
            </p>
          </div>
        ))}
      </div>

      {isGuessingPhase && currentPlayer && !currentPlayer.guess && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Make Your Guess</h3>
          <div className="flex justify-center gap-4">
            {(['hearts', 'diamonds', 'rectangle'] as CardType[]).map((cardType) => (
              <button
                key={cardType}
                onClick={() => onMakeGuess(cardType)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
              </button>
            ))}
            <button
              onClick={() => onMakeGuess('joker')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Joker
            </button>
          </div>
        </div>
      )}
    </div>
  );
}