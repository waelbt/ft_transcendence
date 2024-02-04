import { useNavigate } from 'react-router-dom';
import useGameStore from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';

export function Lobby() {
    const MODES = ['classic', 'crazy' , 'IA'];
    const { updateState, socket } = useGameStore();
    const navigate = useNavigate();
    const { id } = useUserStore();

    const handleClick = (mode: string) => {
        console.log('handleClick');
        updateState({ gameMode: mode });
        socket?.emit('gameMode', { gameMode: mode, id });
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
