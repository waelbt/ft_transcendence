import { create } from 'zustand';
import { Message, User } from '../../../shared/types';

type dmState = {
    currentDm: User | null;
    isForbbiden: boolean;
    messages: Message[];
};

type dmMethod = {
    updateState: (newState: Partial<dmState>) => void;
    pushMessage: (msg: Message) => void;
};

export const useDmStore = create<dmState & dmMethod>((set, get) => ({
    currentDm: null,
    messages: [],
    isForbbiden: false,
    updateState: (newState) => {
        set((state) => ({ ...state, ...newState }));
    },
    pushMessage: (msg) => {
        const { messages } = get();

        const newMessages = [...messages, msg];
        set({ messages: newMessages });
    }
}));
