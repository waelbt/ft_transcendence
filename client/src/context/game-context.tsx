import { createContext, useContext} from "react";
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000/game');

const GameProvider = ({ children }: { children: React.ReactNode }) => {
    // const [sock , setSock] = useState() as any;
    // setSock(io('http://localhost:3001/game'));
    socket.on('connect', () => {
    console.log("connected!");
    console.log(socket.id);
    });


    return (
        <GameContext.Provider value={{socket: socket}}>
        {children}
        </GameContext.Provider>
    );
}
const GameContext = createContext({
    socket: socket,
});

const useGame = () => {
  return useContext(GameContext);
};

export { GameProvider, useGame };
