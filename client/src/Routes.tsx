import {
    createBrowserRouter,
    redirect,
    // redirect,
    RouterProvider
} from 'react-router-dom';
import { useUserStore } from './stores';

// import { useUserStore } from './stores';
// import toast from 'react-hot-toast';

// import { lazy } from 'react';

function isCookieSet() {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(import.meta.env.VITE_BASE_URL + '='));
    return cookie !== undefined;
}

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
        loader: async () => {
            const user = useUserStore();

            
            if (!isCookieSet())
                return redirect('/login');
            // Replace this with your actual authentication logic
            // const isAuthenticated = await checkAuth();

            // if (!isAuthenticated) {
            // Redirect to the login page if not authenticated
            // }

            // You can also return data or simply return nothing
        },
        lazy: async () => {
            let { Layout } = await import('./components'); // conditional rendring in home page
            return { Component: Layout };
        },
        children: [
            // lazy
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
