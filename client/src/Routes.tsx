import {
    createBrowserRouter,
    Navigate,
    redirect,
    // redirect,
    RouterProvider
} from 'react-router-dom';

// import { useUserStore } from './stores';
// import toast from 'react-hot-toast';

// import { lazy } from 'react';

// function RouteWrapper() {
//     // Directly use the condition to choose which component to render
//     if (isCookieSet(import.meta.env.VITE_BASE_URL)) {
//         const Layout = lazy(() => import('./components'));
//         console.log('cookis is set');
//         return <Layout />;
//     } else {
//         const Auth = lazy(() => import('./components'));
//         console.log('cookis is not');
//         return <Auth />;
//     }
// }

const router = createBrowserRouter([
    {
        path: '/login',
        lazy: async () => {
            let { Auth } = await import('./components'); // conditional rendring in home page
            return { Component: Auth };
        }
    },
    {
        path: '/',
        // loader: async () => {
        //     const cookies = document.cookie.split('; ');
        //     const cookie = cookies.find((row) =>
        //         row.startsWith(import.meta.env.VITE_COOKIE_NAME + '=')
        //     );
        //     console.log(cookie);
        //     if (cookie == undefined) return <Navigate to="/login" />;
        // },
        lazy: async () => {
            let { Layout } = await import('./components'); // conditional rendring in home page
            return { Component: Layout };
        },
        children: [
            // lazy
            {
                index: true,
                lazy: async () => {
                    let { Profile } = await import('./pages/Profile'); // conditional rendring in home page
                    return { Component: Profile };
                }
            },
            {
                path: '/home',
                lazy: async () => {
                    let { Lobby } = await import('./pages/Lobby'); // conditional rendring in home page
                    return { Component: Lobby };
                }
            },
            // {
            //     path: '/chat',
            //     lazy: async () => {
            //         let { Chat } = await import('./pages/Chat'); // conditional rendring in home page
            //         return { Component: Chat };
            //     }
            // },
            // {
            //     path: '/game',
            //     lazy: async () => {
            //         let { Game } = await import('./pages/Game'); // conditional rendring in home page
            //         return { Component: Game };
            //     }
            // },
            {
                path: '/profile', // search before implement
                lazy: async () => {
                    let { Profile } = await import('./pages/Profile'); // conditional rendring in home page
                    return { Component: Profile };
                },
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            let { MatchTable } = await import('./components/');
                            return { Component: MatchTable };
                        }
                    },
                    {
                        path: 'history',
                        lazy: async () => {
                            let { MatchTable } = await import('./components/'); // conditional rendring in home page
                            return { Component: MatchTable };
                        }
                    },
                    {
                        path: 'achivements',
                        lazy: async () => {
                            let { MatchTable } = await import('./components/'); // conditional rendring in home page
                            return { Component: MatchTable };
                        }
                    },
                    {
                        path: 'friends',
                        lazy: async () => {
                            let { FriendsDashboard } = await import(
                                './components/'
                            ); // conditional rendring in home page
                            return { Component: FriendsDashboard };
                        }
                    },
                    {
                        path: 'setting',
                        lazy: async () => {
                            let { Setting } = await import('./components/'); // conditional rendring in home page
                            return { Component: Setting };
                        }
                    }
                ]
            },
            {
                path: '/rooms', // search before implement
                lazy: async () => {
                    let { Rooms } = await import('./pages/Rooms'); // conditional rendring in home page
                    return { Component: Rooms };
                }
            }
        ]
    },
    {
        path: '*',
        element: <div>not found</div>
    }
]);

export default function AllRoutes() {
    return <RouterProvider router={router} />;
}

// {
//     path: '/get-started',
//     lazy: async () => {
//         let { ProfileCompletion } = await import(
//             './pages/ProfileCompletion'
//         );
//         return { Component: ProfileCompletion };
//     }
// },
