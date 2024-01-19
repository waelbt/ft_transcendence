import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { useEffect } from 'react';
// import { Popover, Transition } from '@headlessui/react';
import { MENU_FIELDS, NAV_LINKS } from '../constants';

import { Avatar } from '.';
import { useUserStore } from '../stores/userStore';
// import { ProfileCompletion } from '../pages/ProfileCompletion';
import Confirmation from '../pages/Confirmation';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import GlobalChat from './GlobalChat';
import Popup from 'reactjs-popup';
import { useChatSocketStore } from '../stores/ChatSocketStore';
// import useRefreshToken from '../hooks/RefreshTokenHook';

function Layout() {
    const axiosPrivate = useAxiosPrivate();
    const { logout, updateState, accessToken, isProfileComplete, F2A } =
        useUserStore();
    const navigate = useNavigate();
    const { initializeSocket, socket } = useChatSocketStore();

    useEffect(() => {
        console.log(accessToken);
        if (accessToken) {
            initializeSocket(accessToken);
        }

        // socket?.emit('globalChat', {message: 'test'});
        return () => {
            socket?.disconnect();
        };
    }, [initializeSocket, socket]);

    useEffect(() => {
        // if (!isLogged) navigate('/');
        // Define the async function inside the useEffect
        const fetchData = async () => {
            try {
                const { data } = await axiosPrivate.get('/users/me'); // ! react query
                updateState(data.user);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // Call the async function
        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <>
            {isProfileComplete || F2A ? (
                <Confirmation />
            ) : (
                <div className="relative flex flex-col h-screen bg-primary-white">
                    <nav className="bg-white border-b border-neutral-100">
                        <div className="w-full px-4">
                            <div className="flex justify-between items-center">
                                {/* <!-- Logo Section --> */}
                                <div
                                    className="flex-shrink-0 text-black text-xl font-bold font-['Lemonada'] cursor-pointer"
                                    onClick={() => navigate('/home')}
                                >
                                    LaughTale
                                </div>

                                {/* <!-- Menu Section --> */}
                                <div className="justify-center items-center gap-2.5 inline-flex">
                                    {NAV_LINKS.map((link) => (
                                        <NavLink
                                            key={link}
                                            to={`/${link}`}
                                            className={({ isActive }) =>
                                                `px-2.5 py-[21px] justify-center items-center gap-2.5 flex text-xl font-normal font-['Acme'] ${
                                                    isActive
                                                        ? 'text-black border-b-4 border-black '
                                                        : ' text-neutral-500'
                                                }`
                                            }
                                        >
                                            {link}
                                        </NavLink>
                                    ))}
                                </div>
                                {/* <!-- avatar && notifaction uSection --> */}
                                <div className=" px-2.5 justify-start items-center gap-[30px] inline-flex">
                                    {/* <!-- notifaction Section --> */}
                                    <Popup
                                        trigger={
                                            <div className="relative p-2.5 bg-neutral-100 rounded-[50px] justify-start items-center gap-2.5 inline-flex">
                                                <IoIosNotifications
                                                    className="text-gray-500"
                                                    size={28}
                                                />
                                                {/*  //!  Red dot for new notifications <span className="absolute top-0 right-0 block h-3 w-3 bg-red-600 rounded-full"></span> */}
                                            </div>
                                        }
                                        position="bottom right"
                                        nested
                                    >
                                        <div className="p-2.5 bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex w-max">
                                            not implemneted yet
                                        </div>
                                    </Popup>

                                    <Popup
                                        trigger={
                                            <div
                                                className={`group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 text-white`}
                                            >
                                                <Avatar
                                                    imageUrl="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                                                    style="w-12 h-12 ring ring-amber-500 ring-offset-base-100 ring-offset-2"
                                                />
                                            </div>
                                        }
                                        position="bottom right"
                                        nested
                                    >
                                        <div className="p-2.5 bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex w-max">
                                            <li
                                                className="self-stretch p-2.5  border-b border-neutral-300 justify-start items-center gap-4 inline-flex hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {
                                                    navigate('/profile/me');
                                                }}
                                            >
                                                <Avatar
                                                    style="h-10 w-10"
                                                    imageUrl={
                                                        'https://tecdn.b-cdn.net/img/new/avatars/2.webp'
                                                    }
                                                    state="online"
                                                />
                                                <div className="text-black text-2xl font-normal font-['Acme']">
                                                    dos404
                                                </div>
                                            </li>
                                            {MENU_FIELDS.map((field, index) => (
                                                <li
                                                    key={index}
                                                    className="self-stretch p-2.5 justify-start items-center gap-4 inline-flex hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        field.path == '/'
                                                            ? logout()
                                                            : null;
                                                        navigate(field.path);
                                                    }}
                                                >
                                                    <div className="p-1 rounded-[50px] justify-start items-center gap-2.5 flex">
                                                        <field.icon size={24} />
                                                    </div>
                                                    <div className="text-zinc-600 text-xl font-normal font-['Acme'] pr-10">
                                                        {field.name}
                                                    </div>
                                                </li>
                                            ))}
                                        </div>
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {/* <div className="py-3 bg-black flex-grow inline-flex justify-center items-center"> */}
                    {/* <div className="h-full w-full flex-grow"> */}
                    <div className="flex-grow inline-flex justify-center items-center w-full gap-20 ">
                        {/* <Outlet /> */}
                        {/* <div className="h-full flex justify-center items-center"> */}
                        <GlobalChat />
                        {/* </div> */}
                    </div>
                    {/* </div> */}
                    {/* <div className="h-full w-full bg-white flex-grow-0"></div> */}
                    {/* </div> */}
                </div>
            )}
        </>
    );
}

export default Layout;
