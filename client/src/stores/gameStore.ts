import { create } from 'zustand';
import { Socket, io } from 'socket.io-client';

type GameState = {
    socket: Socket | null;
    roomId: string | null;
    opponentId: string | null;
};

type GameAction = {
    initializeGameSocket: () => void;
    updateState: (newState: Partial<GameState>) => void;
};

const useGameStore = create<GameState & GameAction>((set, get) => ({
    socket: null,
    roomId: null,
    opponentId: null,
    initializeGameSocket: () => {
        const { socket } = get();
        if (!socket) {
            const newSocket = io(`${import.meta.env.VITE_BASE_URL}/game`, {
                transports: ['websocket'],
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 1000,
                reconnectionAttempts: 5
            });
            set({ socket: newSocket });
        }
    },
    updateState: (newState) => set((state) => ({ ...state, ...newState }))
}));

export default useGameStore;

// roomId: string | null;
// mode: 'classic' | 'crazy' | 'IA' | null;
// isGameReady: boolean;
// isGameOver: boolean;
// isSecondPlayer: boolean;
// paddleSpeed: number;
// firstPaddlePos: number;
// secondPaddlePos: number;
// ballPos: { x: number; y: number };
// rightScore: number;
// leftScore: number;

// roomId: null,
// mode: null,
// isGameOver: false,
// isGameReady: false,
// isSecondPlayer: false,
// paddleSpeed: 0.2,
// firstPaddlePos: 0,
// secondPaddlePos: 0,
// ballPos: { x: 0, y: 0 },
// rightScore: 0,
// leftScore: 0,
