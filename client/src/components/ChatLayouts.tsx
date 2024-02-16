import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Avatar, Modal } from '.';
import { OnlineUser, RoomsList } from '../../../shared/types';
import { NavLink, Outlet } from 'react-router-dom';
import { DateFormatter } from '../tools/date_parsing';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { MdGroupAdd } from 'react-icons/md';
import { useModelStore } from '../stores/ModelStore';
import CreateGroup from './CreateGroup';
import { useChatStore } from '../stores/chatStore';

function ChatLayouts() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { Layout_Rooms, updateState } = useChatStore();
    // const [rooms, SetRooms] = useState<RoomsList[]>([]);
    const [onlineUser, setOnlineUser] = useState<OnlineUser[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const { isEventOpen, openEvent } = useModelStore();

    useEffect(() => {
        // !
        const fetchDns = async () => {
            try {
                const res = await axiosPrivate.get('/chat/allChannels');
                console.log('channels ', res);
                updateState({ Layout_Rooms: res.data });
            } catch (error) {
                if (isAxiosError(error))
                    toast.error(error.response?.data?.message);
            }
        };

        fetchDns();
    }, []);

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const res = await axiosPrivate.get('/users/onlineUsers');
                setOnlineUser(res.data);
            } catch (error) {
                if (isAxiosError(error))
                    toast.error(error.response?.data?.message);
            }
        };

        fetchOnlineUsers();
    }, []);

    const filteredRooms = Layout_Rooms.filter((room) =>
        room.roomTitle.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div className=" flex-grow h-full w-full justify-start items-start inline-flex border border-stone-300 ">
            <div className="bg-white w-[17%] h-full py-2 border-r flex  flex-col justify-start items-center gap-2 ">
                {/* <div> */}
                <div className="flex gap-2 items-center justify-center">
                    <div className="px-[15px] py-2 mx-2 bg-gray-50 rounded-[30px] border border-neutral-200 justify-center items-center gap-2.5  border-y     inline-flex">
                        <CiSearch size={24} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="bg-transparent text-neutral-500 text-sm font-normal font-['Poppins'] outline-none w-full"
                        />
                    </div>
                    <MdGroupAdd
                        size={24}
                        className="cursor-pointer text-gray-600"
                        onClick={() => openEvent()}
                    />
                </div>
                {onlineUser.length ? (
                    <div className="w-full  border-y gap-5 flex items-center justify-start px-4 py-2 overflow-x-auto whitespace-nowrap">
                        {onlineUser.map((user, index) => (
                            <div key={index} className="relative inline-block">
                                <Avatar
                                    key={`onlineUser${index}`}
                                    imageUrl={user.avatar}
                                    style="w-9 h-9 bg-black rounded-[150px]  mr-2 flex-shrink-0"
                                />
                                <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute bottom-0.5 right-0.5"></span>
                            </div>
                        ))}
                    </div>
                ) : null}
                <div className="flex-grow w-full overflow-auto flex-col justify-start items-center inline-flex ">
                    {filteredRooms.map((room, index) => (
                        <NavLink
                            key={`rooms${index}`}
                            to={`${room.isRoom ? 'group' : 'dms'}/${
                                room.roomId
                            }`}
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
                                <div className="text-zinc-500 text-sm font-normal font-['Maven Pro'] leading-[18.20px] tracking-tight">
                                    {`You: ${
                                        room.lastMessage.length > 5
                                            ? room.lastMessage.substring(0, 5) +
                                              '...'
                                            : room.lastMessage
                                    } · ${DateFormatter(room.lastMessageTime)}`}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
                {isEventOpen && (
                    <Modal removable={true}>
                        <CreateGroup />
                    </Modal>
                )}
            </div>
            <Outlet />
        </div>
    );
}

export default ChatLayouts;
