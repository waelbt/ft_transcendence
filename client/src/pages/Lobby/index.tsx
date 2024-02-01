import { useNavigate } from 'react-router-dom';
import useGameStore, { GameMode } from '../../stores/gameStore';
import { useEffect } from 'react';

export function Lobby() {
    const { updateState, socket, initializeGameSocket } = useGameStore();
    const navigate = useNavigate();

    const handleClick = () => {
        updateState({ gameMode: GameMode.Classic });
        socket?.emit('gameMode', 'classic');
    };

    useEffect(() => {

        socket?.on('startgame', ({ room, SecondPlayer, chosen }) => {
            updateState({ isSecondPlayer: SecondPlayer });
            updateState({ roomId: room });
            updateState({ isGameReady: true });
            navigate('/game');
            console.log(chosen);
        });

        return () => {
            socket?.off('startgame');
        };
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <button className="p-4 bg-red-500 text-white" onClick={handleClick}>
                classic{' '}
            </button>
        </div>
    );
}

// if (gameMode === null) {
//     return (
//         <div className="container">
//             <button
//                 className="custom-button"
//                 onClick={() => setGameMode('classic')}
//             >
//                 Classic
//             </button>
//             <button
//                 className="custom-button"
//                 onClick={() => setGameMode('crazy')}
//             >
//                 Crazy
//             </button>
//             <button
//                 className="custom-button"
//                 onClick={() => setGameMode('IA')}
//             >
//                 IA
//             </button>
//         </div>
//     );
// }
