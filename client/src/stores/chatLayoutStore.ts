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
    unpushRoom: (roomId: number, isRoom: boolean) => void; // Adding the unpushRoom method
    updateRoomInfo: (
        roomId: number,
        isRoom: boolean,
        updatedInfo: Partial<RoomsList>
    ) => void;
    disconnectSocket: () => void;
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

            if (
                !Layout_Rooms.some(
                    (rooms) =>
                        rooms.id === room.id && room.isRoom === room.isRoom
                )
            ) {
                const newMessages = [...Layout_Rooms, room];
                set({ Layout_Rooms: newMessages });
            }
        },
        updateRoomInfo: (roomId, isRoom, updatedInfo) => {
            const { Layout_Rooms } = get();
            const updatedRooms = Layout_Rooms.map((room) => {
                if (room.id === roomId && isRoom === room.isRoom) {
                    return { ...room, ...updatedInfo };
                }
                return room;
            });
            set({ Layout_Rooms: updatedRooms });
        },
        unpushRoom: (roomId, isRoom) => {
            const { Layout_Rooms } = get();
            const filteredRooms = Layout_Rooms.filter(
                (room) => room.id !== roomId || isRoom !== room.isRoom
            );
            set({ Layout_Rooms: filteredRooms });
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
        disconnectSocket: () => {
            const { socket } = get();
            if (socket) {
                socket.disconnect();
                set({ socket: null });
            }
        }
    })
);
