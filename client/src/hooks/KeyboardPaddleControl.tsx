import { useEffect, useRef } from 'react';
import useGameStore from '../stores/gameStore';

const useKeyboardPaddleControl = () => {
    const { updatePaddlePosition, isGameOver } = useGameStore();
    const movePaddle = useRef(0);

    useEffect(() => {
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

        if (!isGameOver) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            requestAnimationFrame(updatePaddlePosition);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isGameOver, updatePaddlePosition]);
};

export default useKeyboardPaddleControl;
