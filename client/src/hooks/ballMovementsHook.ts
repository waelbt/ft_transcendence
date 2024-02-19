import { useState, useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useSocketStore } from '../../deprecated/socketStore';

export const useBallMovement = () => {
    const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
    const { isSecondPlayer } = useGameStore();
    const { socket } = useSocketStore();

    useEffect(() => {
        const handleBallMove = (newPosition: { x: 0; y: 0 }) => {
            setBallPos(
                isSecondPlayer
                    ? { x: -newPosition.x, y: newPosition.y }
                    : newPosition
            );
        };

        socket.on('ballmove', handleBallMove);

        return () => socket.off('ballmove', handleBallMove);
    }, [socket, isSecondPlayer]);

    return ballPos;
};
