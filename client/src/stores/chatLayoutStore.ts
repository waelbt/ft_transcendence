import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';
import { RoomsList } from '../../../shared/types';

type ChatState = {
    socket: Socket | null;
    Layout_Rooms: RoomsList[];
};

type ChatMethod = {
    initializeSocket: (token: string | null) => void;
    pushRoom: (room: RoomsList) => void;
    updateState: (newState: Partial<ChatState>) => void;
};

export const useChatLayoutStore = create<ChatState & ChatMethod>(
    (set, get) => ({
        socket: null,
        Layout_Rooms: [],
        updateState: (newState) => {
            set((state) => ({ ...state, ...newState }));
        },
        pushRoom: (room) => {
            const { Layout_Rooms } = get();

            const newMessages = [...Layout_Rooms, room];
            set({ Layout_Rooms: newMessages });
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
    })
);
