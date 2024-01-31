import { useEffect } from 'react';
// import { MatchPanel } from '../../components/MatchPanel';
import useGameStore from '../../stores/gameStore';
// import useTimer from '../../hooks/timer';
// import useFriendPrevious from '../../hooks/friendPreviousHook';
import Game from '../../components/game';
import { useUserStore } from '../../stores/userStore';

export const play = () => {
    const { id } = useUserStore();
    const { socket, initializeGameSocket, updateState } = useGameStore();

    useEffect(() => {
        initializeGameSocket();
        return () => {
            socket?.disconnect();
        };
    }, []);

    useEffect(() => {
        socket?.on('gameSetup', (data) => {
            updateState({
                roomId: data.roomId,
                opponentId: data.opponentUserId
            });
        });

        return () => {
            socket?.off('gameSetup');
        };
    }, [socket, initializeGameSocket, updateState]);
    const handleSubmit = () => {
        socket?.emit('selectMode', { userId: id, mode: 'classic' });
    };
    return (
        <div className="flex-grow h-full p-2.5 flex-col justify-center items-center gap-5 inline-flex">
            {/* <MatchPanel opponent={opponent} isStarted={success} /> */}
            <button
                className="bg-red-600 text-white p-2 text-lg"
                onClick={handleSubmit}
            >
                start
            </button>
            <div className="bg-white">
                <Game />
            </div>
        </div>
    );
};
