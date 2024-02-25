import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { IoIosNotifications } from 'react-icons/io';
import { Avatar } from '.';
import { useUserStore } from '../stores/userStore';
import SearchBar from './SearchBar';
import { ImCheckmark } from 'react-icons/im';
import { FaXmark } from 'react-icons/fa6';
import { useNotificationStore } from '../stores/notiSocketfStore';
import { useEffect } from 'react';
import { NotificationDto } from '../../../shared/types';
import { axiosPrivate } from '../api';

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { NotificationDto } from '../../../shared/types';

function NavigationMenu() {
    const navigate = useNavigate();
    const { avatar } = useUserStore();
    const { socket, pushNotification, notifications } = useNotificationStore();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosPrivate.get('/users/notification');
            console.log('response not', res);
            const notifications: NotificationDto[] = res.data;
            notifications.map((notification) => {
                pushNotification(notification);
            });
        };

        fetchData();
        socket?.on('notification', pushNotification);

        return () => {
            socket?.off('notification', pushNotification);
        };
    }, [socket]);

    // /users/notification

    // const handleAccept = async () => {
    //     await axiosPrivate.post(`/friends/acceptFriendRequest/${paramId}`);
    //     console.log('Accepted notification ');
    // };

    // const handleDecline = async () => {
    //     await axiosPrivate.post(`/friends/declineFriendRequest/${paramId}`);
    //     console.log('Declined notification');

    // };

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
                                    {notifications.length ? (
                                        <span className="absolute top-0 right-0  h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-xs text-white">
                                            {notifications.length}
                                        </span>
                                    ) : null}
                                </div>
                            }
                            position="bottom right"
                            nested
                        >
                            <div className="w-96 overflow-y-auto h-[188px]   py-px bg-white rounded-md border border-black border-opacity-20 flex-col justify-start items-center inline-flex relative">
                                {notifications.length ? (
                                    notifications.map((notification, index) => (
                                        <div
                                            key={index}
                                            className="self-stretch debug p-2.5 bg-white border-b border-black border-opacity-20 justify-between items-center inline-flex mx-4 "
                                        >
                                            <img
                                                className="w-14 h-w-14 rounded-full"
                                                src={notification.avatar}
                                            />
                                            <div className="w-[148px]">
                                                <span className="text-black text-base font-bold font-['Lemonada']">
                                                    {notification.nickName}
                                                </span>
                                                <span className="text-black text-base font-normal font-['Acme']">
                                                    {' '}
                                                </span>
                                                <span className="text-zinc-600 text-base font-normal font-['Acme']">
                                                    {notification.action}
                                                </span>
                                            </div>
                                            <div className="justify-center items-center gap-[5px] flex">
                                                <div className=" p-2 bg-blue-700 text-blue-600  bg-opacity-25 rounded-[30px] flex-col justify-center items-center gap-2.5 inline-flex cursor-pointer">
                                                    <ImCheckmark />
                                                </div>
                                                <div className="p-2 bg-red-600 text-red-600 bg-opacity-25 rounded-[30px] flex-col justify-center items-center gap-2.5 inline-flex cursor-pointer">
                                                    <FaXmark />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className=' bg-white flex justify-center items-center text-zinc-400 text-4xl font-normal font-["Acme"] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                                        EMPTY
                                    </div>
                                )}
                            </div>
                        </Popup>
                        <div onClick={() => navigate('/profile/me')}>
                            <Avatar
                                imageUrl={avatar}
                                style="w-12 h-12 ring ring-amber-500 ring-offset-base-100 ring-offset-2 mx-3 my-2  cursor-default"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationMenu;
