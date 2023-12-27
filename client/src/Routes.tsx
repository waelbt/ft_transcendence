import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        lazy: async () => {
            let { Auth } = await import('./components');
            return { Component: Auth };
        }
    },
    {
        path: '/',
        lazy: async () => {
            let { Layout } = await import('./components');
            return { Component: Layout };
        },
        children: [
            // {
            //     index: true,
            //     lazy: async () => {
            //         let { Profile } = await import('./pages/Profile');
            //         return { Component: Profile };
            //     }
            // },
            {
                path: '/home',
                lazy: async () => {
                    let { Lobby } = await import('./pages/Lobby');
                    return { Component: Lobby };
                }
            },
            {
                path: '/chat',
                lazy: async () => {
                    let { Chat } = await import('./pages/Chat');
                    return { Component: Chat };
                }
            },
            {
                path: '/game',
                lazy: async () => {
                    let { Game } = await import('./pages/Game');
                    return { Component: Game };
                }
            },
            {
                path: '/profile', // search before implement
                lazy: async () => {
                    let { Profile } = await import('./pages/Profile');
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
                            let { MatchTable } = await import('./components/');
                            return { Component: MatchTable };
                        }
                    },
                    {
                        path: 'achivements',
                        lazy: async () => {
                            let { MatchTable } = await import('./components/');
                            return { Component: MatchTable };
                        }
                    },
                    {
                        path: 'friends',
                        lazy: async () => {
                            let { FriendsDashboard } = await import(
                                './components/'
                            );
                            return { Component: FriendsDashboard };
                        }
                    },
                    {
                        path: 'setting',
                        lazy: async () => {
                            let { Setting } = await import('./components/');
                            return { Component: Setting };
                        }
                    }
                ]
            },
            {
                path: '/rooms',
                lazy: async () => {
                    let { Rooms } = await import('./pages/Rooms');
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
