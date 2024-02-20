import { useNavigate } from 'react-router-dom';
import useGameStore from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';
import { useModelStore } from '../../stores/ModelStore';
import useTimer from '../../hooks/timer';
import { Modal } from '../../components';
import { useEffect } from 'react';
import LeaderBoard from '../../components/LeaderBoard';

export function Lobby() {
    const MODES = ['classic', 'crazy', 'training'];

    const { updateState, socket } = useGameStore();
    const navigate = useNavigate();
    const { id } = useUserStore();
    const { isEventOpen, openEvent, closeEvent } = useModelStore();
    const { elapsedTime, formatTime, startTimer } = useTimer();

    const handleClick = (gameMode: string) => {
        updateState({ gameMode: gameMode });
        socket?.emit('gameMode', { gameMode, userId: id });
        openEvent();
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
            closeEvent();
            navigate(`/game/${room}`);
        });

        return () => {
            socket?.off('startgame');
        };
    });
    return (
        <>
            <div className="p-2.5 h-full  flex-col justify-center items-center gap-2.5 inline-flex">
                {/* <div className="self-stretch">
                    <span className="text-rose-600 text-base font-normal font-['Poppins']">
                        Good Morning,{' '}
                    </span>
                    <span className="text-zinc-400 text-base font-normal font-['Poppins']">
                        {' '}
                    </span>
                    <span className="text-black text-xl font-normal font-['Acme']">
                        dos404
                    </span>
                </div> */}
                {/* <div className="self-stretch grow shrink basis-0 px-[100px] py-5 flex-col justify-end items-center gap-2.5 flex">
                    <div className="self-stretch grow shrink basis-0 p-2.5 bg-white rounded-[40px] border border-black justify-center items-center gap-2.5 inline-flex">
                        <div className="w-[800px] text-right text-black text-[50px] font-normal font-['Acme']">
                            Crafted with dedication, our playground is a
                            testament to our efforts for your gaming enjoyment
                        </div>
                    </div>
                </div> */}

                {/* <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                    <div className="w-[350px] h-[0px] border border-zinc-400"></div>
                    <div className="text-center text-zinc-400 text-lg font-normal font-['Acme']">
                        modes
                    </div>
                    <div className="w-[350px] h-[0px] border border-zinc-400"></div>
                </div> */}
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

//! needed later

// <div className="flex flex-col gap-2">

// </div>
