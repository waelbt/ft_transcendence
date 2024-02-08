import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Verfication from '../pages/Verfication';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { NavigationMenu } from '.';
import useGameStore from '../stores/gameStore';

function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { id, updateState, accessToken, verified, isLogged, active } =
        useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const { socket: gameSocket, initializeGameSocket } = useGameStore();

    useEffect(() => {
        console.log('accesstoken', accessToken);
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { user, friendsIds, blocksIds } = (
                    await axiosPrivate.get('/users/me')
                ).data;
                console.log();
                updateState({
                    active: true,
                    friendsIds,
                    blocksIds,
                    ...user,
                    verified: user.completeProfile && !user.F2A
                });
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        if (isLogged && !active) {
            fetchData();
        }

        initializeGameSocket();

        console.log('id ', id);
        return () => {
            gameSocket?.disconnect();
        };
    }, [isLogged]);

    if (isLoading) return <div>banaaaaaaaaaaaaaaaaaaaaaanaaana</div>;
    return (
        <>
            {verified ? (
                <div className="relative flex flex-col h-screen bg-primary-white">
                    <NavigationMenu />
                    <div className="flex-grow inline-flex justify-center items-center w-full gap-20">
                        <Outlet />
                        {/* <GlobalChat /> */}
                    </div>
                </div>
            ) : (
                <Verfication />
            )}
        </>
    );
}

export default Layout;
