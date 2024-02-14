import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Avatar } from '.';
import { Room } from '../../../shared/types';
import { NavLink } from 'react-router-dom';
import { DateFormatter } from '../tools/date_parsing';
import useAxiosPrivate from '../hooks/axiosPrivateHook';

function ChatLayouts() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [rooms, SetRooms] = useState<Room[]>([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchDns = async () => {
            const res = await fetch('http://localhost:3000/dms');
            const data = await res.json();
            SetRooms(data);
        };

        fetchDns();
    }, []);

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            const res = axiosPrivate.get('');
            console.log(res);
        };

        fetchOnlineUsers();
    }, []);

    const filteredRooms = rooms.filter((room) =>
        room.roomTitle.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-col flex-grow h-full w-full justify-center items-start inline-flex ">
            <div className="bg-white w-[17%] h-full py-2 border-r flex  flex-col justify-start items-center gap-2 ">
                {/* <div> */}
                <div className="px-[15px] py-2 mx-2 bg-gray-50 rounded-[30px] border border-neutral-200 justify-center items-center gap-2.5    inline-flex ">
                    <CiSearch size={24} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="bg-transparent text-neutral-500 text-sm font-normal font-['Poppins'] outline-none w-full"
                    />
                </div>
                <div className="w-full border-y flex flex-col items-start justify-center px-4 py-5">
                    <div>online users here...</div>
                </div>
                <div className="flex-grow w-full overflow-auto flex-col justify-start items-center inline-flex">
                    {filteredRooms.map((room, index) => (
                        <NavLink
                            key={index}
                            to={`dm/${room.roomId}`} // ! conditoon of the type
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
            </div>
        </div>
    );
}

export default ChatLayouts;
