import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { NavigationMenu } from '.';
import useGameStore from '../stores/gameStore';
import { useChatSocketStore } from '../stores/ChatSocketStore';

function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { updateState, accessToken, id } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const { initializeSocket } = useChatSocketStore();
    console.log('hellooooooooo');
    const { socket: gameSocket, initializeGameSocket } = useGameStore();

    console.log(id);
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

        fetchData();
        updateState({
            redirectedFor2FA: true,
            redirectedForProfileCompletion: true
        });
        initializeSocket(accessToken);
        initializeGameSocket();
        console.log('id  ', id);
        return () => {
            gameSocket?.disconnect();
        };
    }, []);

    if (isLoading) return <div>banaaaaaaaaaaaaaaaaaaaaaanaaana</div>;
    return (
        <>
            <div className="relative flex flex-col h-screen bg-primary-white">
                <NavigationMenu />
                <div className="flex-grow inline-flex justify-center items-center w-full gap-20">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
