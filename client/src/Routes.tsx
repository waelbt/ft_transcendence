import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        lazy: async () => {
            let { RequireAuth } = await import('./components');
            return { Component: RequireAuth };
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    let { Lobby } = await import('./pages/Lobby');
                    return { Component: Lobby };
                }
            },
            {
                path: '/home',
                lazy: async () => {
                    let { Lobby } = await import('./pages/Lobby');
                    return { Component: Lobby };
                }
            },
            {
                path: '/chat',
                // path: '/chat/:userId',
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
                path: '/rooms',
                lazy: async () => {
                    let { Rooms } = await import('./pages/Rooms');
                    return { Component: Rooms };
                }
            },
            {
                path: 'Profile/:id',
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
                            let { Achievements } = await import(
                                './components/'
                            );
                            return { Component: Achievements };
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
                path: '*',
                lazy: async () => {
                    let { NotFound } = await import('./components/errorPages/');
                    return { Component: NotFound };
                }
            }
        ]
    }
]);

export default function AllRoutes() {
    return <RouterProvider router={router} />;
}
