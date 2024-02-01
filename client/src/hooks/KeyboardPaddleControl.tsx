// import { useEffect, useRef } from 'react';
// import useGameStore from '../stores/gameStore';

// const useKeyboardPaddleControl = () => {
//     const { updatePaddlePosition, isGameOver } = useGameStore();
//     const movePaddle = useRef(0);

//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.key === 'ArrowUp' || e.key === 'w') {
//                 movePaddle.current = -0.2;
//             } else if (e.key === 'ArrowDown' || e.key === 's') {
//                 movePaddle.current = 0.2;
//             }
//         };

//         const handleKeyUp = () => {
//             movePaddle.current = 0;
//         };

//         if (!isGameOver) {
//             window.addEventListener('keydown', handleKeyDown);
//             window.addEventListener('keyup', handleKeyUp);
//             requestAnimationFrame(updatePaddlePosition);
//         }

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, [isGameOver, updatePaddlePosition]);
// };

// export default useKeyboardPaddleControl;

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
