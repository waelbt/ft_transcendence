import { create } from 'zustand';
import { io } from 'socket.io-client';
import { useUserStore } from './userStore';
// Update with the correct path

// ...

// Inside the part of your code where you want to create the socket connection
const userStore = useUserStore.getState(); // Get the current state

// Ensure that the access token is available synchronously
const accessToken = userStore.accessToken || ''; // Replace with your actual way to access the access token

type SocketStateType = {
    socket: any;
};

type SocketActionType = {
    // connect: () => void;
};

export const useSocketStore = create<SocketStateType & SocketActionType>(
    // set, get
    () => ({
        socket: io(`${import.meta.env.VITE_BASE_URL}/chat`, {
            auth: {
                accessToken: accessToken
            }
        }),
        // connect: () => {
        //     const state = get();
        //     state.socket.on('connect', () => {
        //         console.log('connected!');
        //         console.log(state.socket.id);
        //     });
        // }
    })
);
