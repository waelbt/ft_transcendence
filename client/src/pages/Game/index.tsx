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
    const {
        updateState,
        paddlepos1,
        firstPaddlePos,
        secondPaddlePos,
        isGameReady,
        gameMode,
        rightColor,
        leftColor
    } = useGameStore();
    const { leftScore, rightScore, gameOver } = useScores();
    // const [firstPaddlePos, setFirstPaddlePos] = useState(0);
    const movePaddle = useRef(0);
    // const [secondPaddlePos, setSecondPaddlePos] = useState(0);
    // const [isGameReady, setIsGameReady] = useState(false);
    // const [gameMode, setGameMode] = useState('');
    const { socket } = useSocketStore();
    const { id } = useUserStore();

    useEffect(() => {
        const startGameListener = ({ room, SecondPlayer, chosen }) => {
            updateState({ isSecondPlayer: SecondPlayer });
            updateState({ chosenMode: chosen });
            updateState({ rightColor: 'white' });
            updateState({ leftColor: 'white' });
            updateState({ isGameReady: true });
            updateState({ roomid: room });
        };

        const paddleMoveListener = (newPosition) =>
            updateState({ secondPaddlePos: newPosition });

        const playerDisconnectedListener = async () => {
            console.log('player disconnected');
            const response = request.post(
                '/game1',
                JSON.stringify({ room: 'dzdzed', id: id }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // fetch('http://localhost:3001/game1', {
            //     method: 'POST',
            //     mode: 'no-cors',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ room: 'dzdzed', id: id })
            // }).then((res) => console.log('data 1 ', res.json()));
            window.location.reload();
        };

        socket.on('startgame', startGameListener);
        socket.on('paddlemove', paddleMoveListener);
        socket.on('PlayerDisconnected', playerDisconnectedListener);

        if (gameMode) {
            socket.emit('gameMode', gameMode);
        }

        return () => {
            socket.off('startgame', startGameListener);
            socket.off('paddlemove', paddleMoveListener);
            socket.off('PlayerDisconnected', playerDisconnectedListener);
        };
    }, [gameMode, socket]); // game store

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w') {
                movePaddle.current = -0.2;
            } else if (e.key === 'ArrowDown' || e.key === 's') {
                movePaddle.current = 0.2;
            }
        };

        const handleKeyUp = () => (movePaddle.current = 0);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const updatePaddlePosition = () => {
            if (!gameOver) {
                const position = (prev) => {
                    const newPosition = prev + movePaddle.current;
                    return Math.min(Math.max(newPosition, -17.187), 17.5);
                };
                updateState({ firstPaddlePos: position });
                requestAnimationFrame(updatePaddlePosition);
            }
        };

        requestAnimationFrame(updatePaddlePosition);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameOver]);

    const gameSelectionScreen = (
        <div className="container">
            {['classic', 'crazy', 'IA'].map((mode) => (
                <button
                    key={mode}
                    className="custom-button"
                    onClick={() => updateState({ gameMode: mode })}
                >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
            ))}
        </div>
    );

    const gamePlayScreen = (
        <div className={`table-${gameMode}`}>
            <Paddle color="#E6E6E9" pos={`${firstPaddlePos}rem`} />
            <Ball gameSt={gameMode as string} />
            <Paddle color="#E6E6E9" pos={`${secondPaddlePos}rem`} />
            <Score
                leftScore={removeDecimalPart(leftScore / 2)}
                rightScore={removeDecimalPart(rightScore / 2)}
                lColor={leftColor}
                rColor={rightColor}
            />
            <div className="lineC">
                <div className="line"></div>
            </div>
        </div>
    );

    return !gameMode ? (
        gameSelectionScreen
    ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            {!isGameReady ? (
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
            ) : (
                gamePlayScreen
            )}
        </div>
    );
}
