import { io } from 'socket.io-client';
import { useUserStore } from '.';
// Update with the correct path

// ...

// Inside the part of your code where you want to create the socket connection
const userStore = useUserStore.getState(); // Get the current state

// Ensure that the access token is available synchronously
const accessToken = userStore.accessToken || ''; // Replace with your actual way to access the access token

// Create the socket connection with the access token
const socket = io(`${import.meta.env.VITE_BASE_URL}/chat`, {
    query: {
        accessToken: accessToken
    }
});
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
                console.log('connected!');
                console.log(socket.id);
            });
        }
    })
);
