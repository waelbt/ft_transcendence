// socketStore.ts
import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';

type SocketState = {
    socket: Socket | null;
    initializeSocket: (token: string | null) => void;
};

export const useChatSocketStore = create<SocketState>((set, get) => ({
    socket: null,

    initializeSocket: (token) => {
        const { socket } = get();
        if (token && !socket) {
            const newSocket = io(`${import.meta.env.VITE_BASE_URL}/chat`, {
                path: '/socket.io',
                transports: ['websocket'],
                secure: true,
                auth: { token: token }
            });
            set({ socket: newSocket });
            // Setup socket event listeners here if needed
        }
    }
}));

// ? removing accestoken state and start emiting thew new token
//     updateToken: (token: string) => {
//         const { socket } = get();
//         if (socket) {
//             // Send the new token to the server via the existing socket connection
//             socket.emit('updateToken', token);
//         }
//     }
