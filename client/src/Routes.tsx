import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        lazy: async () => {
            let { Auth } = await import('./pages/Auth');
            return { Component: Auth };
        }
    },
    {
        path: '/get-started',
        lazy: async () => {
            let { ProfileCompletion } = await import('./pages/ProfileCompletion');
            return { Component: ProfileCompletion };
        }
    },
    {
        path: '/',
        lazy: async () => {
            let { Layout } = await import('./components');
            return { Component: Layout };
        },
        children: [
            // lazy
            {
                path: '/lobby',
                lazy: async () => {
                    let { Lobby } = await import('./pages/Lobby'); // conditional rendring in home page
                    return { Component: Lobby };
                }
            },
            {
                path: '/chat',
                lazy: async () => {
                    let { Chat } = await import('./pages/Chat'); // conditional rendring in home page
                    return { Component: Chat };
                }
            },
            {
                path: '/game',
                lazy: async () => {
                    let { Game } = await import('./pages/Game'); // conditional rendring in home page
                    return { Component: Game };
                }
            },
            {
                path: '/profile', // search before implement
                lazy: async () => {
                    let { Profile } = await import('./pages/Profile'); // conditional rendring in home page
                    return { Component: Profile };
                }
            },
            {
                path: '/setting', // search before implement
                lazy: async () => {
                    let { Setting } = await import('./pages/Setting'); // conditional rendring in home page
                    return { Component: Setting };
                }
            },
            {
                path: '/rooms', // search before implement
                lazy: async () => {
                    let { Rooms } = await import('./pages/Rooms'); // conditional rendring in home page
                    return { Component: Rooms };
                }
            },
            {
                path: '*',
                element: <div>not found</div>
            }
        ]
    }
]);

export default function AllRoutes() {
    return <RouterProvider router={router} />;
}
