export type CardType = 'hearts' | 'diamonds' | 'rectangle' | 'joker';

export interface Player {
  id: string;
  name: string;
  trueCard: CardType | null;
  disguisedCard: CardType | null;
  isJoker: boolean;
  isReady: boolean;
  guess: CardType | null;
  isAdmin?: boolean;
}

export interface GameState {
  status: 'waiting' | 'discussion' | 'guessing' | 'results' | 'ended';
  players: Player[];
  phase: {
    timeRemaining: number;
    startTime: number | null;
  };
  round: number;
  winner: string | null;
  lobbyCode: string;
  adminId: string | null;
  minPlayers: number;
}

export interface CardVisibility {
  showTrueCard: boolean;
  showDisguisedCard: boolean;
}

export interface LobbyInfo {
  code: string;
  playerCount: number;
  status: string;
  adminName: string;
}