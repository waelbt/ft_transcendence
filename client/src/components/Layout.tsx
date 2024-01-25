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
                    avatar: `${import.meta.env.VITE_UPLOADS_DESTINATION}/${
                        user.data
                    }`
                });
                updateState({ friends: friends, block: block });
                // const encodedFileName = encodeURIComponent(user.avatar);
                // updateState({
                //     avatar: `${import.meta.env.VITE_BASE_URL}${encodedFileName}`
                // }); // ! handle default image

                initializeSocket(accessToken);
                socket?.emit('message', { message: 'test' });
                console.log('user     ', user);
                updateState({ verified: user.completeProfile && !user.F2A });
            } catch (error) {
                console.log(error); // !toast
            } finally {
                setIsLoading(false);
            }
        };
        if (isLogged && !active) {
            fetchData();
        }
        console.log(avatar);
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
