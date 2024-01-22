import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Verfication from '../pages/Verfication';
import NavigationMenu from './NavigationMenu';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
// import GlobalChat from './GlobalChat';

function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { updateState, accessToken, verified, isLogged, active } =
        useUserStore();
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                setRedirect((user.F2A || !user.isProfileComplete) && !verified);
            } catch (error) {
                console.log(error); // !toast
            } finally {
                setIsLoading(false);
            }
        };
        if (isLogged && !active) fetchData();
    }, [isLogged]);

    if (isLoading) return <div>banaaaaaaaaaaaaaaaaaaaaaanaaana</div>;
    return (
        <>
            {redirect ? (
                <Verfication />
            ) : (
                <div className="relative flex flex-col h-screen bg-primary-white">
                    <NavigationMenu />
                    <div className="flex-grow inline-flex justify-center items-center w-full gap-20">
                        <Outlet />
                        {/* <GlobalChat />   */}
                    </div>
                </div>
            )}
        </>
    );
}

export default Layout;
