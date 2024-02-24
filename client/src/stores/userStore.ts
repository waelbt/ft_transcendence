import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserStateType = {
    isLogged: boolean;
    redirectedFor2FA: boolean;
    redirectedForProfileCompletion: boolean;
    accessToken: string | null;
    id: string;
    email: string;
    avatar: string;
    nickName: string;
    fullName: string;
    createdAt: string;
    status: boolean;
    f2A: boolean;
    inGame: boolean;
    completeProfile: boolean;
    friendsIds: string[];
    blocksIds: string[];
    notifications: Notification[];
};

const initialState: UserStateType = {
    isLogged: false,
    redirectedFor2FA: false,
    redirectedForProfileCompletion: false,
    accessToken: null,
    id: '',
    email: '',
    avatar: '',
    nickName: '',
    fullName: '',
    createdAt: '',
    status: false,
    f2A: false,
    inGame: false,
    completeProfile: false,
    friendsIds: [],
    blocksIds: [],
    notifications: []
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
    unpushNotification: (id: string) => void;
    pushNotification: (notification: Notification) => void;
};

// ? remove storing in local storage and test the behavior
export const useUserStore = createWithEqualityFn<
    UserStateType & UserActionsType
>()(
    persist(
        (set, get) => ({
            // ! here
            ...initialState,
            // ! end
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
                set({ ...initialState }, true);
            },
            addUserFriendId: (id: string) => {
                set((state) => {
                    // First, remove the id from blocksIds if it's there
                    const newBlocksIds = state.blocksIds.filter(
                        (blockId) => blockId !== id
                    );

                    // Add to friendsIds if not already present
                    if (!state.friendsIds.includes(id)) {
                        return {
                            friendsIds: [...state.friendsIds, id],
                            blocksIds: newBlocksIds
                        };
                    }
                    return state;
                });
            },
            removeUserFriendId: (id: string) => {
                set((state) => ({
                    friendsIds: state.friendsIds.filter(
                        (friendId) => friendId !== id
                    )
                }));
            },
            addUserBlockId: (id: string) => {
                set((state) => {
                    const newFriendsIds = state.friendsIds.filter(
                        (friendId) => friendId !== id
                    );

                    if (!state.blocksIds.includes(id)) {
                        return {
                            blocksIds: [...state.blocksIds, id],
                            friendsIds: newFriendsIds
                        };
                    }
                    return state;
                });
            },
            removeUserBlockId: (id: string) => {
                set((state) => ({
                    blocksIds: state.blocksIds.filter(
                        (blockId) => blockId !== id
                    )
                }));
            },
            updateState: (newState) =>
                set((state) => ({ ...state, ...newState })),
            unpushNotification: (id) => {
                console.log(id);
            },
            pushNotification: (notification) => {
                console.log(notification);
            }
        }),
        {
            name: 'userStore',
            storage: createJSONStorage(() => localStorage) as any
        }
    ),
    shallow
);
