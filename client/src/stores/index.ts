import { request } from '../api';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';
// import { persist, createJSONStorage } from "zustand/middleware";
// import { api } from "../Api/base";

// {
//     "user": {
//       "id": "112965",
//       "email": "ibouchaf@student.1337.ma",
//       "HashPassword": null,
//       "Avatar": null,
//       "nickName": "ibouchaf",
//       "fullName": "Issam Bouchafra",
//       "status": true,
//       "F2A": false,
//       "F2A_Secret": null,
//       "inGame": false,
//       "createdAt": "2023-12-08T05:08:53.769Z"
//     },
//     "friends": [],
//     "block": []
//   }

type UserState = {
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
};

// // Define a type for the store's actions
type UserActions = {
    login: () => Promise<void>;
    logout: () => void;
    UpdateIsLogged: (isLogged: UserState['isLogged']) => void;
    UpdateAvatar: (avatar: UserState['avatar']) => void;
    UpdateNickName: (nickName: UserState['nickName']) => void;
    // status:;
    // F2A:;
    // inGame:;
};

export const useUserStore = createWithEqualityFn<UserState & UserActions>(
    persist(
        (set) => ({
            isLogged: false,
            id: '',
            email: '',
            avatar: '',
            nickName: '',
            fullName: '',
            createdAt: '',
            status: false,
            F2A: false,
            inGame: false,
            login: async () => {
                const { data } = await request.get('/users/me');
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
                        createdAt: '',
                        status: false,
                        F2A: false,
                        inGame: false
                    },
                    true // ? the state update should trigger a re-render of the components that subscribe to the store.
                );
            },
            UpdateIsLogged: (isLogged) => set(() => ({ isLogged: isLogged })),
            UpdateAvatar: (avatar) => set(() => ({ avatar: avatar })),
            UpdateNickName: (nickName) => set(() => ({ nickName: nickName }))
        }),
        {
            name: 'userStore',
            storage: createJSONStorage(() => localStorage) as any
        }
    ),
    shallow
);

// export const useUserStore = createWithEqualityFn<State & Action>()(
//     persist(
//         (set, get) => ({
//             isLogged: false,
//             id: '',
//             bio: '',
//             phone: '',
//             username: '',
//             name: {
//                 first: '',
//                 last: ''
//             },
//             picture: {
//                 thumbnail: '',
//                 medium: '',
//                 large: ''
//             },
//             email: '',
//             tfa: false,
//             friendListIds: [],
//             banListIds: [],
//             achievement: null,
//             dmsIds: [],
//             history: [],
//             chatRoomsJoinedIds: [],
//             profileComplet: false,
//             notifications: [],
//             gameInvitation: {
//                 gameId: '',
//                 inviterId: ''
//             },
//             gameWaiting: {
//                 gameId: ''
//             },
//             toggleTfa: () => set(({ tfa }) => ({ tfa: !tfa })),
//             updateFirstName: (firstName) =>
//                 set((state) => ({
//                     name: {
//                         ...state.name,
//                         first: firstName
//                     }
//                 })),
//             updateLastName: (lastName: string) =>
//                 set((state) => ({
//                     name: {
//                         ...state.name,
//                         last: lastName
//                     }
//                 })),
//             updateEmail: (email: string) =>
//                 set(() => ({
//                     email: email
//                 })),
//             updateNotificationRead: (notificationId: string) => {
//                 const state = get();
//                 const notifications = state.notifications.map(
//                     (notification: any) => {
//                         if (notification.id === notificationId) {
//                             notification.is_read = true;
//                         }
//                         return notification;
//                     }
//                 );
//                 set({ notifications });
//             },
//             addNotification: (notification: any) => {
//                 const state = get();
//                 const notifications = [notification, ...state.notifications];
//                 set({ notifications });
//             },
//             addNotifications: (notifications: any) => {
//                 const state = get();
//                 const newNotifications = [
//                     ...state.notifications,
//                     ...notifications
//                 ];
//                 set({ notifications: newNotifications });
//             },
//             updateAllNotificationsRead: () => {
//                 const state = get();
//                 const notifications = state.notifications.map(
//                     (notification: any) => {
//                         notification.is_read = true;
//                         return notification;
//                     }
//                 );
//                 set({ notifications });
//             },
//             updateGameInvitationId: (gameId: string) => {
//                 const state = get();
//                 const gameInvitation = {
//                     gameId: gameId,
//                     inviterId: state.gameInvitation.inviterId
//                 };
//                 set({ gameInvitation });
//             },
//             setGameInvitation: (gameInvitation: any) => {
//                 set({ gameInvitation });
//             },
//             setGameWaitingId: (gameId: string) => {
//                 const gameWaiting = {
//                     gameId: gameId
//                 };
//                 set({ gameWaiting });
//             },
//             updatePhone: (phone: State['phone']) =>
//                 set(() => ({ phone: phone })),
//             updateBio: (bio: State['bio']) => set(() => ({ bio: bio })),
//             updateUsername: (username: State['username']) =>
//                 set(() => ({ username: username })),
//             setAvatar: (picture: State['picture']) =>
//                 set(() => ({ picture: picture })),
//             login: async () => {
//                 const res = await api.get('/profile/me');
//                 var user_data = res.data;

