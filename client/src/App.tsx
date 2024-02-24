import AllRoutes from './Routes';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    QueryClient,
    QueryClientProvider,
    QueryOptions
} from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        } as QueryOptions
    }
});

function App() {


    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <AllRoutes />
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3000
                    }}
                    containerStyle={{ zIndex: 9999 }}
                />
            </ErrorBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
