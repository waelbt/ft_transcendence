import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Verfication from '../pages/Verfication';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { useChatSocketStore } from '../stores/ChatSocketStore';
import { NavigationMenu, GlobalChat } from '.';

function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { updateState, avatar, accessToken, verified, isLogged, active } =
        useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const { initializeSocket, socket } = useChatSocketStore();

    useEffect(() => {
        const fetchData = async () => {
            console.log(accessToken);
            try {
                setIsLoading(true);
                // ! convert this to a construct function
                const { user, friends, block } = (
                    await axiosPrivate.get('/users/me')
                ).data;
                updateState({ active: true });
                updateState(user);
                updateState({
                    avatar: `${
                        import.meta.env.VITE_UPLOADS_DESTINATION
                    }/${user.avatar?.replace(/ /g, '%20')}`
                });
                updateState({ friends: friends, block: block });
                updateState({ verified: user.completeProfile && !user.F2A });
                // initializeSocket(accessToken);
                // socket?.emit('message', { message: 'test' });
            } catch (error) {
                console.log(error);
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