//                 const check = user_data.picture.large.split`/`;
//                 if (check[check.length - 1] === 'null')
//                     user_data.picture = null;
//                 const userInitialValue: State = {
//                     isLogged: true,
//                     id: user_data.id,
//                     bio: user_data?.bio ?? 'default bio',
//                     phone: user_data.cell,
//                     username: user_data.username,
//                     name: {
//                         first: user_data.name.first,
//                         last: user_data.name.last
//                     },
//                     picture: {
//                         thumbnail:
//                             user_data?.picture?.thumbnail ??
//                             `https://ui-avatars.com/api/?name=${user_data.name.first}-${user_data.name.last}&background=7940CF&color=fff`,
//                         medium:
//                             user_data?.picture?.medium ??
//                             `https://ui-avatars.com/api/?name=${user_data.name.first}-${user_data.name.last}&background=7940CF&color=fff`,
//                         large:
//                             user_data?.picture?.large ??
//                             `https://ui-avatars.com/api/?name=${user_data.name.first}-${user_data.name.last}&background=7940CF&color=fff`
//                     },
//                     email: user_data.email,
//                     tfa: user_data.tfa,
//                     friendListIds: [],
//                     banListIds: [],
//                     achievement: user_data?.achievement ?? null,
//                     dmsIds: [],
//                     history: [],
//                     chatRoomsJoinedIds: [],
//                     profileComplet: user_data.profileFinished,
//                     notifications: [],
//                     gameInvitation: {
//                         gameId: '',
//                         inviterId: ''
//                     },
//                     gameWaiting: {
//                         gameId: ''
//                     }
//                 };
//                 set({ ...userInitialValue });
//                 return userInitialValue.isLogged;
//             },
//             logout: () => {
//                 set(
//                     {
//                         isLogged: false,
//                         id: '',
//                         bio: '',
//                         phone: '',
//                         username: '',
//                         name: {
//                             first: '',
//                             last: ''
//                         },
//                         picture: {
//                             thumbnail: '',
//                             medium: '',
//                             large: ''
//                         },
//                         email: '',
//                         tfa: false,
//                         friendListIds: [],
//                         banListIds: [],
//                         achievement: null,
//                         dmsIds: [],
//                         history: [],
//                         chatRoomsJoinedIds: [],
//                         profileComplet: false,
//                         notifications: [],
//                         gameInvitation: {
//                             gameId: '',
//                             inviterId: ''
//                         }
//                     },
//                     true
//                 );
//             },

//             fetchNotifications: async (offset: number, limit: number) => {
//                 const response = await api
//                     .get(
//                         `/profile/notifications?offset=${offset}&limit=${limit}`
//                     )
//                     .catch(() => ({ data: [] }));

