import AllRoutes from './Routes';
import { Toaster } from 'react-hot-toast';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    QueryOptions,
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { useEffect } from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        } as QueryOptions
    }
});

function App() {
    useEffect(() => {
        console.log(import.meta.env.VITE_BASE_URL);
    }, [import.meta.env.VITE_APP_BASE_URL])
    return (
        // ask gpt later abt the provider oders
        <QueryClientProvider client={queryClient}>
            <AllRoutes />
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000
                }}
            />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
