import { create } from 'zustand';
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

// Define a type for the store's actions
type UserActions = {
    login: (name: string, avatar: string) => void;
    logout: () => void;
};

export const useUserStore = create<UserState & UserActions>();

// import { create } from 'zustand';

// interface countProbs {
//     count: number;
//     inc: (event: React.MouseEvent<HTMLElement>) => void;
// }

// const useStore = create<countProbs>((set) => ({
//     count: 1,
//     inc: (e) => {
//         console.log(e);
//         set((state) =>
//         {
//             console.log(state);
//             return {
//                 count: (state.count + 1)
//             }
//         });
//     }
// }));

// function Counter() {
//     const { count, inc } = useStore();
//     return (
//         <div className="counter">
//             <span>{count}</span>
//             <button onClick={inc}>one up</button>
//         </div>
//     );
// }

// export default function App() {
//     return (
//         <div className="code">
//             <div className="code-container">
//                 {/* <PrismCode className="language-jsx" children={code} /> */}
//                 <Counter />
//             </div>
//         </div>
//     );
// }
