// import { request } from '../api';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';
// import useAxiosPrivate from '../hooks/axiosPrivateHook';

type UserStateType = {
    isLogged: boolean;
    accessToken: string | null;
    refreshToken: string | null;
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
    // constructor: (data) => void;
    logout: () => void;
    updateState: (newState: Partial<UserStateType>) => void;
};

export const useUserStore = createWithEqualityFn<
    UserStateType & UserActionsType
>()(
    persist(
        (set) => ({
            isLogged: false,
            accessToken: null,
            refreshToken: null,
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
            // constructor: (data) => {
            //     // const axiosPrivate = useAxiosPrivate();
            //     // const { data } = await axiosPrivate.get('/users/me');

            //     // ! user type men 3and simo
            //     set({
            //         isLogged: true,
            //         id: data.user.id,
            //         email: data.user.email,
            //         avatar: data.user.avatar,
            //         nickName: data.user.nickName,
            //         fullName: data.user.fullName,
            //         createdAt: data.user.createdAt,
            //         status: data.user.status,
            //         F2A: data.user.F2A,
            //         inGame: data.user.inGame
            //     });
            // },
            logout: () => {
                set(
                    {
                        isLogged: false,
                        accessToken: null,
                        refreshToken: null,
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
