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
                    let { home } = await import('./pages/home');
                    return { Component: home };
                }
            },
            {
                path: '/home',
                lazy: async () => {
                    let { home } = await import('./pages/home');
                    return { Component: home };
                }
            },
            {
                path: '/chat',
                lazy: async () => {
                    let { Chat } = await import('./pages/chat');
                    return { Component: Chat };
                }
            },
            {
                path: '/play/:roomId',
                lazy: async () => {
                    let { play } = await import('./pages/play');
                    return { Component: play };
                }
            },
            {
                path: '/rooms',
                lazy: async () => {
                    let { Rooms } = await import('./pages/rooms');
                    return { Component: Rooms };
                }
            },
            {
                path: 'Profile/:id',
                lazy: async () => {
                    let { Profile } = await import('./pages/profile');
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
                path: '/error/403',
                lazy: async () => {
                    let { Forbidden } = await import(
                        './components/errorPages/Forbidden'
                    );
                    return { Component: Forbidden };
                }
            },
            {
                path: '/error/500',
                lazy: async () => {
                    let { ServerError } = await import(
                        './components/errorPages/ServerError'
                    );
                    return { Component: ServerError };
                }
            },
            {
                path: '*',
                lazy: async () => {
                    let { NotFound } = await import(
                        './components/errorPages/NotFound'
                    );
                    return { Component: NotFound };
                }
            }
        ]
    }
]);

export default function AllRoutes() {
    return <RouterProvider router={router} />;
}
