import { create } from 'zustand';
import { Socket, io } from 'socket.io-client';

interface Ball {
    x: number;
    y: number;
    vx: number; // Velocity in x direction
    vy: number; // Velocity in y direction
}

interface Paddle {
    x: number;
    y: number;
    height: number; // Paddle height
}

type GameState = {
    socket: Socket | null;
    roomId: string | null;
    opponentId: string | null;
    ball: Ball;
    myPaddle: Paddle;
    opponentPaddle: Paddle;
    canvasHeight: number;
    canvasWidth: number;
    speed: number;
};

type GameAction = {
    initializeGameSocket: () => void;
    updateState: (newState: Partial<GameState>) => void;
    moveMyPaddle: (y: number) => void;
    updateBallPosition: (x: number, y: number) => void;
    updateOpponentPaddlePosition: (y: number) => void;
};

const useGameStore = create<GameState & GameAction>((set, get) => ({
    // Initial state
    socket: null,
    roomId: null,
    opponentId: null,
    ball: { x: 400, y: 300, vx: 5, vy: 5 },
    myPaddle: { x: 30, y: 250, height: 100 },
    opponentPaddle: { x: 760, y: 250, height: 100 },
    canvasHeight: 600,
    canvasWidth: 800,
    speed: 50,
    // Actions
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
    updateState: (newState) => set((state) => ({ ...state, ...newState })),
    moveMyPaddle: (y) => {
        set((state) => ({
            myPaddle: {
                ...state.myPaddle,
                y: Math.max(
                    Math.min(y, state.canvasHeight - state.myPaddle.height),
                    0
                )
            }
        }));
    },
    updateBallPosition: (x, y) => {
        set((state) => ({
            ball: { ...state.ball, x, y }
        }));
    },
    updateOpponentPaddlePosition: (y) => {
        set((state) => ({
            opponentPaddle: {
                ...state.opponentPaddle,
                y: Math.max(
                    Math.min(
                        y,
                        state.canvasHeight - state.opponentPaddle.height
                    ),
                    0
                )
            }
        }));
    }
}));

export default useGameStore;
