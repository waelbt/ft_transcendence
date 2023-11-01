import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectRoutes } from './hooks/ProtectRoutes';

const router = createBrowserRouter([
    {
        path: '/',
        lazy: async () => {
            let { Auth } = await import('./pages/Auth');
            return { Component: Auth };
        },
    },
    {
        path: '/ProfileCompletion',
        lazy: async () => {
            let { ProfileCompletion } = await import('./pages/ProfileCompletion');
            return { Component: ProfileCompletion };
        },
    },
    {
        path: '/',
        // lazy: async () => {
        //     let { ProfileCompletion } = await import('./pages/Layouts');
        //     return { Component: ProfileCompletion };
        // },
        children: [ // lazy
            {
                path: 'lobby',
                element: <div>lobby</div>
            },
            {
                path: 'chat',
                element: <div>chat</div>
            },
            {
                path: 'game',
                element: <div>game</div>
            },
            {
                path: 'profile', // params 
                element: <div>profile</div>
            },
            {
                path: '*',
                element: <div>not found</div>
            }
        ]
    },
]);

export default function AllRoutes() {
    return <RouterProvider router={router} />;
}
