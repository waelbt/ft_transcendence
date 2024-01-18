import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import {
//     QueryClient,
//     QueryClientProvider,
//     QueryOptions
// } from '@tanstack/react-query';
import './global.css';

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             staleTime: Infinity,
//             cacheTime: Infinity
//         } as QueryOptions
//     }
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <QueryClientProvider client={queryClient}>
        <App />
    // </QueryClientProvider>
);
