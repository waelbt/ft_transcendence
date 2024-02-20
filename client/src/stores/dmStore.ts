import { create } from 'zustand';
import { Message, User } from '../../../shared/types';

type dmState = {
    currentDm: User | null;
    messages: Message[];
};

type dmMethod = {
    updateState: (newState: Partial<dmState>) => void;
    pushMessage: (msg: Message) => void;
};

export const useDmStore = create<dmState & dmMethod>((set, get) => ({
    currentDm: null,
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
