import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';

type Room = {
    id: number;
};

type Message = {
    id: number;
    message: string;
    createdAt: string;
    senderId: string;
    receiverId: string;
};

type SocketState = {
    socket: Socket | null;
    messages : { message: string }[];
    rooms: Room[];
};

type MethodState = {
    pushMessage: (msg: Message) => void;
    clearMessage: () => void;
    initializeSocket: (token: string | null) => void;
    updateState: (newState: Partial<SocketState>) => void;
    addRoom: (room: Room) => void;
};

export const useChatSocketStore = create<SocketState & MethodState>((set, get) => ({
    socket: null,
        messages: [],
    rooms: [],
    pushMessage: (msg) => {
        const { messages } = get();
        const newMessages = [...messages, msg]; // Use the entire message object
        set({ messages: newMessages });
    },

    clearMessage: () => {
    set({ messages: [] });
    },
    
    updateState: (newState) => {
    set((state) => ({ ...state, ...newState }))
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
    },

    addRoom: (room) => {
        set((state) => ({ rooms: [...state.rooms, room] }));
    }
    
}));
