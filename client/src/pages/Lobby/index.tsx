import { useNavigate } from 'react-router-dom';
import useGameStore from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';
import { Modal } from '../../components';
import { useEffect, useState } from 'react';
import LeaderBoard from '../../components/LeaderBoard';
import useTimer from '../../hooks/timer';

export function Lobby() {
    const MODES = ['classic', 'crazy', 'training'];

    const { updateState, socket } = useGameStore();
    const navigate = useNavigate();
    const { id } = useUserStore();
    const [isEventOpen, setIsEventOpen] = useState(false);

    const { elapsedTime, formatTime, startTimer } = useTimer();

    const handleClick = (gameMode: string) => {
        updateState({ gameMode: gameMode });
        socket?.emit('gameMode', { gameMode, userId: id });
        setIsEventOpen(true);
        startTimer();
    };

    useEffect(() => {
        socket?.on('startgame', ({ room, SecondPlayer, opponentId }) => {
            updateState({
                isSecondPlayer: SecondPlayer === 1,
                roomId: room,
                isGameReady: true,
                opponentId
            });
            setIsEventOpen(false);
            navigate(`/game/${room}`);
        });

        return () => {
            socket?.off('startgame');
        };
    });
    return (
        <>
            <div className="p-2.5 h-full  flex-col justify-center items-center gap-2.5 inline-flex">
                <div className="self-stretch px-[167px] py-[13px] justify-center items-center gap-[60px] inline-flex">
                    {MODES.map((mode, index) => (
                        <div
                            key={`mode-${index}`}
                            onClick={() => handleClick(mode)}
                            className="w-[300px] h-[170px] p-2.5 bg-white rounded-[40px] border border-black justify-center items-center gap-2.5 flex cursor-pointer"
                        >
                            <div className="text-black text-[33px] font-normal font-['Acme'] leading-[42.90px]">
                                {mode}
                            </div>
                        </div>
                    ))}
                    {isEventOpen && (
                        <Modal
                            removable={false}
                            isEventOpen={isEventOpen}
                            closeEvent={() => setIsEventOpen(false)}
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
