import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Verfication from '../pages/Verfication';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { NavigationMenu, GlobalChat } from '.';
import useGameStore from '../stores/gameStore';
// import { useEffectOnce } from 'usehooks-ts';

// useEffectOnce(() => {
//     const fetchData = async () => {
//         // console.log(accessToken);
//         try {
//             setIsLoading(true);
//             // ! convert this to a construct function
//             const { user, friends, block } = (
//                 await axiosPrivate.get('/users/me')
//             ).data;
//             updateState({ active: true });
//             updateState(user);
//             // console.log(avatar);
//             updateState({
//                 avatar: `${
//                     import.meta.env.VITE_UPLOADS_DESTINATION
//                 }/${encodeURIComponent(user.avatar)}`
//             });
//             updateState({ friends: friends, block: block });
//             updateState({ verified: user.completeProfile && !user.F2A });
//         } catch (error) {
//             // console.log(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//     // if (isLogged && !active) {
//     fetchData();
//     // }
// });
function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { updateState, accessToken, verified, isLogged, active } =
        useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    // const { socket } = useChatSocketStore();
    const { socket: gameSocket, initializeGameSocket } = useGameStore();

    useEffect(() => {
        console.log('accesstoken', accessToken);
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // ! convert this to a construct function
                const { user, friends, block } = (
                    await axiosPrivate.get('/users/me')
                ).data;
                updateState({ active: true });
                updateState({ friendsIds: friends, blocksIds: block });
                updateState(user);
                updateState({
                    avatar: user.avatar
                });
                updateState({ verified: user.completeProfile && !user.F2A });
            } catch (error) {
                // console.log(error); //! handle this
            } finally {
                setIsLoading(false);
            }
        };
        if (isLogged && !active) {
            fetchData();
        }
        initializeGameSocket();
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
                    {/* <div className="flex-grow inline-flex justify-center items-center w-full gap-20"> */}
                    <Outlet />
                    {/* <GlobalChat /> */}
                    {/* </div> */}
                </div>
            ) : (
                <Verfication />
            )}
        </>
    );
}

export default Layout;
