// src/GameCanvas.tsx
import React, { useEffect, useRef } from 'react';
import useGameStore from '../../stores/gameStore';
import useMousePaddleControl from '../../hooks/mousePaddleControl';

const GameCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useMousePaddleControl(canvasRef);
    const {
        ball,
        myPaddle,
        opponentPaddle,
        socket,
        updateOpponentPaddlePosition
    } = useGameStore();

    useEffect(() => {
        socket?.on('opponentPaddleMove', (data) => {
            updateOpponentPaddlePosition(data.y);
        });

        return () => {
            socket?.off('opponentPaddleMove');
        };
    }, [socket, updateOpponentPaddlePosition]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the ball
                context.fillStyle = 'black';
                context.beginPath();
                context.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
                context.fill();

                // Draw the paddles
                context.fillRect(myPaddle.x, myPaddle.y, 10, myPaddle.height);
                context.fillRect(
                    opponentPaddle.x,
                    opponentPaddle.y,
                    10,
                    myPaddle.height
                );
            }
        }
    }, [ball, myPaddle, opponentPaddle]);

    return <canvas ref={canvasRef} width="800" height="600" />;
};

export default GameCanvas;
