import { useNavigate } from 'react-router-dom';
import useGameStore from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';

export function Lobby() {
    const MODES = ['classic', 'crazy', 'training'];
    const { updateState, socket } = useGameStore();
    const navigate = useNavigate();
    const { id } = useUserStore();

    const handleClick = (gameMode: string) => {
        console.log('handleClick');
        updateState({ gameMode: gameMode });
        socket?.emit('gameMode', { gameMode, id });
        navigate('/game');
    };

    return (
        <div className="flex flex-col gap-2">
            {MODES.map((mode) => (
                <button
                    className="p-4 bg-red-500 text-white"
                    onClick={() => handleClick(mode)}
                >
                    {mode}
                </button>
            ))}
        </div>
    );
}
