import { createContext, useContext} from "react";
import { io } from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_BASE_URL}/game`); // ! user store maybe 

const GameProvider = ({ children }: { children: React.ReactNode }) => {
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

// <div className="w-[478px] h-[446px] p-[15px] left-0 top-0 absolute flex-col justify-start items-center gap-2.5 inline-flex">
// <div className="self-stretch justify-start items-start">
//     {/* onClick={onClose} */}
//     <ImCross className="text-white" />
//     {/* //! share icon */}
// </div>
//     <div className="text-white text-[52px] font-normal font-['Acme']">
//         You won!
//     </div>
//     <div className="justify-center items-center gap-5 inline-flex">
//         <div className="flex-col justify-start items-center gap-[5px] inline-flex">
//             <img
//                 className="rounded-[10px] shadow border-4 border-green-600"
//                 src="https://via.placeholder.com/130x130"
//             />
//             <div className="text-neutral-500 text-[26px] font-normal font-['Acme']">
//                 waelbt
//             </div>
//         </div>
//         <div className="self-stretch flex-col justify-center items-center gap-5 inline-flex">
//             <div className="w-[50px] h-[50px] relative"></div>
//             <div className="text-neutral-500 text-[26px] font-normal font-['Acme']">
//                 5 - 1
//             </div>
//         </div>
//         <div className="flex-col justify-start items-center gap-[5px] inline-flex">
//             <img
//                 className="w-[130px] h-[130px] relative rounded-[10px] shadow border-2 border-neutral-500"
//                 src="https://via.placeholder.com/130x130"
//             />
//             <div className="text-neutral-500 text-[26px] font-normal font-['Acme']">
//                 daiseken
//             </div>
//         </div>
//     </div>
//     <div className="pb-[5px] flex-col justify-center items-center gap-2.5 flex">
//         <div className="text-neutral-500 text-[22px] font-normal font-['Acme'] leading-7">
//             Awarded
//         </div>
//         <div className="text-green-600 text-[22px] font-normal font-['Acme'] leading-7">
//             +50 exp
//         </div>
//     </div>
//     <div className="justify-center items-start gap-20 inline-flex">
//         <div className="px-[30px] py-2.5 bg-zinc-300 rounded-[5px] shadow justify-center items-center gap-2.5 flex">
//             <div className="text-neutral-500 text-[28px] font-normal font-['Acme'] leading-9">
//                 Rematch
//             </div>
//         </div>
//         <div className="px-[30px] py-2.5 bg-zinc-300 rounded-[5px] shadow justify-center items-center gap-2.5 flex">
//             <div className="text-neutral-500 text-[28px] font-normal font-['Acme'] leading-9">
//                 New game
//             </div>
//         </div>
//     </div>
// </div>;