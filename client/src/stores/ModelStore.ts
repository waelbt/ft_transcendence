import { create } from 'zustand';

type ModelStateType = {
    isEventOpen: boolean;
};

type ModelActionType = {
    openEvent: () => void;
    closeEvent: () => void;
};

export const useModelStore = create<ModelStateType & ModelActionType>(
    (set) => ({
        isEventOpen: false,
        openEvent: () => set({ isEventOpen: true }),
        closeEvent: () => set({ isEventOpen: false })
    })
);
