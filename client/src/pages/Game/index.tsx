import React, { useEffect } from 'react';
import './game.css';
import { useGame } from '../../context/game-context';
import { useUserStore } from '../../stores/userStore';
import { useSocketStore } from '../../stores/socketStore';
import { useNavigate, useParams } from 'react-router-dom';
import { MODES } from '../../constants';

function removeDecimalPart(number: number): number {
    return Math.floor(number);
}

let roomid: any;
let isSecondPlayer: number;
let chosenMode: string;
// let leftcolor: string;
// let rightcolor: string;

const Score = ({
    leftScore,
    rightScore,
    lColor,
    rColor
}: {
    leftScore: number;
    rightScore: number;
    lColor: string;
    rColor: string;
}) => {
    const leftScoreStyle: React.CSSProperties = {
        position: 'absolute',
        left: '15%',
        top: '0',
        textAlign: 'center',
        color: 'white',
        fontSize: '3rem',
        paddingTop: '5%',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1
    };

    const rightScoreStyle: React.CSSProperties = {
        position: 'absolute',
        right: '15%',
        top: '0',
        textAlign: 'center',
        color: 'white',
        fontSize: '3rem',
        paddingTop: '5%',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1
    };

    return (
        <>
            <div style={leftScoreStyle}>{leftScore}</div>
            <div style={rightScoreStyle}>{rightScore}</div>
        </>
    );
};

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

const Ball = ({ gameSt }: { gameSt: string }) => {
    const [ballPos, setBallPos] = React.useState({ x: 0, y: 0 });
    const [ballColor, setBallColor] = React.useState('white');
    const [shadow, setShadow] = React.useState('0 0 1.25rem white');
    const { socket } = useGame();
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
        socket.on('ballmove', function (newPosition) {
            setBallPos(
                isSecondPlayer === 2
                    ? { x: -newPosition.x, y: newPosition.y }
                    : newPosition
            );
        });

        return () => {
            socket.off('ballmove');
        };
    }, []);
    if (gameSt == 'crazy') {
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
    const { mode } = useParams();
    const [firstPaddlePos, setFirstPaddlePos] = React.useState(0);
    const movePaddle = React.useRef(0);

    const [secondPaddlePos, setSecondPaddlePos] = React.useState(0);

    const [leftscore, setLeftScore] = React.useState(0);
    const [rightscore, setRightScore] = React.useState(0);

    const [gameOver, setGameOver] = React.useState(false);
    const [isGameReady, setIsGameReady] = React.useState(false);
    const { socket } = useSocketStore();
    const { id } = useUserStore();
    const navigate = useNavigate();
    // let history = useHistory();

    useEffect(() => {
        if (!MODES.includes(mode as string)) {
            navigate('/test');
        }
    }, [mode, history]);

    React.useEffect(() => {
        console.log('userid ', id);
        socket.on('leftscored', () => {
            setLeftScore((prevScore: number) => {
                const newScore = prevScore + 1;
                if (removeDecimalPart(newScore / 2) === 5) {
                    setGameOver(true);
                    fetch('http://localhost:3001/game1', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contact: socket,
                            id: id
                        })
                    }).then((res) => console.log('data 1 ', res.json()));
                    socket.emit('gameended');
                    window.location.reload();
                }
                return newScore;
            });
        });

        return () => {
            socket.off('leftscrored');
        };
    }, []);

    React.useEffect(() => {
        socket.on('rightscored', () => {
            setRightScore((prevScore: number) => {
                const newScore = prevScore + 1;
                if (newScore === 5) {
                    setGameOver(true);
                    window.location.reload(); // ! dos replace reload
                    socket.emit('gameended');
                }
                return newScore;
            });
        });

        return () => {
            socket.off('rightcrored');
        };
    }, []);

    // const [gameMode, setGameMode] = React.useState<
    //     null | 'classic' | 'crazy' | 'IA'
    // >(null);

    // let gameSt: string;

    React.useEffect(() => {
        socket.on('startgame', ({ room, SecondPlayer, chosen }) => {
            isSecondPlayer = SecondPlayer;
            chosenMode = chosen;
            // if (chosenMode === 'classic') {
            //     leftcolor = 'white';
            //     rightcolor = 'white';
            // } else if (chosenMode === 'crazy') {
            //     leftcolor = 'white';
            //     rightcolor = 'white';
            // } else if (chosenMode === 'IA') {
            //     leftcolor = 'white';
            //     rightcolor = 'white';
            // }
            console.log('player status: ', isSecondPlayer);
            setIsGameReady(true);
            roomid = room;
        });

        return () => {
            socket.off('startgame');
        };
    }, []);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'w') {
            movePaddle.current = -0.2;
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            movePaddle.current = 0.2;
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

                    const paddlepos1 = Math.min(
                        Math.max(newPosition, minPos),
                        maxPos
                    );
                    socket.emit('paddlemove', {
                        room: roomid,
                        pos: paddlepos1,
                        SecondPlayer: isSecondPlayer
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
    }, [gameOver]);

    useEffect(() => {
        socket.on('paddlemove', function (newPosition) {
            setSecondPaddlePos(newPosition);
        });

        return () => {
            socket.off('paddlemove');
        };
    }, []);

    React.useEffect(() => {
        socket.on('PlayerDisconnected', async () => {
            console.log('player disconnected');
            fetch('http://localhost:3001/game1', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ room: 'dzdzed', id: id })
            }).then((res) => console.log('data 1 ', res.json()));
            window.location.reload();
        });
        return () => {
            socket.off('PlayerDisconnected');
        };
    });

    // if (gameMode === null) {
    //     return (
    //         <div className="container">
    //             <button
    //                 className="custom-button"
    //                 onClick={() => setGameMode('classic')}
    //             >
    //                 Classic
    //             </button>
    //             <button
    //                 className="custom-button"
    //                 onClick={() => setGameMode('crazy')}
    //             >
    //                 Crazy
    //             </button>
    //             <button
    //                 className="custom-button"
    //                 onClick={() => setGameMode('IA')}
    //             >
    //                 IA
    //             </button>
    //         </div>
    //     );
    // }

    // gameSt = gameMode;
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
                {!isGameReady && (
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
                )}
                {isGameReady && (
                    <div className={`table-${chosenMode}`}>
                        <Paddle color="#E6E6E9" pos={`${firstPaddlePos}rem`} />
                        <Ball gameSt={mode as string} />
                        <Paddle color="#E6E6E9" pos={`${secondPaddlePos}rem`} />
                        {/* <Score
                            leftScore={removeDecimalPart(leftscore / 2)}
                            rightScore={removeDecimalPart(rightscore / 2)}
                            // lColor={leftcolor}
                            // rColor={rightcolor}
                        /> */}
                        <div className="lineC">
                            <div className="line"></div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// ! use this component in the home page
// import React from 'react';
// // Make sure to import or initialize your socket connection appropriately
// // import socket from 'your-socket-connection-file';

// const GameModeButtons = () => {
//     const gameModes = ['classic', 'crazy', 'IA'];

//     const handleButtonClick = (gameMode) => {
//         // Assuming you have a function setGameMode to update your state or context
//         setGameMode(gameMode);
//         socket.emit('gameMode', gameMode);
//     };

//     return (
//         <div className="container">
//             {gameModes.map((gameMode, index) => (
//                 <button
//                     key={index}
//                     className="custom-button"
//                     onClick={() => handleButtonClick(gameMode)}
//                 >
//                     {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default GameModeButtons;
