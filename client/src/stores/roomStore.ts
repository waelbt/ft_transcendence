import { create } from 'zustand';
import { Message, User } from '../../../shared/types';

type RoomState = {
    isModifiable: boolean;
    id: string;
    roomTitle: string;
    avatar: string;
    users: User[];
    privacy: string;
    password?: string;
    owner: string[];
    admins: string[];
    banned: string[];
    muted: string[];
    messages: Message[];
};

type RoomMethod = {
    updateState: (newState: Partial<RoomState>) => void;
    pushMessage: (msg: Message) => void;
    pushMember: (user: User) => void;
    unpushMember: (id: string) => void; // Adding the unpushRoom method
    alertMessage: (message: string) => void; // Adding the alert method
};

export const useRoomStore = create<RoomState & RoomMethod>((set, get) => ({
    isModifiable: false,
    id: '',
    roomTitle: '',
    avatar: '',
    users: [],
    privacy: '',
    password: '',
    owner: [],
    admins: [],
    banned: [],
    muted: [],
    messages: [],
    pushMember: (user: User) => {
        const { users } = get();

        const newUsers = [...users, user];
        set({ users: newUsers });
    },
    unpushMember: (id) => {
        const { users } = get();
        const filteredRooms = users.filter((user) => user.id !== id);
        set({ users: filteredRooms });
    },
    updateState: (newState) => {
        set((state) => ({ ...state, ...newState }));
    },
    pushMessage: (msg) => {
        const { messages } = get();

        const newMessages = [...messages, msg];
        set({ messages: newMessages });
    },
    alertMessage: (message) => {
        const { messages } = get();

        const leaveMessage: Message = {
            id: 0,
            senderId: '',
            avatar: '',
            nickName: 'System',
            message: message,
            createdAt: new Date().toISOString()
        };

        const newMessages = [...messages, leaveMessage];
        set({ messages: newMessages });
    }
}));
