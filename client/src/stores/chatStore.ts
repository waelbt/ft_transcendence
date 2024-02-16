import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';
import { Message, RoomsList, User } from '../../../shared/types';

type ChatState = {
    socket: Socket | null;
    // currentRoomId: string;
    currentUser: User | null;
    messages: Message[];
    Layout_Rooms: RoomsList[];
};

type ChatMethod = {
    initializeSocket: (token: string | null, id: string) => void;
    updateState: (newState: Partial<ChatState>) => void;
    pushMessage: (msg: Message) => void;
};

export const useChatStore = create<ChatState & ChatMethod>((set, get) => ({
    socket: null,
    // currentRoomId: '',
    currentUser: null,
    Layout_Rooms: [],
    messages: [],
    updateState: (newState) => {
        set((state) => ({ ...state, ...newState }));
    },
    pushMessage: (msg) => {
        const { messages } = get();

        const newMessages = [...messages, msg];
        set({ messages: newMessages });
    },
    initializeSocket: (token, id) => {
        const { socket } = get();
        if (token && !socket) {
            const newSocket = io(`${import.meta.env.VITE_BASE_URL}/chat`, {
                path: '/socket.io',
                transports: ['websocket'],
                secure: true,
                auth: { token: token },
                query: { userId: id }
            });
            set({ socket: newSocket });
        }
    }
}));

// import { create } from 'zustand';
// import io, { Socket } from 'socket.io-client';

// type Room = {
//     id: number;
// };

// type SocketState = {
//     socket: Socket | null;
//     messages: { message: string }[];
//     rooms: Room[];
// };

// type MethodState = {
//     initializeSocket: (token: string | null) => void;
//     updateState: (newState: Partial<SocketState>) => void;
//     // clearMessage: () => void;
//     // pushMessage: (msg: string) => void;
//     // addRoom: (room: Room) => void;
// };

// export const useChatStore = create<SocketState & MethodState>((set, get) => ({
//     socket: null,
//     messages: [],
//     rooms: [],

//     updateState: (newState) => {
//         set((state) => ({ ...state, ...newState }));
//     },
//     initializeSocket: (token) => {
//         const { socket } = get();
//         if (token && !socket) {
//             const newSocket = io(`${import.meta.env.VITE_BASE_URL}/chat`, {
//                 path: '/socket.io',
//                 transports: ['websocket'],
//                 secure: true,
//                 auth: { token: token }
//             });
//             set({ socket: newSocket });
//         }
//     }

//     // clearMessage: () => {
//     //     set({ messages: [] });
//     // },
//     // addRoom: (room) => {
//     //     set((state) => ({ rooms: [...state.rooms, room] }));
//     // }
// }));
