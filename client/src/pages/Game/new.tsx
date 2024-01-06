import React, { useEffect, useState, useRef } from 'react';
import './game.css';
import { useSocketStore } from '../../stores/socketStore';
import { useUserStore } from '../../stores/userStore';
import { useScores } from '../../hooks/scoresHook';
import { Score, Paddle, Ball } from '../../components/game';
import { useGameStore } from '../../stores/gameStore';
import { request } from '../../api';

const removeDecimalPart = (number: number) => Math.floor(number);

export function Game() {
    let gameSt: string;
    const game = useGameStore();
    const { leftScore, rightScore, gameOver } = useScores();
    const [firstPaddlePos, setFirstPaddlePos] = useState(0);
    const movePaddle = useRef(0);
    const [secondPaddlePos, setSecondPaddlePos] = useState(0);
    const [isGameReady, setIsGameReady] = useState(false);
    const [gameMode, setGameMode] = React.useState<
        null | 'classic' | 'crazy' | 'IA'
    >(null);
    const { socket } = useSocketStore();
    const { id } = useUserStore();

    useEffect(() => {
        if (gameMode) {
            socket.emit('gameMode', gameMode);
        }

        const startGameListener = ({ room, SecondPlayer, chosen }) => {
            game.updateIsSecondPlayer(SecondPlayer);
            game.updatechosenMode(chosen);
            game.updateleftColor('white');
            game.updaterightColor('white');
            setIsGameReady(true);
            game.updateRoomid(room);
        };

        const paddleMoveListener = (newPosition) =>
            setSecondPaddlePos(newPosition);

        const playerDisconnectedListener = async () => {
            console.log('player disconnected');
            try {
                const response = await request.post(
                    '/game1',
                    { room: 'dzdzed', id: id }, //! check this
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response);
                window.location.reload();
            } catch (e) {
                console.log(e);
            }
        };

        socket.on('startgame', startGameListener);
        socket.on('paddlemove', paddleMoveListener);
        socket.on('PlayerDisconnected', playerDisconnectedListener);

        return () => {
            socket.off('startgame', startGameListener);
            socket.off('paddlemove', paddleMoveListener);
            socket.off('PlayerDisconnected', playerDisconnectedListener);
        };
    }, [gameMode]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'w') {
                movePaddle.current = -0.2;
            } else if (e.key === 'ArrowDown' || e.key === 's') {
                movePaddle.current = 0.2;
            }
        };

        const handleKeyUp = () => (movePaddle.current = 0);
        const updatePaddlePosition = () => {
            if (!gameOver) {
                setFirstPaddlePos((prev) => {
                    const newPosition = prev + movePaddle.current;
                    const maxPos = 17.5;
                    const minPos = -17.187;

                    const clampedPosition = Math.min(
                        Math.max(newPosition, minPos),
                        maxPos
                    );
                    game.updatePaddlepos1(clampedPosition);
                    socket.emit('paddlemove', {
                        room: game.roomid,
                        pos: clampedPosition,
                        SecondPlayer: game.isSecondPlayer
                    });
                    return clampedPosition;
                });
                requestAnimationFrame(updatePaddlePosition);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        requestAnimationFrame(updatePaddlePosition);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameOver]);

    if (gameMode === null) {
        return (
            <div className="container">
                <button
                    className="custom-button"
                    onClick={() => setGameMode('classic')}
                >
                    Classic
                </button>
                <button
                    className="custom-button"
                    onClick={() => setGameMode('crazy')}
                >
                    Crazy
                </button>
                <button
                    className="custom-button"
                    onClick={() => setGameMode('IA')}
                >
                    IA
                </button>
            </div>
        );
    }
    gameSt = gameMode;

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
                    <div className={`table-${game.chosenMode}`}>
                        <Paddle color="#E6E6E9" pos={`${firstPaddlePos}rem`} />
                        <Ball gameSt={gameSt} />
                        <Paddle color="#E6E6E9" pos={`${secondPaddlePos}rem`} />
                        <Score
                            leftScore={removeDecimalPart(leftScore / 2)}
                            rightScore={removeDecimalPart(rightScore / 2)}
                            lColor={game.leftColor}
                            rColor={game.rightColor}
                        />
                        <div className="lineC">
                            <div className="line"></div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
