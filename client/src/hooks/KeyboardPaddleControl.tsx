import { useEffect } from 'react';
import useGameStore from '../stores/gameStore';

const useKeyboardPaddleControl = () => {
    const { myPaddle, moveMyPaddle, canvasHeight, speed } = useGameStore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    moveMyPaddle(Math.max(myPaddle.y - speed, 0));
                    break;
                case 'ArrowDown':
                    moveMyPaddle(
                        Math.min(
                            myPaddle.y + speed,
                            canvasHeight - myPaddle.height
                        )
                    );
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [myPaddle.y, moveMyPaddle, canvasHeight, speed]);
};

export default useKeyboardPaddleControl;
