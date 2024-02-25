import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { NavigationMenu } from '.';
import useGameStore from '../stores/gameStore';

import { useChatLayoutStore } from '../stores/chatLayoutStore';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useNotificationStore } from '../stores/notiSocketfStore';
import { GoHome } from 'react-icons/go';
import { GoGear } from 'react-icons/go';
import { GoPerson } from 'react-icons/go';
import { GoCommentDiscussion } from 'react-icons/go';
import { GoSignOut } from 'react-icons/go';
import { GoPeople } from 'react-icons/go';

function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { updateState, accessToken } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const { initializeSocket, socket: chatSocket } = useChatLayoutStore();
    const {
        socket: gameSocket,
        initializeGameSocket,
        updateState: updateStateGame
    } = useGameStore();
    const { socket, initializeNotifSocket } = useNotificationStore();
    const sidebarRef = useRef<HTMLDivElement>(null); // Create a ref for the sidebar
    const location = useLocation(); // Get the current location
    const { logout } = useUserStore();

    const navItems = [
        { path: '/home', icon: GoHome },
        { path: '/profile/me/history', icon: GoPerson },
        { path: '/profile/me/friends', icon: GoPeople },
        { path: '/chat/', icon: GoCommentDiscussion },
        { path: '/profile/me/setting', icon: GoGear }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await axiosPrivate.get('/users/me');
                const { user, friendsIds, blocksIds } = res.data;
                console.log(res)
                updateState({
                    friendsIds,
                    blocksIds,
                    ...user
                });
            } catch (error) {
                if (isAxiosError(error))
                    toast.error(error.response?.data?.message);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        updateState({
            redirectedFor2FA: true,
            redirectedForProfileCompletion: true
        });

        initializeSocket(accessToken);
        initializeGameSocket(accessToken);
        initializeNotifSocket(accessToken);

        return () => {
            socket?.disconnect();
            chatSocket?.disconnect();
            gameSocket?.disconnect();
        };
    }, []);

    //const { socket: gameSocket, updateState : updateStateGame } = useGameStore();
    const { id: userId } = useUserStore();

    const navigate = useNavigate();

    useEffect(() => {
        console.log('start startgame useEffect');
        gameSocket?.on(
            'startgame',
            ({ room, SecondPlayer, opponentId, chosen }) => {
                console.log(SecondPlayer);
                updateStateGame({
                    isSecondPlayer: SecondPlayer === 1,
                    roomId: room,
                    isGameReady: true,
                    opponentId,
                    gameMode: chosen
                });
                // setIsEventOpen(false);
                // window.location.href =(`/game/${room}`);
                navigate(`/game/${room}`);
            }
        );

        return () => {
            gameSocket?.off('startgame');
            console.log('stop startgame useEffect');
        };
    }, [gameSocket]);
    useEffect(() => {
        gameSocket?.on('challenge', () => {
            toast((t) => (
                <div className=" justify-center items-center flex flex-row gap-3">
                    <span>you have been challenged by </span>
                    <button
                        className=" rounded-lg border border-green-500 p-1 text-green-500"
                        onClick={() => {
                            gameSocket.emit('friends', {
                                userid: '',
                                myid: userId
                            });
                            toast.dismiss(t.id);
                        }}
                    >
                        Accept
                    </button>
                    <button
                        className=" rounded-lg border border-red-500 p-1 text-red-500"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            ));
        });
        return () => {
            gameSocket?.off('challenge');
        };
    }, [gameSocket]);

    useEffect(() => {
        // ... [fetchData logic]

        const handleMouseMove = (event: MouseEvent) => {
            const sidebar = sidebarRef.current;
            const threshold = 50; // distance in pixels from the edge

            if (sidebar) {
                if (event.clientX < threshold) {
                    sidebar.style.left = '10px'; // Sidebar visible
                } else {
                    sidebar.style.left = '-74px'; // Sidebar hidden
                }
            }
        };

        // Check if the current path starts with '/chat'
        if (location.pathname.startsWith('/chat')) {
            document.addEventListener('mousemove', handleMouseMove);
        } else if (sidebarRef.current) {
            sidebarRef.current.style.left = '10px'; // Sidebar stays visible
        }
        if (location.pathname.startsWith('/game') && sidebarRef.current)
            sidebarRef.current.style.display = 'hidden';

        return () => {
            if (location.pathname.startsWith('/chat')) {
                document.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [location]);

    // useEffect(() => {
    //     // ... [other code]
    //     console.log(location);

    //     const handleMouseMove = (event) => {
    //         const sidebar = sidebarRef.current;
    //         const threshold = 50;

    //         if (sidebar && event.clientX < threshold) {
    //             sidebar.style.left = '0px';
    //         } else if (sidebar) {
    //             sidebar.style.left = '-74px';
    //         }
    //     };

    //     // Add event listener only when on /chat route
    //     if (location.pathname === '/chat') {
    //         document.addEventListener('mousemove', handleMouseMove);
    //     } else if (sidebarRef.current) sidebarRef.current.style.left = '0px';

    //     return () => {
    //         if (location.pathname === '/chat') {
    //             document.removeEventListener('mousemove', handleMouseMove);
    //         }
    //     };
    // }, [location]); // Add location t

    if (isLoading) return <div>banaaaaaaaaaaaaaaaaaaaaaanaaana</div>;
    return (
        <div className="flex flex-col h-screen w-screen relative ">
            <NavigationMenu />
            <div
                id="sidebar"
                ref={sidebarRef}
                className="w-[74px] h-[45%] py-5 bg-white rounded-[20px] shadow border border-stone-300 flex-col justify-between items-center inline-flex  absolute top-1/2 left-4 transform  -translate-y-1/2"
            >
                <div className="flex-col justify-start items-center gap-5 flex ">
                    {navItems.map(({ path, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `p-[5px] rounded-[10px] justify-center items-center inline-flex cursor-pointer${
                                    isActive
                                        ? 'bg-orange-600 bg-opacity-20 text-orange-600  '
                                        : 'text-slate-400'
                                }`
                            }
                        >
                            <Icon size={24} />
                        </NavLink>
                    ))}
                </div>
                <div
                    className="justify-center items-center gap-3 inline-flex cursor-pointer"
                    onClick={() => logout()}
                >
                    <GoSignOut size={24} />
                </div>
            </div>
            <div className="overflow-y-auto max-h-screen flex-grow flex justify-center items-center overflow-hidden bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
