import { useNavigate } from 'react-router-dom';
import useGameStore from '../../stores/gameStore';
import { useEffect, useState } from 'react';
import { useModelStore } from '../../stores/ModelStore';
import { Modal } from '../../components';
import { useUserStore } from '../../stores/userStore';

interface RoomCreatedData {
    roomId: string;
    opponentId: string;
}

export function home() {
    const { id } = useUserStore();
    const { isEventOpen, openEvent } = useModelStore();
    const { socket } = useGameStore();
    const navigate = useNavigate();
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    const startTimer = () => {
        setElapsedTime(0);
        const newTimer = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);
        setTimer(newTimer);
    };

    const handleClick = () => {
        socket?.emit('gameMode', { mode: 'classic', userId: id });
        openEvent();
        startTimer();
    };

    useEffect(() => {
        // Define the event handler inside the effect
        const handleRoomCreated = (data: RoomCreatedData) => {
            console.log('Room ID:', data.roomId);
            console.log('Opponent ID:', data.opponentId);

            if (timer) {
                clearInterval(timer);
                setTimer(null);
            }

            navigate(`/play/${data.roomId}`);
        };

        // Add the event listener
        socket?.on('roomCreated', handleRoomCreated);

        // Return a cleanup function
        return () => {
            // Clean up the event listener
            if (socket) {
                socket.off('roomCreated', handleRoomCreated);
            }

            // Clean up the timer
            if (timer) {
                clearInterval(timer);
                setTimer(null);
            }
        };
    }, [socket, navigate, timer]);

    return (
        <div className="flex flex-col gap-2">
            <button className="p-4 bg-red-500 text-white" onClick={handleClick}>
                classic{' '}
            </button>
            {isEventOpen && (
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
                    {/* // ? cancel button here */}
                </Modal>
            )}
        </div>
    );
}
