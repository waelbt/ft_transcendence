import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { api } from "../Api/base";





export const useUserStore = create();

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