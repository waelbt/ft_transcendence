import { create } from 'zustand';

type GameStateType = {
    paddlepos1: number;
    roomid: any;
    isSecondPlayer: number;
    chosenMode: string;
    leftcolor: string;
    rightcolor: string;
};

type GameStateAction = {
    updatePaddlepos1: (paddlepos1: GameStateType['paddlepos1']) => void;
    updateRoomid: (roomid: GameStateType['roomid']) => void;
    updateIsSecondPlayer: (
        isSecondPlayer: GameStateType['isSecondPlayer']
    ) => void;
    updatechosenMode: (chosenMode: GameStateType['chosenMode']) => void;
    updateLeftcolor: (leftcolor: GameStateType['leftcolor']) => void;
    updateRightcolor: (rightcolor: GameStateType['rightcolor']) => void;
};

export const useGameStore = create<GameStateType & GameStateAction>((set) => ({
    paddlepos1: 0,
    roomid: 0,
    isSecondPlayer: 0,
    chosenMode: '',
    leftcolor: '',
    rightcolor: '',
    updatePaddlepos1: (paddlepos1) => set(() => ({ paddlepos1: paddlepos1 })),
    updateRoomid: (roomid) => set(() => ({ roomid: roomid })),
    updateIsSecondPlayer: (isSecondPlayer) =>
        set(() => ({ isSecondPlayer: isSecondPlayer })),
    updatechosenMode: (chosenMode) => set(() => ({ chosenMode: chosenMode })),
    updateLeftcolor: (leftcolor) => set(() => ({ leftcolor: leftcolor })),
    updateRightcolor: (rightcolor) => set(() => ({ rightcolor: rightcolor }))
}));
