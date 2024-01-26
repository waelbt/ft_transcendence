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
    completeProfile: boolean;
    friendsIds: string[]; //! rename to friendSId
    blocksIds: string[]; //! rename to blockSId
};

type UserActionsType = {
    // constructor: (data: any) => void;
    getState: () => UserStateType;
    logout: () => void;
    updateState: (newState: Partial<UserStateType>) => void;
    addUserFriendId: (id: string) => void;
    removeUserFriendId: (id: string) => void;
    addUserBlockId: (id: string) => void;
    removeUserBlockId: (id: string) => void;
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
            completeProfile: false,
            friendsIds: [],
            blocksIds: [],
            getState: () => {
                const {
                    logout,
                    updateState,
                    getState,
                    addUserFriendId,
                    removeUserFriendId,
                    addUserBlockId,
                    ...restOfState
                } = get();
                return restOfState;
            },
            logout: () => {
                window.history.replaceState(null, '', '/');
                set(
                    {
                        active: false,
                        isLogged: false,
                        verified: true,
                        accessToken: null,
                        id: '',
                        email: '',
                        avatar: '',
                        nickName: '',
                        fullName: '',
                        status: false,
                        F2A: false,
                        inGame: false,
                        completeProfile: false,
                        friendsIds: [],
                        blocksIds: []
                    },
                    true // ? the state update should trigger a re-render of the components that subscribe to the store.
                );
            },
            addUserFriendId: (id: string) => {},
            removeUserFriendId: (id: string) => {},
            addUserBlockId: (id: string) => {},
            removeUserBlockId: (id: string) => {},
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
