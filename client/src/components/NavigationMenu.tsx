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
import { useChatLayoutStore } from '../stores/chatLayoutStore';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

function NavigationMenu() {
    const navigate = useNavigate();
    const { avatar, addUserFriendId, id: myId } = useUserStore();
    const { socket, pushNotification, notifications, unpushNotification } =
        useNotificationStore();
    const { socket: chatSocket, pushRoom } = useChatLayoutStore();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosPrivate.get('/users/notification');
            const notifications: NotificationDto[] = res.data;
            notifications.map((notification) => {
                pushNotification(notification);
            });
        };

        fetchData();
        socket?.on('notification', pushNotification);
        chatSocket?.on('notification', pushNotification);

        return () => {
            chatSocket?.off('notification', pushNotification);
            socket?.off('notification', pushNotification);
        };
    }, [socket, chatSocket]);

    useEffect(() => {
        const joinPrvRoom = async ({
            roomId,
            roomTitle,
            userId
        }: {
            roomId: number;
            roomTitle: string;
            userId: string;
        }) => {
        

            if (userId === myId) {
                try {
                    const res = await axiosPrivate.post('/chat/joinRoom', {
                        roomTitle: roomTitle,
                        roomId: roomId
                    });
                    socket?.emit('joinRoom', {
                        roomTitle: roomTitle,
                        roomId: roomId
                    });

                    pushRoom(res.data);
                    toast.success('Joined the room successfully');
                } catch (error) {
                    if (isAxiosError(error))
                        toast.error(error.response?.data?.message);
                }
            }
        };
        chatSocket?.on('prvRoom', joinPrvRoom);

        return () => {
            chatSocket?.off('prvRoom', joinPrvRoom);
        };
    }, [chatSocket]);

    const handleAccept = async (notification: NotificationDto) => {
        try {
            await axiosPrivate.post(
                `/friends/acceptFriendRequest/${notification.userId}`
            );
            addUserFriendId(notification.userId);
            unpushNotification(notification.id);
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
        }
    };

    const handleDecline = async (notification: NotificationDto) => {
        try {
            await axiosPrivate.post(
                `friends/rejectFriendRequest/${notification.userId}`
            );
            unpushNotification(notification.id);
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
        }
    };

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
                                            className="self-stretch  p-2.5 bg-white border-b border-black border-opacity-20 justify-between items-center inline-flex mx-4 "
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
                                                <div
                                                    className=" p-2 bg-blue-700 text-blue-600  bg-opacity-25 rounded-[30px] flex-col justify-center items-center gap-2.5 inline-flex cursor-pointer"
                                                    onClick={() =>
                                                        handleAccept(
                                                            notification
                                                        )
                                                    }
                                                >
                                                    <ImCheckmark />
                                                </div>
                                                <div
                                                    className="p-2 bg-red-600 text-red-600 bg-opacity-25 rounded-[30px] flex-col justify-center items-center gap-2.5 inline-flex cursor-pointer"
                                                    onClick={() =>
                                                        handleDecline(
                                                            notification
                                                        )
                                                    }
                                                >
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
                                userStatus="online"
                                style="w-12 h-12 ring ring-amber-500 ring-offset-base-100 ring-offset-2 mx-3 my-2  cursor-default"
                                avatarUserId={myId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationMenu;
