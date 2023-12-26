import { create } from 'zustand';
import { request } from '../api';
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
    logout: () => Promise<void>;
    UpdateIsLogged: (isLogged: UserState['isLogged']) => void;
    UpdateAvatar: (avatar: UserState['avatar']) => void;
    UpdateNickName: (nickName: UserState['nickName']) => void;
    // status:;
    // F2A:;
    // inGame:;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
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
    logout: async () => {
        await request.get('/auth/logout');
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
}));

// login: async () => {
//     const { data } = await request.get('/profile/me');
//     // ! user type men 3and simo
//     const user : UserState = data.user;
//     set({ ...user, isLogged: true });
//     return user.isLogged;
// }
