import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ProfileOutletContextType } from '../types/global';
import { MdCancel } from 'react-icons/md';
import FriendDataPreviou from './FriendDataPreviou';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useUserStore } from '../stores/userStore';

const FriendsDashboard: React.FC = () => {
    const { isCurrentUser, friendsIds, blocksIds } =
        useOutletContext<ProfileOutletContextType>();
    const [fields, setFields] = useState<string[]>(['all']);
    const [friendsIdList, setFriendsIdList] = useState<string[]>([]);
    const [filter, setFilter] = useState('all');
    const axiosPrivate = useAxiosPrivate();
    const { removeUserBlockId } = useUserStore();
    useEffect(() => {
        if (isCurrentUser) {
            setFields((prevFields) => [...prevFields, 'blocked']);
        }
    }, []);

    useEffect(() => {
        setFriendsIdList(filter === 'all' ? friendsIds || [] : blocksIds || []);
    }, [filter, blocksIds, friendsIds]);

    const handleUnblock = async (userId: string) => {
        console.log('clicked');
        try {
            await axiosPrivate.post(`/users/unblockUser/${userId}`);
            removeUserBlockId(userId);
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
            else console.error(error);
        }
    };

    return (
        <div className="overflow-y-auto max-h-[560px] w-full ">
            <div className=" px-2.5 bg-white justify-start items-center gap-5 inline-flex sticky top-0 z-10 w-full">
                <div className="grow shrink basis-0 self-stretch px-2.5 justify-between items-center flex">
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
                                <div>{field}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                {friendsIdList.map((friendId: string, index) => (
                    <div
                        key={index}
                        className="flex py-4 border-b border-gray-200 justify-between items-center w-full "
                    >
                        <FriendDataPreviou
                            key={`friend${friendId}`}
                            friendId={friendId}
                        />
                        {filter === 'blocked' && (
                            <MdCancel
                                className="text-black cursor-pointer mr-4"
                                size={32}
                                onClick={() => handleUnblock(friendId)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsDashboard;
