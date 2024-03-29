import { useEffect, useState } from 'react';
import { Avatar, Modal } from '.';
import { OnlineUser } from '../../../shared/types';
import { NavLink, Outlet } from 'react-router-dom';
import { DateFormatter } from '../tools/date_parsing';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import RoomsFinder from './RoomsFinder';
import GroupsForm from './GroupsForm';
import { useChatLayoutStore } from '../stores/chatLayoutStore';
import { useRoomStore } from '../stores/roomStore';
import { useUserStore } from '../stores/userStore';

function ChatLayouts() {
    // const [searchTerm, setSearchTerm] = useState<string>('');
    const { Layout_Rooms, updateState, socket, pushRoom, unpushRoom } =
        useChatLayoutStore();
    // const [rooms, SetRooms] = useState<RoomsList[]>([]);
    // const [onlineUser, setOnlineUser] = useState<OnlineUser[]>([]);
    const { id: userId } = useUserStore();

    const {
        messageListener,
        userJoinedListener,
        userLeftListener,
        userkickedListener,
        pushModerator,
        pushBan,
        pushMuted,
        unpushMuted,
        unpushModerator
    } = useRoomStore();
    const axiosPrivate = useAxiosPrivate();
    const [state, setState] = useState<boolean>(false);
    const [isEventOpen, setIsEventOpen] = useState(false);

    const openEvent = () => setIsEventOpen(true);
    const closeEvent = () => setIsEventOpen(false);
    const navigate = useNavigate();
    useEffect(() => {
        // !
        const fetchDns = async () => {
            try {
                const res = await axiosPrivate.get('/chat/allChannels');
                updateState({ Layout_Rooms: res.data });
            } catch (error) {
                if (isAxiosError(error))
                    toast.error(error.response?.data?.message);
            }
        };
        // const fetchOnlineUsers = async () => {
        //     try {
        //         const res = await axiosPrivate.get('/users/onlineUsers');
        //         setOnlineUser(res.data);
        //     } catch (error) {
        //         if (isAxiosError(error))
        //             toast.error(error.response?.data?.message);
        //     }
        // };

        // fetchOnlineUsers();
        fetchDns();
        socket?.on('checkDm', pushRoom);

        // fetchMessages();

        return () => {
            socket?.off('checkDm', pushRoom);
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handlekick = ({
            id: kickedUser,
            nickname,
            roomId
        }: {
            id: string;
            nickname: string;
            roomId: string;
        }) => {
            userkickedListener({ id: kickedUser, nickname });
            if (kickedUser === userId){
                unpushRoom(+roomId, true);
            }
                
        };

        const handleBan = ({
            id: banUser,
            nickname,
            roomId
        }: {
            id: string;
            nickname: string;
            roomId: string;
        }) => {
            pushBan({ id: banUser, nickname });
            if (banUser === userId) {
                unpushRoom(+roomId, true);
            }
        };

        socket.on('unsetAdmin', unpushModerator);
        socket.on('unmuteUser', unpushMuted);
        socket.on('muteUser', pushMuted);
        socket.on('banMember', handleBan);
        socket.on('setAdmin', pushModerator);
        socket.on('kickMember', handlekick);
        socket.on('joinRoom', userJoinedListener);
        socket.on('message', messageListener);
        socket.on('leaveRoom', userLeftListener);

        return () => {
            socket.on('unsetAdmin', unpushModerator);
            socket.off('unmuteUser', unpushMuted);
            socket.off('muteUser', pushMuted);
            socket.off('banMember', handleBan);
            socket.off('setAdmin', pushModerator);
            socket.off('kickMember', handlekick);
            socket.off('joinRoom', userJoinedListener);
            socket.off('message', messageListener);
            socket.off('leaveRoom', userLeftListener);
        };
    }, [socket]);
    return (
        <div className=" flex-grow h-full w-full justify-start items-start inline-flex border border-stone-300 ">
            <div className="bg-white w-[17%] h-full py-2 border-r flex  flex-col justify-start items-center gap-2 ">
                {/* <div> */}
                <div className="flex gap-2  border-b border-slate-300  h-[6%] w-full items-center justify-center">
                    <div
                        className="flex items-center rounded-md justify-center gap-2 p-1.5 hover:p-2 cursor-pointer font-['Acme'] bg-black text-white"
                        onClick={() => {
                            openEvent(), setState(true);
                        }}
                    >
                        <FaPlus
                            size={15}
                            className="cursor-pointer text-white"
                        />
                        Create Room
                    </div>
                    <div
                        className="flex items-center rounded-md justify-center gap-2 p-1.5 hover:p-2 cursor-pointer font-['Acme'] bg-black text-white"
                        onClick={() => {
                            openEvent(), setState(false);
                        }}
                    >
                        <FaSearch
                            size={15}
                            className="cursor-pointer text-white"
                        />
                        Find Rooms
                    </div>
                </div>
                {/* {onlineUser.length ? (
                    <div className="w-full  border-y gap-5 flex items-center justify-start px-4 py-2 overflow-x-auto whitespace-nowrap">
                        {onlineUser.map((user, index) => (
                            <div key={index} className="relative inline-block">
                                <Avatar
                                    key={`onlineUser${index}`}
                                    imageUrl={user.avatar}
                                    style="w-9 h-9 bg-black rounded-[150px]  mr-2 flex-shrink-0"
                                    userStatus={'online'}
                                    avatarUserId={''}
                                />
                                <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute bottom-0.5 right-0.5"></span>
                            </div>
                        ))}
                    </div>
                ) : null} */}
                <div className="flex-grow w-full overflow-auto flex-col justify-start items-center inline-flex ">
                    {Layout_Rooms.map((room, index) => (
                        <NavLink
                            key={`rooms${index}`}
                            to={`${room.isRoom ? 'group' : 'dms'}/${room.id}`}
                            className={({ isActive }) =>
                                `w-full p-2.5 border-b border-neutral-200 justify-start items-center gap-2.5 flex cursor-pointer ${
                                    isActive ? 'bg-neutral-200' : 'bg-white'
                                }`
                            }
                        >
                            <Avatar
                                imageUrl={room.avatar}
                                style="w-14	h-14 bg-black rounded-[150px] border border-white"
                            />
                            <div className="p-2.5 flex-col justify-start items-start gap-[5px] inline-flex">
                                <div className="text-black text-[17px] font-semibold font-['Maven Pro'] leading-snug tracking-tight">
                                    {room.roomTitle}
                                </div>
                                {room.lastMessage && (
                                    <div className="text-zinc-500 text-sm font-normal font-['Maven Pro'] leading-[18.20px] tracking-tight">
                                        {`You: ${
                                            room.lastMessage.length > 5
                                                ? room.lastMessage.substring(
                                                      0,
                                                      5
                                                  ) + '...'
                                                : room.lastMessage
                                        } · ${DateFormatter(
                                            room.lastMessageTime
                                        )}`}
                                    </div>
                                )}
                            </div>
                        </NavLink>
                    ))}
                </div>
                <Modal
                    removable={true}
                    isEventOpen={isEventOpen}
                    closeEvent={closeEvent}
                >
                    {state ? (
                        <GroupsForm closeEvent={closeEvent} />
                    ) : (
                        <RoomsFinder closeEvent={closeEvent} />
                    )}
                </Modal>
            </div>
            <Outlet />
        </div>
    );
}

export default ChatLayouts;
