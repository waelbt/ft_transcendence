import React, { useEffect } from 'react';
import './index.css';
import useGameStore from '../../stores/gameStore';
// import { Lobby } from '../Lobby';
import useAxiosPrivate from '../../hooks/axiosPrivateHook';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import useFriendPrevious from '../../hooks/friendPreviousHook';
import { Avatar } from '../../components';
import Skeleton from 'react-loading-skeleton';
import classicBackground from './classic.jpeg';
import crazyBackground from './bg.jpeg';
import trainingBackground from './trr.jpeg';

function removeDecimalPart(number: number): number {
    return Math.floor(number);
}

let paddlepos1: number;
// let roomId: any;
// let isSecondPlayer: number;
// let chosenMode: string;
// let leftcolor: string;
// let rightcolor: string;

// const Score = ({
//     leftScore,
//     rightScore,
//     lColor,
//     rColor
// }: {
//     leftScore: number;
//     rightScore: number;
//     lColor: string;
//     rColor: string;
// }) => {
//     const leftScoreStyle: React.CSSProperties = {
//         position: 'absolute',
//         left: '15%',
//         top: '0',
//         textAlign: 'center',
//         color: `${lColor}`,
//         fontSize: '3rem',
//         paddingTop: '5%',
//         fontFamily: 'Arial, sans-serif',
//         zIndex: 1
//     };

//     const rightScoreStyle: React.CSSProperties = {
//         position: 'absolute',
//         right: '15%',
//         top: '0',
//         textAlign: 'center',
//         color: `${rColor}`,
//         fontSize: '3rem',
//         paddingTop: '5%',
//         fontFamily: 'Arial, sans-serif',
//         zIndex: 1
//     };

//     return (
//         <>
//             <div style={leftScoreStyle}>{leftScore}</div>
//             <div style={rightScoreStyle}>{rightScore}</div>
//         </>
//     );
// };

const Paddle = ({ color, pos }: { color: string; pos: string }) => {
    const paddleStyle: React.CSSProperties = {
        width: '1.375rem',
        height: '6.625rem',
        backgroundColor: color,
        position: 'relative',
        top: `${pos}`,
        boxShadow: `0 0 1.25rem ${color}`,
        marginInline: '1.25rem',
        zIndex: 6
    };

    return <div style={paddleStyle}></div>;
};

const Ball = ({ }, { }) => {
    const [ballPos, setBallPos] = React.useState({ x: 0, y: 0 });
    const [ballColor, setBallColor] = React.useState('white');
    const [shadow, setShadow] = React.useState('0 0 1.25rem white');
    const { socket, gameMode, isSecondPlayer } = useGameStore();
    const ballStyle: React.CSSProperties = {
        width: '1.5625rem', // 25px
        height: '1.5625rem', // 25px
        backgroundColor: ballColor,
        borderRadius: '50%',
        position: 'relative',
        display: ballColor,
        left: `${ballPos.x}rem`,
        top: `${ballPos.y}rem`,
        boxShadow: shadow // 20px
    };
    React.useEffect(() => {
        socket?.on('ballmove', function (newPosition) {
            setBallPos(
                isSecondPlayer === false
                    ? { x: -newPosition.x, y: newPosition.y }
                    : newPosition
            );
        });

        return () => {
            socket?.off('ballmove');
        };
    }, [socket]);
    if (gameMode == 'crazy') {
        React.useEffect(() => {
            const interval = setInterval(() => {
                // Toggle the ball color between its original color and the background color
                setBallColor((prevColor) =>
                    prevColor === 'white' ? 'black' : 'white'
                );
                setShadow((prevShadow) =>
                    prevShadow === 'none' ? '0 0 1.25rem white' : 'none'
                );
            }, 200);
            return () => clearInterval(interval); // Clear the interval when the component unmounts
        }, []);

        React.useEffect(() => {
            const interval = setInterval(() => {
                // Toggle the ball color between its original color and the background color
                setBallColor((prevColor) =>
                    prevColor === 'black' ? 'white' : 'black'
                );
                setShadow((prevShadow) =>
                    prevShadow === '0 0 1.25rem white'
                        ? 'none'
                        : '0 0 1.25rem white'
                );
            }, 1000);
            return () => clearInterval(interval); // Clear the interval when the component unmounts
        }, []);
    }

    return <div style={ballStyle}></div>;
};

