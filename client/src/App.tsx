// import AllRoutes from './Routes';
// import { Toaster } from 'react-hot-toast';
// QueryOptions,
// QueryClient,
// QueryClientProvider,
import { useQuery, useMutation } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             staleTime: Infinity,
//             cacheTime: Infinity
//         } as QueryOptions
//     }
// });

type Todo = {
    id: number;
    content: string;
};

let index = 0;
let todos: Todo[] = [
    { id: 1, content: 'todo1' },
    { id: 2, content: 'todo2' }
];

function App() {
    const { isPending, variables, mutate } = useMutation({
        mutationFn: async (todo: Todo) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            todos.push(todo);
            index++;
        }
    });
    const { data } = useQuery({
        queryKey: ['todos'],
        queryFn: () => todos
    });

    return (
        <>
            <button onClick={() => mutate({id: index, content: `todo ${index}`})}>add todo </button>
            <ul>
                {data
                    ? data.map((todo) => <li key={todo.id}>{todo.content}</li>)
                    : null}
                {isPending && (
                    <li style={{ opacity: 0.5 }}>{variables.content}</li>
                )}
            </ul>
        </>
    );

    // return (
    //     // ask gpt later abt the provider oders
    //     <QueryClientProvider client={queryClient}>
    //         <AllRoutes />
    //         <Toaster
    //             position="top-center"
    //             reverseOrder={false}
    //             toastOptions={{
    //                 duration: 3000
    //             }}
    //         />
    //         {/* <ReactQueryDevtools/> */}
    //     </QueryClientProvider>
    // );
}

export default App;
