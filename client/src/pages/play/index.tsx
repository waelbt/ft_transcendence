import { useEffect } from 'react';
import useGameStore from '../../stores/gameStore';
import { Game } from '../game/index1';

export const play = () => {
    const { socket, initializeGameSocket, updateState } = useGameStore();

    // useEffect(() => {
    //     initializeGameSocket();
    //     return () => {
    //         socket?.disconnect();
    //     };
    // }, []);

    useEffect(() => {
        socket?.on('gameSetup', (data) => {
            updateState({
                roomId: data.roomId,
                opponentId: data.opponentUserId
            });
        });

        return () => {
            socket?.off('gameSetup');
        };
    }, [socket, initializeGameSocket, updateState]);

    return;
};
