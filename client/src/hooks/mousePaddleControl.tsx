import { useCallback, useEffect } from 'react';
import useGameStore from '../stores/gameStore';

const useMousePaddleControl = (
    canvasRef: React.RefObject<HTMLCanvasElement>
) => {
    const { moveMyPaddle } = useGameStore();

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                const scaleY = canvas.height / rect.height;
                let newY = (event.clientY - rect.top) * scaleY;
                newY = Math.max(newY, 50); // Assuming paddle height is 100
                newY = Math.min(newY, canvas.height - 50);
                moveMyPaddle(newY - 50); // Center the paddle on the cursor
            }
        },
        [moveMyPaddle, canvasRef]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (canvas) {
                canvas.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [handleMouseMove, canvasRef]);
};

export default useMousePaddleControl;
