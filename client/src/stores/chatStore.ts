import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';

type Room = {
    id: number;
};

type SocketState = {
    socket: Socket | null;
    messages: { message: string }[];
    rooms: Room[];
};

type MethodState = {
    initializeSocket: (token: string | null) => void;
    updateState: (newState: Partial<SocketState>) => void;
    // clearMessage: () => void;
    // pushMessage: (msg: string) => void;
    // addRoom: (room: Room) => void;
};

export const useChatStore = create<SocketState & MethodState>((set, get) => ({
    socket: null,
    messages: [],
    rooms: [],

    updateState: (newState) => {
        set((state) => ({ ...state, ...newState }));
    },
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
        }
    }
    // pushMessage: (msg) => {
    //     const { messages } = get();
    //     const newMessage = { message: msg }; // Wrap the msg into an object
    //     const newMessages = [...messages, newMessage]; // Add the new message object to the existing messages array
    //     set({ messages: newMessages }); // Update the messages state with the new array
    // },

    // clearMessage: () => {
    //     set({ messages: [] });
    // },
    // addRoom: (room) => {
    //     set((state) => ({ rooms: [...state.rooms, room] }));
    // }
}));
