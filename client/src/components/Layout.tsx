import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserStore } from '../stores/userStore';
import Verfication from '../pages/Verfication';
import GlobalChat from './GlobalChat';
import { useChatSocketStore } from '../stores/ChatSocketStore';
import { useGetUserInfos } from '../hooks/getUserInfos';
import NavigationMenu from './NavigationMenu';

function Layout() {
    const { updateState, accessToken, isProfileComplete, F2A, verified } =
        useUserStore();
    const { initializeSocket, socket } = useChatSocketStore();
    const { data, isLoading } = useGetUserInfos('/users/me', ['profile', 'me']);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (data) {
            updateState(data.user);
            updateState({ friends: data.friends, block: data.block });
            // setRedirect(F2A || !isProfileComplete );
            setRedirect((false) && !verified);
            initializeSocket(accessToken);
        }
        return () => socket?.disconnect();
    }, [
        data,
        F2A,
        isProfileComplete,
        updateState,
        accessToken,
        initializeSocket,
        verified
    ]);

    if (isLoading) return <div>Loading profile data...</div>; //! big loader

    return (
        <>
            {redirect ? (
                <Verfication />
            ) : (
                <div className="relative flex flex-col h-screen bg-primary-white">
                    <NavigationMenu />
                    <div className="flex-grow inline-flex justify-center items-center w-full gap-20">
                        <Outlet />
                        <GlobalChat />
                    </div>
                </div>
            )}
        </>
    );
}

export default Layout;
