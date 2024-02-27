import useGameStore from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';
import { Modal } from '../../components';
import { useEffect, useState } from 'react';
import LeaderBoard from '../../components/LeaderBoard';
import useTimer from '../../hooks/timer';
import classicBackground from './classic.jpeg';
import crazyBackground from './crazy2.jpeg';
import trainingBackground from './train2.jpeg';
import toast from 'react-hot-toast';
export function Lobby() {
    const MODES = ['classic', 'crazy', 'training'];

    const { updateState, socket, gameMode } = useGameStore();
    // const navigate = useNavigate();
    const { id } = useUserStore();
    const [isEventOpen, setIsEventOpen] = useState(false);

    const { elapsedTime, formatTime, startTimer } = useTimer();

    const handleClick = (gameMode: string) => {
        // if (!inGame) {
        // upatedUserState({ inGame: true });
        updateState({ gameMode: gameMode });
        socket?.emit('gameMode', { gameMode, userId: id });
        setIsEventOpen(true);
        startTimer();
        // }
        // else
        // toast.error("you can't join two game in the same time");
    };

    const { socket: gameSocket } = useGameStore();

    const modeImages: { [key: string]: string } = {
        classic: classicBackground,
        crazy: crazyBackground,
        training: trainingBackground
    };

    useEffect(() => {
        gameSocket?.on('error', (message: string) => {
            toast.success(message);
            setIsEventOpen(false);
        });

        return () => {
            gameSocket?.off('error');
        };
    }, [gameSocket]);

    useEffect(() => {
        gameSocket?.on('gameCanceled', (message) => {
            toast.error(message);
            setIsEventOpen(false);
        });

        return () => {
            gameSocket?.off('gameCanceled');
        };
    }, [gameSocket]);

    return (
        <>
            <div className="p-2.5 h-full  flex-col justify-center items-center gap-2.5 inline-flex ">
                <div className="self-stretch px-[167px] py-[13px] justify-center items-center gap-[60px] inline-flex">
                    {MODES.map((mode, index) => (
                        <div
                            key={`mode-${index}`}
                            onClick={() => handleClick(mode)}
                        >
                            <img
                                src={modeImages[mode]}
                                alt={`${mode} Mode Background`}
                                className="w-[320px] h-[200px]  bg-white rounded-[40px] border border-stone-300  justify-center items-center gap-2.5 flex cursor-pointer"
                            />
                        </div>
                    ))}
                    {isEventOpen && (
                        <Modal
                            removable={true}
                            isEventOpen={isEventOpen}
                            closeEvent={() => {
                                socket?.emit('leaveGameMode', {
                                    gameMode,
                                    userId: id
                                });

                                setIsEventOpen(false);
                            }}
                        >
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
                                    Please wait while we find an opponent for
                                    you..
                                </p>{' '}
                                <div className="w-full text-left">
                                    <p>
                                        Waiting time: {formatTime(elapsedTime)}
                                    </p>
                                </div>
                                <div
                                    className="w-full text-center cursor-pointer text-4xl font-['Acme']"
                                    onClick={() => {
                                        socket?.emit('leaveGameMode', {
                                            gameMode,
                                            userId: id
                                        });

                                        setIsEventOpen(false);
                                    }}
                                >
                                    cancel
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                    <div className="w-[350px] h-[0px] border border-zinc-400"></div>
                    <div className="text-center text-zinc-400 text-lg font-normal font-['Acme']">
                        Leaderboard
                    </div>
                    <div className="w-[350px] h-[0px] border border-zinc-400"></div>
                </div>
                <LeaderBoard />
            </div>
        </>
    );
}