export function Game() {
    const [firstPaddlePos, setFirstPaddlePos] = React.useState(0);
    const movePaddle = React.useRef(0);

    const [secondPaddlePos, setSecondPaddlePos] = React.useState(0);

    const [leftscore, setLeftScore] = React.useState(0);
    const [rightscore, setRightScore] = React.useState(0);
    const navigate = useNavigate();

    const [gameOver, setGameOver] = React.useState(false);
    const { avatar } = useUserStore();
    const axiosPrivate = useAxiosPrivate();
    const {
        socket,
        isGameReady,
        opponentId,
        gameMode,
        isSecondPlayer,
        roomId
    } = useGameStore();
    const { id } = useUserStore();
    const { isLoading, friend } = useFriendPrevious({
        id: opponentId
    });

    useEffect(() => {
        return () => {
            socket?.emit('gameended');
        };
    }, [socket]);

    React.useEffect(() => {
        if (!isGameReady) navigate('/home');
    }, [isGameReady]);

    console.log('gameMode', roomId);
    React.useEffect(() => {
        socket?.on('leftscored', async () => {
            setLeftScore((prevScore: number) => {
                const newScore = prevScore + 1;
                setRightScore((prvRightscore: number) => {
                    if (removeDecimalPart(newScore) === 5) {
                        setGameOver(true);
                        if (gameMode !== 'training') {
                            axiosPrivate
                                .post('/game/create', {
                                    winnerId: id,
                                    loserId: opponentId,
                                    result: `${newScore}-${prvRightscore}`,
                                    mode: gameMode
                                })
                                .then((res) => res)
                                .catch((error) => console.log(error));
                            socket?.emit('gameended', { payload: { roomId } });
                            navigate('/');
                        }
                    }
                    return prvRightscore;
                });
                return newScore;
            });
        });
        return () => {
            socket?.off('leftscrored');
        };
    }, [socket]);

    React.useEffect(() => {
        socket?.on('rightscored', () => {
            setRightScore((prevScore: number) => {
                const newScore = prevScore + 1;
                if (removeDecimalPart(newScore) === 5) {
                    setGameOver(true);
                    navigate('/');
                    socket?.emit('gameended');
                }
                return newScore;
            });
        });

        return () => {
            socket?.off('rightcrored');
        };
    }, [socket]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'w') {
            movePaddle.current = -0.3;
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            movePaddle.current = 0.3;
        }
    };

    const handleKeyUp = () => {
        movePaddle.current = 0;
    };

    useEffect(() => {
        const updatePaddlePosition = () => {
            if (!gameOver) {
                setFirstPaddlePos((prev) => {
                    const newPosition = prev + movePaddle.current;
                    const maxPos = 17.5;
                    const minPos = -17.187;

                    paddlepos1 = Math.min(
                        Math.max(newPosition, minPos),
                        maxPos
                    );
                    socket?.emit('paddlemove', {
                        room: roomId,
                        pos: paddlepos1,
                        SecondPlayer: isSecondPlayer === true ? 1 : 2
                    });
                    return paddlepos1;
                });

                requestAnimationFrame(updatePaddlePosition);
            }
        };

        if (!gameOver) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            requestAnimationFrame(updatePaddlePosition);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameOver, socket, setFirstPaddlePos, isSecondPlayer, roomId]);

    useEffect(() => {
        socket?.on('paddlemove', function (newPosition) {
            setSecondPaddlePos(newPosition);
        });

        return () => {
            socket?.off('paddlemove');
        };
    }, [socket, setSecondPaddlePos]);

    React.useEffect(() => {
        socket?.on('PlayerDisconnected', async (playerIds: string[]) => {
            console.log('player disconnected');
            console.log('ids :', playerIds);
            if (gameMode !== 'training') {
                axiosPrivate
                    .post('/game/create', {
                        winnerId: id,
                        loserId: opponentId,
                        result: `${leftscore}-${rightscore}`,
                        mode: gameMode
                    })
                    .then((res) => res)
                    .catch((error) => console.log(error));
                socket?.emit('gameended', { payload: { roomId } });
            }
            navigate('/');
        });
        return () => {
            socket?.off('PlayerDisconnected');
        };
    });

    return (
        <>
            <div className="flex flex-col w-full items-center justify-center h-full"
                style={{
                    backgroundImage: `url(${gameMode === 'classic' ? classicBackground : gameMode === 'crazy' ? crazyBackground : trainingBackground})`,
                    backgroundSize: '100% 200%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'grayscale(20%) blur(1px)'
                }}>
                
                {/* {!isGameReady ? (
                    <div className="waiting-screen">
                        <p
                            style={{
                                color: 'white',
                                fontSize: '2em',
                                textAlign: 'center',
                                animation: 'fade 1.5s infinite'
                            }}
                        >
                            Please wait for another player
                        </p>
                    </div>
                ) : ( */}
                <>
                    <div className="w-full px-20 flex justify-between mb-20">
                        <div className="inline-flex gap-4 justify-center items-center">
                            <Avatar
                                imageUrl={avatar}
                                style="w-20 h-20 bg-black rounded-[150px] border border-white ring ring-amber-500 ring-offset-base-100 ring-offset-1"
                            />
                            <div className="w-14 h-14 p-2.5 bg-black rounded-[20px] flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="text-white text-[29px] font-normal font-['Acme']">
                                    {leftscore}
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex gap-4 justify-center items-center">
                            <div className="w-14 h-14 p-2.5 bg-black rounded-[20px] flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="text-white text-[29px] font-normal font-['Acme']">
                                    {rightscore}
                                </div>
                            </div>
                            {isLoading ? (
                                <Skeleton circle height={80} width={80} />
                            ) : (
                                <Avatar
                                    imageUrl={friend?.avatar}
                                    style="w-20 h-20 bg-black rounded-[150px] border border-white ring ring-stone-500 ring-offset-base-100 ring-offset-1"
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-[1168px] h-[663px]">
                        <div className={`table-${gameMode}`}>
                            <Paddle
                                color="#E6E6E9"
                                pos={`${firstPaddlePos}rem`}
                            />
                            <Ball />
                            <Paddle
                                color="#E6E6E9"
                                pos={`${secondPaddlePos}rem`}
                            />
                            {/* <Score
                                    leftScore={removeDecimalPart(leftscore)}
                                    rightScore={removeDecimalPart(rightscore)}
                                    lColor={'white'}
                                    rColor={'white'}
                                /> */}
                            <div className="lineC">
                                <div className="line"></div>
                            </div>
                        </div>
                    </div>
                </>
                {/* )} */}
            </div>
        </>
    );
}
