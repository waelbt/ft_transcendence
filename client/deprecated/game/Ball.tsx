import React from 'react';
import { useSocketStore } from '../../src/stores/socketStore';
import { useGameStore } from '../../src/stores/gameStore';

const Ball = ({ gameSt }: { gameSt: string }) => {
    const { isSecondPlayer } = useGameStore();
    const [ballPos, setBallPos] = React.useState({ x: 0, y: 0 });
    const [ballColor, setBallColor] = React.useState('white');
    const [shadow, setShadow] = React.useState('0 0 1.25rem white');
    const { socket } = useSocketStore();
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

export default Ball;
