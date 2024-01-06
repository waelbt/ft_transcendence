import { create } from 'zustand';

type GameStateType = {
    paddlepos1: number;
    roomid: any; // Consider using a more specific type instead of 'any'
    isSecondPlayer: boolean; // Changed from number to boolean for clarity
    chosenMode: string;
    leftColor: string;
    rightColor: string;
    firstPaddlePos: any;
    secondPaddlePos: number;
    isGameReady: boolean;
    gameMode: null | string;
};

type GameStateAction = {
    updateState: (newState: Partial<GameStateType>) => void;
};

export const useGameStore = create<GameStateType & GameStateAction>((set) => ({
    paddlepos1: 0,
    roomid: null, // Default value changed to null
    isSecondPlayer: false,
    chosenMode: '',
    leftColor: '',
    rightColor: '',
    firstPaddlePos: 0,
    secondPaddlePos: 0,
    isGameReady: false,
    gameMode: null,
    updateState: (newState) => set((state) => ({ ...state, ...newState }))
}));

// import { create } from 'zustand';

// type GameStateType = {
//     paddlepos1: number;
//     roomid: any;
//     isSecondPlayer: number;
//     chosenMode: string;
//     leftColor: string;
//     rightColor: string;
// };

// type GameStateAction = {
//     updateState: (newState: Partial<GameStateType>) => void;
//     // updatePaddlepos1: (paddlepos1: GameStateType['paddlepos1']) => void;
//     // updateRoomid: (roomid: GameStateType['roomid']) => void;
//     // updateIsSecondPlayer: (
//     //     isSecondPlayer: GameStateType['isSecondPlayer']
//     // ) => void;
//     // updatechosenMode: (chosenMode: GameStateType['chosenMode']) => void;
//     // updateleftColor: (leftColor: GameStateType['leftColor']) => void;
//     // updaterightColor: (rightColor: GameStateType['rightColor']) => void;
// };

// export const useGameStore = create<GameStateType & GameStateAction>((set) => ({
//     paddlepos1: 0,
//     roomid: 0,
//     isSecondPlayer: 0,
//     chosenMode: '',
//     leftColor: '',
//     rightColor: '',
//     updateState: (newState) => set(state => ({ ...state, ...newState })),

// //     updatePaddlepos1: (paddlepos1) => set(() => ({ paddlepos1: paddlepos1 })),
// //     updateRoomid: (roomid) => set(() => ({ roomid: roomid })),
// //     updateIsSecondPlayer: (isSecondPlayer) =>
// //         set(() => ({ isSecondPlayer: isSecondPlayer })),
// //     updatechosenMode: (chosenMode) => set(() => ({ chosenMode: chosenMode })),
// //     updateleftColor: (leftColor) => set(() => ({ leftColor: leftColor })),
// //     updaterightColor: (rightColor) => set(() => ({ rightColor: rightColor }))
// // }));
