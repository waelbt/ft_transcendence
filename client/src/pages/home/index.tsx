import { useNavigate } from 'react-router-dom';
import useGameStore, { GameMode } from '../../stores/gameStore';
import { useEffect } from 'react';
import { useModelStore } from '../../stores/ModelStore';
import { Modal } from '../../components';
import { useUserStore } from '../../stores/userStore';
import useTimer from '../../hooks/timer';

interface RoomCreatedData {
    roomId: string;
    opponentId: string;
}

export function home() {
    // const { id } = useUserStore();
    // const { isEventOpen, openEvent } = useModelStore();
    const { updateState, socket } = useGameStore();
    const navigate = useNavigate();
    // const { elapsedTime, formatTime, startTimer, stopTimer } = useTimer();

    const handleClick = () => {
        updateState({ gameMode: GameMode.Classic });
        socket?.emit('gameMode', 'classic');
    };
    useEffect(() => {
        console.log('test');
        socket?.on('startgame', ({ room, SecondPlayer, chosen }) => {
            updateState({ isSecondPlayer: SecondPlayer });
            updateState({ roomId: room });
            navigate('/game');
            console.log(chosen);
        });

        return () => {
            socket?.off('startgame');
        };
    }, [socket]);

    // useEffect(() => {
    //     const handleRoomCreated = (data: RoomCreatedData) => {
    //         updateState(data);
    //         stopTimer();
    //         navigate(`/play/${data.roomId}`);
    //     };

    //     socket?.on('roomCreated', handleRoomCreated);

    //     return () => {
    //         if (socket) socket.off('roomCreated', handleRoomCreated);
    //         stopTimer();
    //     };
    // }, [socket, navigate]);

    return (
        <div className="flex flex-col gap-2">
            <button className="p-4 bg-red-500 text-white" onClick={handleClick}>
                classic{' '}
            </button>
            {/* {isEventOpen && (
                <Modal removable={false}>
                    <div className="flex flex-col gap-4 text-white">
                        <h2 className=' font-["Acme"] text-7xl'>
                            Searching for a match...
                        </h2>
                        <p className="text-xl">
                            Please wait while we find an opponent for you..
                        </p>{' '}
                        <div className="w-full text-center">
                            <p>Waiting time: {formatTime(elapsedTime)}</p>
                        </div>
                    </div>
                </Modal>
            )} */}
        </div>
    );
}
