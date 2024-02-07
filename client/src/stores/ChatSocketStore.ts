// socketStore.ts
import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';

type SocketState = {
    socket: Socket | null;
    messages : string[];
    pushMessage: (msg: string) => void;
    initializeSocket: (token: string | null) => void;
};

export const useChatSocketStore = create<SocketState>((set, get) => ({
    socket: null,
    messages: [],
    pushMessage:(msg) => (
        const {messages} = get();
        const newMessages;
        [newMessages] = message
    ),
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
