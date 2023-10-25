import AllRoutes from './Routes';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <AllRoutes />
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000
                }}
            />
        </>
    );
}

export default App;

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

