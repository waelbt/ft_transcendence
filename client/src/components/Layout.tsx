import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { NavigationMenu } from '.';
import useGameStore from '../stores/gameStore';

import { useChatStore } from '../stores/chatStore';

function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { updateState, accessToken, id } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const { initializeSocket, socket } = useChatStore();
    const { socket: gameSocket, initializeGameSocket } = useGameStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { user, friendsIds, blocksIds } = (
                    await axiosPrivate.get('/users/me')
                ).data;

                updateState({
                    friendsIds,
                    blocksIds,
                    ...user
                });
                console.log(user);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        console.log(accessToken);

        fetchData();
        updateState({
            redirectedFor2FA: true,
            redirectedForProfileCompletion: true
        });
        initializeSocket(accessToken, id);
        initializeGameSocket();
        console.log('id  ', id);
        return () => {
            socket?.disconnect();

            gameSocket?.disconnect();
        };
    }, []);

    if (isLoading) return <div>banaaaaaaaaaaaaaaaaaaaaaanaaana</div>;
    return (
        <div className="flex flex-col h-screen w-screen ">
            <NavigationMenu />
            <div className="flex-grow flex justify-center items-center overflow-hidden bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
