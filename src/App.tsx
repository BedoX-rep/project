import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { PlayerList } from './components/PlayerList';
import { GamePhase } from './components/GamePhase';
import type { GameState, Player, CardType } from './types';
import { Users, StopCircle } from 'lucide-react';
import { supabase } from './lib/supabase';

const DISCUSSION_TIME = 300; // 5 minutes in seconds
const GUESSING_TIME = 60; // 1 minute in seconds

function generateLobbyCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function App() {
  const [playerName, setPlayerName] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    status: 'waiting',
    players: [],
    phase: {
      timeRemaining: DISCUSSION_TIME,
      startTime: null,
    },
    round: 1,
    winner: null,
    lobbyCode: '',
    adminId: null,
    minPlayers: 3,
    jokerCount: 1,
  });
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isCreatingLobby, setIsCreatingLobby] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gameState.lobbyCode) {
      const lobbyChannel = supabase.channel(`lobby:${gameState.lobbyCode}`);

      lobbyChannel
        .on('presence', { event: 'sync' }, () => {
          const state = lobbyChannel.presenceState();
          const players = Object.values(state).flat() as Player[];
          setGameState(prev => ({
            ...prev,
            players,
          }));
        })
        .on('broadcast', { event: 'game_state' }, ({ payload }) => {
          setGameState(payload);
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED' && currentPlayer) {
            await lobbyChannel.track(currentPlayer);
          }
        });

      return () => {
        lobbyChannel.unsubscribe();
      };
    }
  }, [gameState.lobbyCode, currentPlayer]);

  useEffect(() => {
    let timer: number;
    
    if (gameState.status === 'discussion' || gameState.status === 'guessing') {
      timer = window.setInterval(() => {
        setGameState(prev => {
          const newTimeRemaining = prev.phase.timeRemaining - 1;
          
          if (newTimeRemaining <= 0) {
            if (prev.status === 'discussion') {
              return {
                ...prev,
                status: 'guessing',
                phase: {
                  timeRemaining: GUESSING_TIME,
                  startTime: Date.now(),
                },
              };
            } else {
              // Check win condition when guessing phase ends
              const jokers = prev.players.filter(p => p.isJoker);
              const jokersGuessedWrong = jokers.some(joker => 
                joker.guess !== 'joker'
              );
              
              return {
                ...prev,
                status: 'results',
                phase: {
                  timeRemaining: 0,
                  startTime: null,
                },
                winner: jokersGuessedWrong ? 'players' : 'jokers',
              };
            }
          }
          
          return {
            ...prev,
            phase: {
              ...prev.phase,
              timeRemaining: newTimeRemaining,
            },
          };
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [gameState.status]);

  const assignCards = (players: Player[]) => {
    const regularCards: CardType[] = ['hearts', 'diamonds', 'rectangle'];
    const jokerCount = gameState.jokerCount;
    const playerCount = players.length;
    
    // Create array of regular cards needed (excluding jokers)
    const cardsNeeded = playerCount - jokerCount;
    let cards: CardType[] = [];
    
    // Fill with regular cards
    while (cards.length < cardsNeeded) {
      cards = [...cards, ...regularCards];
    }
    cards = cards.slice(0, cardsNeeded);
    
    // Shuffle regular cards
    cards = cards.sort(() => Math.random() - 0.5);
    
    // Select joker positions
    const jokerPositions = new Set<number>();
    while (jokerPositions.size < jokerCount) {
      jokerPositions.add(Math.floor(Math.random() * playerCount));
    }
    
    return players.map((player, index) => {
      if (jokerPositions.has(index)) {
        // This player is a joker
        return {
          ...player,
          trueCard: 'joker',
          disguisedCard: regularCards[Math.floor(Math.random() * regularCards.length)],
          isJoker: true,
        };
      }
      
      const cardIndex = Math.floor(Math.random() * cards.length);
      const card = cards[cardIndex];
      cards.splice(cardIndex, 1);
      
      return {
        ...player,
        trueCard: card,
        disguisedCard: card,
        isJoker: false,
      };
    });
  };

  const handleCreateLobby = async () => {
    if (playerName.trim()) {
      try {
        const newLobbyCode = generateLobbyCode();
        const newPlayer: Player = {
          id: Math.random().toString(36).substr(2, 9),
          name: playerName,
          trueCard: null,
          disguisedCard: null,
          isJoker: false,
          isReady: true,
          guess: null,
          isAdmin: true,
        };

        const { data: lobbies, error: queryError } = await supabase
          .from('lobbies')
          .select()
          .eq('code', newLobbyCode);

        if (queryError) throw queryError;
        if (lobbies && lobbies.length > 0) {
          setError('Please try again, lobby code already exists');
          return;
        }

        const { error: createError } = await supabase
          .from('lobbies')
          .insert([
            {
              code: newLobbyCode,
              admin_id: newPlayer.id,
              status: 'waiting',
            },
          ]);

        if (createError) throw createError;

        setCurrentPlayer(newPlayer);
        setGameState(prev => ({
          ...prev,
          lobbyCode: newLobbyCode,
          adminId: newPlayer.id,
          players: [newPlayer],
        }));
        setError(null);
      } catch (err) {
        setError('Failed to create lobby. Please try again.');
        console.error('Lobby creation error:', err);
      }
    }
  };

  const handleJoinLobby = async () => {
    if (playerName.trim() && lobbyCode.trim()) {
      try {
        const { data: lobbies, error: queryError } = await supabase
          .from('lobbies')
          .select()
          .eq('code', lobbyCode.toUpperCase());

        if (queryError) throw queryError;
        if (!lobbies || lobbies.length === 0) {
          setError('Lobby not found');
          return;
        }

        const lobby = lobbies[0];
        if (lobby.status !== 'waiting') {
          setError('Game already in progress');
          return;
        }

        const newPlayer: Player = {
          id: Math.random().toString(36).substr(2, 9),
          name: playerName,
          trueCard: null,
          disguisedCard: null,
          isJoker: false,
          isReady: true,
          guess: null,
        };

        setCurrentPlayer(newPlayer);
        setGameState(prev => ({
          ...prev,
          lobbyCode: lobbyCode.toUpperCase(),
          adminId: lobby.admin_id,
          players: [...prev.players, newPlayer],
        }));
        setError(null);
      } catch (err) {
        setError('Failed to join lobby. Please try again.');
        console.error('Lobby join error:', err);
      }
    }
  };

  const broadcastGameState = async (newState: GameState) => {
    try {
      await supabase.channel(`lobby:${gameState.lobbyCode}`).send({
        type: 'broadcast',
        event: 'game_state',
        payload: newState,
      });
    } catch (err) {
      console.error('Broadcast error:', err);
      setError('Failed to update game state. Please try refreshing.');
    }
  };

  const handleStartGame = async () => {
    if (gameState.players.length >= gameState.minPlayers) {
      const playersWithCards = assignCards(gameState.players);
      const newState = {
        ...gameState,
        status: 'discussion',
        players: playersWithCards,
        phase: {
          timeRemaining: DISCUSSION_TIME,
          startTime: Date.now(),
        },
      };
      setGameState(newState);
      await broadcastGameState(newState);
    }
  };

  const handleStopGame = async () => {
    const newState = {
      ...gameState,
      status: 'waiting',
      players: gameState.players.map(player => ({
        ...player,
        trueCard: null,
        disguisedCard: null,
        isJoker: false,
        guess: null,
      })),
      phase: {
        timeRemaining: DISCUSSION_TIME,
        startTime: null,
      },
      round: 1,
      winner: null,
    };
    setGameState(newState);
    await broadcastGameState(newState);
  };

  const handleSkipPhase = async () => {
    const newState = gameState.status === 'discussion'
      ? {
          ...gameState,
          status: 'guessing',
          phase: {
            timeRemaining: GUESSING_TIME,
            startTime: Date.now(),
          },
        }
      : {
          ...gameState,
          status: 'results',
          phase: {
            timeRemaining: 0,
            startTime: null,
          },
        };
    
    setGameState(newState);
    await broadcastGameState(newState);
  };

  const handleNextRound = async () => {
    const playersWithCards = assignCards(gameState.players);
    const newState = {
      ...gameState,
      status: 'discussion',
      players: playersWithCards,
      phase: {
        timeRemaining: DISCUSSION_TIME,
        startTime: Date.now(),
      },
      round: gameState.round + 1,
      winner: null,
    };
    setGameState(newState);
    await broadcastGameState(newState);
  };

  const handleMakeGuess = async (guess: CardType) => {
    if (!currentPlayer) return;

    const updatedPlayers = gameState.players.map(player => 
      player.id === currentPlayer.id
        ? { ...player, guess }
        : player
    );

    const allPlayersGuessed = updatedPlayers.every(player => player.guess);
    
    if (allPlayersGuessed) {
      const jokers = updatedPlayers.filter(p => p.isJoker);
      const jokersGuessedWrong = jokers.some(joker => 
        joker.guess !== 'joker'
      );

      const newState = {
        ...gameState,
        status: 'results',
        players: updatedPlayers,
        winner: jokersGuessedWrong ? 'players' : 'jokers',
      };
      setGameState(newState);
      await broadcastGameState(newState);
    } else {
      const newState = {
        ...gameState,
        players: updatedPlayers,
      };
      setGameState(newState);
      await broadcastGameState(newState);
    }
  };

  const handleJokerCountChange = (count: number) => {
    setGameState(prev => ({
      ...prev,
      jokerCount: count,
    }));
  };

  const isAdmin = currentPlayer?.id === gameState.adminId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Find the Joker</h1>
          <p className="text-gray-600">A game of deception and deduction</p>
        </header>

        {error && (
          <div className="max-w-md mx-auto mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!currentPlayer ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">
                {isCreatingLobby ? 'Create Lobby' : 'Join Lobby'}
              </h2>
            </div>
            
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {!isCreatingLobby && (
              <input
                type="text"
                placeholder="Enter lobby code"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
            )}

            <div className="space-y-4">
              {isCreatingLobby ? (
                <button
                  onClick={handleCreateLobby}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Lobby
                </button>
              ) : (
                <button
                  onClick={handleJoinLobby}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Join Lobby
                </button>
              )}

              <button
                onClick={() => setIsCreatingLobby(!isCreatingLobby)}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {isCreatingLobby ? 'Join Existing Lobby' : 'Create New Lobby'}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {gameState.status === 'waiting' && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-900">
                    Lobby Code: {gameState.lobbyCode}
                  </h2>
                  <p className="text-gray-600">
                    Players: {gameState.players.length}
                  </p>
                </div>
                {isAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <label className="text-gray-700 font-medium">Number of Jokers:</label>
                      <div className="flex gap-2">
                        {[1, 2, 3].map((count) => (
                          <button
                            key={count}
                            onClick={() => handleJokerCountChange(count)}
                            className={`px-4 py-2 rounded-lg ${
                              gameState.jokerCount === count
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                        <button
                          onClick={() => handleJokerCountChange(Math.floor(Math.random() * 3) + 1)}
                          className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                        >
                          Random
                        </button>
                      </div>
                    </div>
                    {gameState.players.length >= gameState.minPlayers && (
                      <button
                        onClick={handleStartGame}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Start Game
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {(gameState.status === 'discussion' || gameState.status === 'guessing') && (
              <div className="mb-8">
                <GamePhase
                  phase={gameState.status}
                  timeRemaining={gameState.phase.timeRemaining}
                  round={gameState.round}
                />
                {isAdmin && (
                  <div className="space-y-4">
                    <button
                      onClick={handleSkipPhase}
                      className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Skip Phase
                    </button>
                    <button
                      onClick={handleStopGame}
                      className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <StopCircle className="w-5 h-5" />
                      Stop Game
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <PlayerList
                players={gameState.players}
                currentPlayerId={currentPlayer.id}
                onMakeGuess={handleMakeGuess}
                gameStatus={gameState.status}
              />
            </div>
            
            {gameState.status === 'results' && (
              <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                  {gameState.winner === 'players' ? 'Players Win!' : 'Jokers Win!'}
                </h2>
                {isAdmin && (
                  <button
                    onClick={handleNextRound}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Next Round
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;