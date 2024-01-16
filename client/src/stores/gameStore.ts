import { create } from 'zustand';

type GameState = {
    roomId: string | null;
    mode: 'classic' | 'crazy' | 'IA' | null;
    isGameReady: boolean;
    isGameOver: boolean;
    isSecondPlayer: boolean;
    paddleSpeed: number;
    firstPaddlePos: number;
    secondPaddlePos: number;
    ballPos: { x: number; y: number };
    rightScore: number;
    leftScore: number;
};

type GameAction = {
    updateState: (newState: Partial<GameState>) => void;
};

const useGameStore = create<GameState & GameAction>((set) => ({
    roomId: null,
    mode: null,
    isGameOver: false,
    isGameReady: false,
    isSecondPlayer: false,
    paddleSpeed: 0.2,
    firstPaddlePos: 0,
    secondPaddlePos: 0,
    ballPos: { x: 0, y: 0 },
    rightScore: 0,
    leftScore: 0,
    updateState: (newState) => set((state) => ({ ...state, ...newState }))
}));

export default useGameStore;
