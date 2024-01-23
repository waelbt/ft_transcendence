import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Verfication from '../pages/Verfication';
import NavigationMenu from './NavigationMenu';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { useChatSocketStore } from '../stores/ChatSocketStore';
import GlobalChat from './GlobalChat';

function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { updateState, accessToken, verified, isLogged, active } =
        useUserStore();
    // const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { initializeSocket, socket } = useChatSocketStore();

    useEffect(() => {
        const fetchData = async () => {
            console.log(accessToken);
            try {
                setIsLoading(true);
                const { user, friends, block } = (
                    await axiosPrivate.get('/users/me')
                ).data;
                updateState(user);
                updateState({ friends: friends, block: block });
                updateState({ active: true });
                initializeSocket(accessToken);
                socket?.emit('message', { message: 'test' });
                console.log(user.isProfileComplete && !user.F2A);
                updateState({ verified: user.isProfileComplete && !user.F2A });
            } catch (error) {
                console.log(error); // !toast
            } finally {
                setIsLoading(false);
            }
        };
        if (isLogged && !active) {
            fetchData();
        }
        return () => {
            socket?.disconnect();
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
                        <GlobalChat />
                    </div>
                </div>
            ) : (
                <Verfication />
            )}
        </>
    );
}

export default Layout;
