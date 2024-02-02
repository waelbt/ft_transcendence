import { useNavigate } from 'react-router-dom';
import useGameStore, { GameMode } from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';

export function Lobby() {
    const { updateState, socket } = useGameStore();
    const navigate = useNavigate();
    const { id } = useUserStore();

    const handleClick = () => {
        console.log('handleClick');
        updateState({ gameMode: GameMode.Classic });
        socket?.emit('gameMode', {gameMode: 'classic', id});
        navigate('/game');

    };


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
