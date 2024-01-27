import { io } from 'socket.io-client';
import { create } from 'zustand';

const socket = io(`${import.meta.env.VITE_BASE_URL}/game`);

type SocketStateType = {
    socket: any;
};

type SocketActionType = {
    connect: () => void;
};

export const useSocketStore = create<SocketStateType & SocketActionType>(
    () => ({
        socket: socket,
        connect: () => {
            socket.on('connect', () => {
                // console.log('connected!');
                // console.log(socket.id);
            });
        }
    })
);
