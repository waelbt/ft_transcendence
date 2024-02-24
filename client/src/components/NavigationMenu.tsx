import { useNavigate } from 'react-router-dom';
import { MENU_FIELDS } from '../constants';
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
    const { avatar } = useUserStore();
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
                        <Avatar
                            imageUrl={avatar}
                            style="w-12 h-12 ring ring-amber-500 ring-offset-base-100 ring-offset-2 mx-3 my-2  cursor-default"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationMenu;
