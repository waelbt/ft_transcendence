import useKeyboardPaddleControl from '../../hooks/KeyboardPaddleControl';
import React, { useEffect, useRef } from 'react';
import useGameStore from '../../stores/gameStore';
// import useMousePaddleControl from '../../hooks/mousePaddleControl';

export const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // useMousePaddleControl(canvasRef);
    useKeyboardPaddleControl();
    const {
        ball,
        myPaddle,
        opponentPaddle,
        socket,
        isGameReady,
        updateBallPosition,
        updateState,
        updatePaddlePosition
    } = useGameStore();

    React.useEffect(() => {
        console.log('test');
        socket?.on('startgame', ({ room, SecondPlayer, chosen }) => {
            updateState({ isSecondPlayer: SecondPlayer });
            updateState({ isGameReady: true });
            updateState({ roomId: room });
            console.log(chosen);
        });

        return () => {
            socket?.off('startgame');
        };
    }, [socket]);

    React.useEffect(() => {
        const handleBallMove = (newPosition: { x: number; y: number }) => {
            const { x, y } = newPosition;
            updateBallPosition(true ? x : x, y);
        };

        socket?.on('ballmove', handleBallMove);
        return () => {
            socket?.off('ballmove');
        };
    }, []);

    useEffect(() => {
        updatePaddlePosition();
    }, [updatePaddlePosition]);

    React.useEffect(() => {
        socket?.on('PlayerDisconnected', async () => {
            console.log('player disconnected');
            //   fetch("http://localhost:3001/game1", {
            //   method: 'POST',
            //   mode: 'no-cors',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({room: 'dzdzed'}),
            // }).then((res) => console.log('data 1 ',res.json()));
            window.location.reload();
        });

        return () => {
            socket?.off('PlayerDisconnected');
        };
    });
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

    return (
        <div className="bg-white">
            {isGameReady ? (
                <canvas ref={canvasRef} width="800" height="600" />
            ) : (
                <div className="waiting-screen">
                    <p
                        style={{
                            color: 'black',
                            fontSize: '2em',
                            textAlign: 'center',
                            animation: 'fade 1.5s infinite'
                        }}
                    >
                        Please wait for another player
                    </p>
                </div>
            )}
        </div>
    );
};
