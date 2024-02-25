import { create } from 'zustand';
import { Socket, io } from 'socket.io-client';
import { useEffect } from 'react';

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

// export enum GameMode {
//     Classic = 'classic',
//     Crazy = 'crazy',
//     Training = 'AI'
// }

type GameState = {
    isSecondPlayer: false | boolean;
    socket: Socket | null;
    roomId: string | null;
    gameMode: string | null;
    opponentId: string | null;
    ball: Ball;
    myPaddle: Paddle;
    opponentPaddle: Paddle;
    canvasHeight: number;
    canvasWidth: number;
    speed: number;
    movePaddle: number;
    isGameOver: boolean;
    isGameReady: boolean;
};

type GameAction = {
    initializeGameSocket: (token: string | null) => void;
    updateState: (newState: Partial<GameState>) => void;
    moveMyPaddle: (y: number) => void;
    updateBallPosition: (x: number, y: number) => void;
    updateOpponentPaddlePosition: (y: number) => void;
    // updatePaddlePosition: () => void;
};

const useGameStore = create<GameState & GameAction>((set, get) => ({
    // Initial state
    isSecondPlayer: false,
    socket: null,
    roomId: null,
    opponentId: null,
    gameMode: null,
    ball: { x: 400, y: 300, vx: 5, vy: 5 },
    myPaddle: { x: 30, y: 250, height: 100 },
    opponentPaddle: { x: 760, y: 250, height: 100 },
    canvasHeight: 600,
    canvasWidth: 800,
    speed: 50,
    movePaddle: 0,
    isGameOver: false,
    isGameReady: false,
    // Actions
    updateState: (newState) => set((state) => ({ ...state, ...newState })),
    initializeGameSocket: (token) => {
        const { socket } = get();
        if (token && !socket) {
            const newSocket = io(`${import.meta.env.VITE_BASE_URL}/game`, {
                path: '/socket.io',
                transports: ['websocket'],
                secure: true,
                auth: { token: token }
            });
            set({ socket: newSocket });
        }
    },
    updateBallPosition: (x: number, y: number) =>
        set((state) => ({
            ball: { ...state.ball, x, y }
        })),
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
        const { socket, myPaddle, roomId, isSecondPlayer } = get();
        socket?.emit('paddlemove', {
            room: roomId,
            pos: myPaddle,
            SecondPlayer: isSecondPlayer
        });
    },
    updateOpponentPaddlePosition(y) {
        set((state) => ({
            opponentPaddle: {
                ...state.opponentPaddle,
                y
            }
        }));
    }
}));

export default useGameStore;
