import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useModelStore } from '../stores/ModelStore';
import { RoomsList } from '../../../shared/types';
import { axiosPrivate } from '../api';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Avatar, FormComponent } from '.';
import { useChatStore } from '../stores/chatStore';

const RoomsFinder: React.FC = () => {
    const fields = ['PUBLIC', 'PROTECTED'];
    const [filter, setFilter] = useState('PUBLIC');
    const [roomsList, SetRoomsList] = useState<RoomsList[]>([]);
    const { closeEvent } = useModelStore();
    const { socket, pushRoom } = useChatStore();
    const HandleJoin = (room: RoomsList) => {
        socket?.emit('joinRoom', { ...room });
        pushRoom(room);
        closeEvent();
    };

    useEffect(() => {
        const fetchRoomsList = async () => {
            try {
                const res = await axiosPrivate.get('/chat/AllRooms/');
                SetRoomsList(res.data);
            } catch (error) {
                if (isAxiosError(error))
                    toast.error(error.response?.data?.message);
            }
        };

        fetchRoomsList();
    }, []);

    const filteredRooms = roomsList.filter((room) => room.privacy === filter);
    return (
        <div className="overflow-y-auto h-[560px] w-[500px] bg-white p-1 items-start justify-start mb-2 rounded-[20px] shadow  border border-stone-300">
            <div className=" px-2.5 bg-white justify-start items-center gap-5 inline-flex sticky top-0 z-10 w-full">
                <div className="grow shrink basis-0 self-stretch px-2.5 justify-between items-center flex ">
                    <div className="self-stretch px-2.5justify-start items-center gap-4 flex">
                        {fields.map((field, index) => (
                            <div
                                key={index}
                                className={`self-stretch px-3 py-4 justify-start items-center gap-2.5 flex  text-xl font-normal font-['Acme'] cursor-pointer ${
                                    field == filter
                                        ? 'text-black border-b-2 border-black'
                                        : 'text-zinc-500'
                                } `}
                                onClick={() => {
                                    setFilter(field);
                                }}
                            >
                                <div>{field.toLowerCase()}</div>
                            </div>
                        ))}
                    </div>
                    <div
                        className=" cursor-pointer"
                        onClick={() => {
                            closeEvent();
                        }}
                    >
                        <MdClose size={30} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full bg-slate-100 ">
                {filteredRooms.map((room, index) => (
                    <div
                        key={`rooms${index}`}
                        className="w-full p-2.5 border-b border-neutral-200 justify-between items-center gap-2.5 flex cursor-pointer bg-white "
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Avatar
                                imageUrl={room.avatar}
                                style="w-14	h-14 bg-black rounded-[150px] border border-white"
                            />
                            <div className="text-black text-[17px] font-semibold font-['Maven Pro'] leading-snug tracking-tight">
                                {room.roomTitle}
                            </div>
                        </div>
                        {filter !== 'PROTECTED' ? (
                            <div
                                className="flex items-center rounded-md justify-center gap-2 p-1.5 hover:p-2 cursor-pointer font-['Acme'] bg-black text-white"
                                onClick={() => {
                                    HandleJoin(room);
                                }}
                            >
                                join Rooms
                            </div>
                        ) : (
                            <div className="w-[30%] flex items-center justify-center gap-2">
                                <FormComponent
                                    fields={[
                                        {
                                            label: '',
                                            type: 'password',
                                            name: 'password',
                                            placeholder: 'password',
                                            validation: {
                                                required:
                                                    'password is required!',
                                                maxLength: {
                                                    value: 10,
                                                    message:
                                                        'password name must be less than 10 characters'
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        'password name must be at least 3 characters'
                                                }
                                            }
                                        }
                                    ]}
                                    onSubmit={() => {}} // ! join room
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomsFinder;