//                 return response.data;
//             }
//         }),
//         {
//             name: 'userStore',
//             storage: createJSONStorage(() => localStorage) as any
//         }
//     ),
//     shallow
// );

// login: async () => {
//     const { data } = await request.get('/profile/me');
//     // ! user type men 3and simo
//     const user : UserState = data.user;
//     set({ ...user, isLogged: true });
//     return user.isLogged;
// }

// import { create } from 'zustand';
// import { request } from '../api';
// import { debounce } from 'lodash';

// // import { persist, createJSONStorage } from "zustand/middleware";
// // import { api } from "../Api/base";

// // {
// //     "user": {
// //       "id": "112965",
// //       "email": "ibouchaf@student.1337.ma",
// //       "HashPassword": null,
// //       "Avatar": null,
// //       "nickName": "ibouchaf",
// //       "fullName": "Issam Bouchafra",
// //       "status": true,
// //       "F2A": false,
// //       "F2A_Secret": null,
// //       "inGame": false,
// //       "createdAt": "2023-12-08T05:08:53.769Z"
// //     },
// //     "friends": [],
// //     "block": []
// //   }

// type UserState = {
//     key: string;
//     isLogged: boolean;
//     id: string;
//     email: string;
//     avatar: string;
//     nickName: string;
//     fullName: string;
//     createdAt: string;
//     status: boolean;
//     F2A: boolean;
//     inGame: boolean;
// };

// // // Define a type for the store's actions
// type UserActions = {
//     setKey: (newKey: UserState['key']) => void;
//     login: () => Promise<void>;
//     logout: () => void;
//     UpdateIsLogged: (isLogged: UserState['isLogged']) => void;
//     UpdateAvatar: (avatar: UserState['avatar']) => void;
//     UpdateNickName: (nickName: UserState['nickName']) => void;
//     // status:;
//     // F2A:;
//     // inGame:;
// };

// // Function to save state to localStorage
// const saveToLocalStorage = (state) => {
//     localStorage.setItem('myStore', JSON.stringify(state));
// };

// // Debounced version of save function to optimize performance
// const debouncedSave = debounce(saveToLocalStorage, 500);

// export const useUserStore = create<UserState & UserActions>((set) => {
//     const localState = JSON.parse(localStorage.getItem('myStore'));
//     return {
//         key: localState?.key || 'default',
//         setKey: (newKey) => set({ key: newKey }),
//         isLogged: false,
//         id: '',
//         email: '',
//         avatar: '',
//         nickName: '',
//         fullName: '',
//         createdAt: '',
//         status: false,
//         F2A: false,
//         inGame: false,
//         login: async () => {
//             const { data } = await request.get('/users/me');
//             // ! user type men 3and simo
//             set({
//                 isLogged: true,
//                 id: data.user.id,
//                 email: data.user.email,
//                 avatar: data.user.avatar,
//                 nickName: data.user.nickName,
//                 fullName: data.user.fullName,
//                 createdAt: data.user.createdAt,
//                 status: data.user.status,
//                 F2A: data.user.F2A,
//                 inGame: data.user.inGame
//             });
//         },
//         logout: () => {
//             set(
//                 {
//                     isLogged: false,
//                     id: '',
//                     email: '',
//                     avatar: '',
//                     nickName: '',
//                     fullName: '',
//                     createdAt: '',
//                     status: false,
//                     F2A: false,
//                     inGame: false
//                 },
//                 true // ? the state update should trigger a re-render of the components that subscribe to the store.
//             );
//         },
//         UpdateIsLogged: (isLogged) => set(() => ({ isLogged: isLogged })),
//         UpdateAvatar: (avatar) => set(() => ({ avatar: avatar })),
//         UpdateNickName: (nickName) => set(() => ({ nickName: nickName }))
//     };
// });

// // Subscribe to store changes
// useUserStore.subscribe((state) => {
//     debouncedSave(state);
// });
