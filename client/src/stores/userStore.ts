// import { request } from '../api';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';
// import useAxiosPrivate from '../hooks/axiosPrivateHook';

// ! create a const object for defautl value to use it twice 

type UserStateType = {
    active: boolean;
    isLogged: boolean;
    verified: boolean;
    accessToken: string | null;
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
    friends: string[];
    block: string[];
};

type UserActionsType = {
    // constructor: (data : UserStateType) => void;
    getState: () => UserStateType;
    logout: () => void;
    updateState: (newState: Partial<UserStateType>) => void;
};

// ? remove storing in local storage and test the behavior
export const useUserStore = createWithEqualityFn<
    UserStateType & UserActionsType
>()(
    persist(
        (set, get) => ({
            active: false,
            isLogged: false,
            verified: true,
            accessToken: null,
            id: '',
            email: '',
            avatar: '', // ! tmp
            nickName: '',
            fullName: '',
            createdAt: '',
            status: false,
            F2A: false,
            inGame: false,
            isProfileComplete: false,
            friends: [],
            block: [],
            getState: () => {
                const { logout, updateState, getState, ...restOfState } = get();
                return restOfState;
            },
            logout: () => {
                set(
                    {
                        active: false,
                        isLogged: false,
                        accessToken: null,
                        id: '',
                        email: '',
                        avatar: '',
                        nickName: '',
                        fullName: '',
                        status: false,
                        F2A: false,
                        inGame: false,
                        isProfileComplete: false,
                        friends: [],
                        block: []
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
