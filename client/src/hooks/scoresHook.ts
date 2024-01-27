import React from 'react';
import { useSocketStore } from '../stores/socketStore';
import { useUserStore } from '../stores/userStore';

export function useScores() {
    const [leftScore, setLeftScore] = React.useState(0);
    const [rightScore, setRightScore] = React.useState(0);
    const { socket } = useSocketStore();
    const { id } = useUserStore();
    const [gameOver, setGameOver] = React.useState(false);

    React.useEffect(() => {
        socket.on('leftscored', () => {
            setLeftScore((prevScore: number) => {
                const newScore = prevScore + 1;
                if (Math.floor(newScore / 2) === 5) {
                    //9alab 3la data lighay htaj khona o siftha lih
                    // ! axios here
                    setGameOver(true);
                    fetch('http://localhost:3001/game1', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contact: socket,
                            id: id
                        })
                    }).then((res) => // console.log('data 1 ', res.json()));
                    socket.emit('gameended');
                    window.location.reload();
                }
                return newScore;
            });
        });

        return () => {
            socket.off('leftscored');
        };
    }, [socket, id]); // add dependencies

    React.useEffect(() => {
        socket.on('rightscored', () => {
            setRightScore((prevScore: number) => {
                const newScore = prevScore + 1;
                if (Math.floor(newScore / 2) === 5) {
                    setGameOver(true);
                    window.location.reload();
                    socket.emit('gameended');
                }
                return newScore;
            });
        });

        return () => {
            socket.off('rightcrored');
        };
    }, []);
    return { leftScore, rightScore, gameOver };
}
