import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';
import { Message, RoomsList, User } from '../../../shared/types';

type ChatState = {
    socket: Socket | null;
    // currentRoomId: string;
    currentDm: User | null;
    // currentGroup: room | null;
    // currentGroupMessgaes: Messages[];
    dmMessages: Message[];
    Layout_Rooms: RoomsList[];
};

type ChatMethod = {
    initializeSocket: (token: string | null) => void;
    updateState: (newState: Partial<ChatState>) => void;
    pushMessage: (msg: Message) => void;
    pushRoom: (room: RoomsList) => void;
};

export const useChatStore = create<ChatState & ChatMethod>((set, get) => ({
    socket: null,
    currentDm: null,
    Layout_Rooms: [],
    dmMessages: [],
    updateState: (newState) => {
        set((state) => ({ ...state, ...newState }));
    },
    pushMessage: (msg) => {
        const { dmMessages } = get();

        const newMessages = [...dmMessages, msg];
        set({ dmMessages: newMessages });
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
}));
