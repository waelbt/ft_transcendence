import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_BASE_URL}/game`); // ! user store maybe

const GameProvider = ({ children }: { children: React.ReactNode }) => {
    socket.on('connect', () => {
        // console.log("connected!");
        // console.log(socket.id);
    });

    return (
        <GameContext.Provider value={{ socket: socket }}>
            {children}
        </GameContext.Provider>
    );
};
const GameContext = createContext({
    socket: socket
});

const useGame = () => {
    return useContext(GameContext);
};

export { GameProvider, useGame };
