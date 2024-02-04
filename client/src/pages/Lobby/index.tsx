import { useNavigate } from 'react-router-dom';
import useGameStore from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';
import { useModelStore } from '../../stores/ModelStore';
import useTimer from '../../hooks/timer';
import { Modal } from '../../components';
import { useEffect } from 'react';

export function Lobby() {
    const MODES = ['classic', 'crazy', 'training'];
    const { updateState, socket } = useGameStore();
    const navigate = useNavigate();
    const { id } = useUserStore();
    const { isEventOpen, openEvent, closeEvent } = useModelStore();
    const { elapsedTime, formatTime, startTimer, stopTimer } = useTimer();
    const handleClick = (gameMode: string) => {
        console.log('handleClick');
        updateState({ gameMode: gameMode });
        socket?.emit('gameMode', { gameMode, userId: id });
        // navigate('/game');
        openEvent();
        startTimer();
    };

    useEffect(() => {
        console.log('useEffect');
        socket?.on('startgame', ({ room, SecondPlayer, opponentId }) => {
            updateState({ isSecondPlayer: SecondPlayer === 1 });
            updateState({ roomId: room });
            updateState({ isGameReady: true });
            updateState({ opponentId: opponentId });
            console.log(opponentId, '   ', id);
            closeEvent();
            navigate('/game');
        });

        return () => {
            socket?.off('startgame');
        };
    });
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
            {isEventOpen && (
                <Modal removable={false}>
                    <div
                        className="flex flex-col gap-4 text-white"
                        style={{
                            animation: 'fade 1.5s infinite'
                        }}
                    >
                        <h2 className=' font-["Acme"] text-7xl'>
                            Searching for a match...
                        </h2>
                        <p className="text-xl">
                            Please wait while we find an opponent for you..
                        </p>{' '}
                        <div className="w-full text-left">
                            <p>Waiting time: {formatTime(elapsedTime)}</p>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
