import { request } from '../api';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';

// server       |   id: '112965',
// server       |   email: 'ibouchaf@student.1337.ma',
// server       |   HashPassword: null,
// server       |   Avatar: null,
// server       |   nickName: 'ibouchaf',
// server       |   fullName: 'Issam Bouchafra',
// server       |   status: true,
// server       |   F2A: false,
// server       |   F2A_Secret: null,
// server       |   inGame: false,
// server       |   completeProfile: false,
// server       |   createdAt: 2023-12-28T03:05:40.353Z
// server       | }

type UserStateType = {
    isLogged: boolean;
    id: string;
    email: string;
    avatar: string;
    nickName: string;
    fullName: string;
    createdAt: string;
    status: boolean;
    F2A: boolean;
    inGame: boolean;
    isProfileComplete: boolean;
};

type UserActionsType = {
    login: () => Promise<void>;
    logout: () => void;
    updateState: (newState: Partial<UserStateType>) => void;
};

export const useUserStore = createWithEqualityFn<
    UserStateType & UserActionsType
>()(
    persist(
        (set) => ({
            isLogged: false,
            id: '',
            email: '',
            avatar: 'https://tecdn.b-cdn.net/img/new/avatars/2.webp', // ! tmp
            nickName: '',
            fullName: '',
            createdAt: '',
            status: false,
            F2A: false,
            inGame: false,
            isProfileComplete: false,
            login: async () => {
                const { data } = await request.get('/users/me');
                console.log(data);
                // ! user type men 3and simo
                set({
                    isLogged: true,
                    id: data.user.id,
                    email: data.user.email,
                    avatar: data.user.avatar,
                    nickName: data.user.nickName,
                    fullName: data.user.fullName,
                    createdAt: data.user.createdAt,
                    status: data.user.status,
                    F2A: data.user.F2A,
                    inGame: data.user.inGame
                });
            },
            logout: () => {
                set(
                    {
                        isLogged: false,
                        id: '',
                        email: '',
                        avatar: '',
                        nickName: '',
                        fullName: '',
                        status: false,
                        F2A: false,
                        inGame: false,
                        isProfileComplete: false
                    },
                    true // ? the state update should trigger a re-render of the components that subscribe to the store.
                );
            },
            updateState: (newState) =>
                set((state) => ({ ...state, ...newState }))
        }),
        {
            name: 'userStore',
            storage: createJSONStorage(() => localStorage) as any
        }
    ),
    shallow
);
