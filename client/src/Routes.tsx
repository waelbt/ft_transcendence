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
                lazy: async () => {
                    let { ChatLayouts } = await import('./components');
                    return { Component: ChatLayouts };
                },
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            let { LandingChat } = await import('./components');
                            return { Component: LandingChat };
                        }
                    },
                    {
                        path: 'dms/:roomId',
                        lazy: async () => {
                            let { Chat } = await import('./pages/Chat');
                            return { Component: Chat };
                        }
                    },
                    {
                        path: 'group/:roomId',
                        lazy: async () => {
                            let { Room } = await import('./pages/Room');
                            return { Component: Room };
                        }
                    }
                ]
            },
            {
                path: '/game/:roomId',
                lazy: async () => {
                    let { Game } = await import('./pages/Game');
                    return { Component: Game };
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
            // {
            //     path: '/error/403',
            //     lazy: async () => {
            //         let { Forbidden } = await import(
            //             './components/errorPages/Forbidden'
            //         );
            //         return { Component: Forbidden };
            //     }
            // },
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
                path: '/error/404',
                lazy: async () => {
                    let { NotFound } = await import(
                        './components/errorPages/NotFound'
                    );
                    return { Component: NotFound };
                }
            },
            {
                path: '/error/400',
                lazy: async () => {
                    let { BadRequest } = await import(
                        './components/errorPages/BadRequest'
                    );
                    return { Component: BadRequest };
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
