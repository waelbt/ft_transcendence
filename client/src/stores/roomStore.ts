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
    unpushMember: (id: string) => void;
    alertMessage: (message: string) => void;
    messageListener: (message: Message) => void;
    userLeftListener: ({
        id,
        nickname
    }: {
        id: string;
        nickname: string;
    }) => void;
    userJoinListener: (user: User) => void;
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

        // Check if the user is not already in the array
        if (!users.find((existingUser) => existingUser.id === user.id)) {
            const newUsers = [...users, user];
            set({ users: newUsers });
        }
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

        const systemMessage: Message = {
            id: 0,
            senderId: '',
            avatar: '',
            nickName: 'System',
            message: message,
            createdAt: 'no need'
        };

        const newMessages = [...messages, systemMessage];
        set({ messages: newMessages });
    },
    messageListener: (message: Message) => {
        console.log('Received message:', message);
        if (get().id && message.id === +get().id) {
            set((state) => {
                const newMessages = [...state.messages, message];
                return { messages: newMessages };
            });
        }
    },
    userLeftListener: ({ id, nickname }) => {
        const { users, messages } = get();
        const filteredRooms = users.filter((user) => user.id !== id);
        const leaveMessage: Message = {
            id: 0,
            senderId: '',
            avatar: '',
            nickName: 'System',
            message: `${nickname} has left the room.`,
            createdAt: 'no need'
        };
        const newMessages = [...messages, leaveMessage];
        set({ users: filteredRooms, messages: newMessages });
    },
    userJoinListener: (user: User) => {
        set((state) => {
            // Check if the user is not already in the array
            if (
                !state.users.find((existingUser) => existingUser.id === user.id)
            ) {
                const newUsers = [...state.users, user];
                const joinMessage: Message = {
                    id: 0,
                    senderId: '',
                    avatar: '',
                    nickName: 'System',
                    message: `${user.nickName} has joined the room.`,
                    createdAt: 'no need'
                };
                const newMessages = [...state.messages, joinMessage];
                return { users: newUsers, messages: newMessages };
            } else {
                return state; // If user is already in the array, return the unchanged state
            }
        });
    }
}));
