import { create } from 'zustand';
import { Message, User } from '../../../shared/types';

type RoomState = {
    id: number;
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
};

export const useRoomStore = create<RoomState & RoomMethod>((set, get) => ({
	id: 0,
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
    updateState: (newState) => {
        set((state) => ({ ...state, ...newState }));
    },
    pushMessage: (msg) => {
        const { messages } = get();

        const newMessages = [...messages, msg];
        set({ messages: newMessages });
    }
}));
