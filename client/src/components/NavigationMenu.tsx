import { NavLink, useNavigate } from 'react-router-dom';
import { MENU_FIELDS, NAV_LINKS } from '../constants';
import Popup from 'reactjs-popup';
import {
    IoIosCheckmarkCircleOutline,
    IoIosCloseCircleOutline,
    IoIosNotifications
} from 'react-icons/io';
import { Avatar } from '.';
import { useUserStore } from '../stores/userStore';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import { useNotificationStore } from '../stores/notiSocketfStore';

function NavigationMenu() {
    const navigate = useNavigate();
    const { logout, nickName, avatar } = useUserStore();
    const [notificationsCount, setNotificationsCount] = useState(0);
    const { socket } = useNotificationStore();
    useEffect(() => {
        socket?.on('notification', (Payload) => {
            console.log(Payload);
            setNotificationsCount((prevCount) => prevCount + 1);
        });

        return () => {
            socket?.off('notification');
        };
    }, [socket]);

    return (
        <nav className="bg-white border-b border-neutral-100">
            <div className="w-full px-4">
                <div className="flex justify-between items-center">
                    {/* <!-- Logo Section --> */}
                    <div
                        className="flex-shrink-0 text-black text-xl font-bold font-['Lemonada'] cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        LaughTale
                    </div>

                    {/* <!-- Menu Section --> */}
                    <SearchBar />
                    {/* <div className="justify-center items-center gap-2.5 inline-flex">
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
                    </div> */}
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
                                    {notificationsCount > 0 && (
                                        <span className="absolute top-0 right-0  h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-xs text-white">
                                            {notificationsCount}
                                        </span>
                                    )}
                                </div>
                            }
                            position="bottom right"
                            nested
                        >
                            <div className="p-2.5 bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex w-max">
                                {/* Render your notifications content here */}
                                {notificationsCount === 0 ? (
                                    <p>No new notifications</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {[...Array(notificationsCount)].map(
                                            (_, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 border-b border-gray-200"
                                                >
                                                    <div className="flex items-center">
                                                        <img
                                                            alt="Avatar"
                                                            className="w-10 h-10 rounded-full mr-4"
                                                        />
                                                        <div className=" gap-1">
                                                            <p className="font-semibold">
                                                                nickname
                                                            </p>
                                                            <p className="text-gray-500">
                                                                incoming friend
                                                                request{' '}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex  gap-2 ml-4">
                                                        <IoIosCheckmarkCircleOutline
                                                            className="text-green-500 cursor-pointer"
                                                            size={40}
                                                        />
                                                        <IoIosCloseCircleOutline
                                                            className="text-red-500 cursor-pointer"
                                                            size={40}
                                                        />
                                                    </div>
                                                </div>
                                                // <li key={index} className="font-bold">flaaaan galiiikkk Notification {index + 1}</li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>
                        </Popup>

                        <Popup
                            trigger={
                                <div
                                    className={`group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 text-white`}
                                >
                                    <Avatar
                                        imageUrl={avatar}
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
                                        imageUrl={avatar}
                                        state="online"
                                    />
                                    <div className="text-black text-2xl font-normal font-['Acme']">
                                        {nickName}
                                    </div>
                                </li>
                                {MENU_FIELDS.map((field, index) => (
                                    <li
                                        key={index}
                                        className="self-stretch p-2.5 justify-start items-center gap-4 inline-flex hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            field.path == '/'
                                                ? logout()
                                                : navigate(field.path);
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
    );
}

export default NavigationMenu;
