import React, { useState, useEffect } from 'react';
import FriendCard from './FriendDataPreviou';
import { useOutletContext } from 'react-router-dom';
import { ProfileOutletContextType } from '../types/global';
import { MdCancel } from 'react-icons/md';

const FriendsDashboard: React.FC = () => {
    const { isCurrentUser, friendsIds, blocksIds } =
        useOutletContext<ProfileOutletContextType>();
    const fields = ['all', 'blocked']; // !context
    const [friendsIdList, setFriendsIdList] = useState<string[]>([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        filter == 'all'
            ? setFriendsIdList(friendsIds ? friendsIds : [])
            : setFriendsIdList(blocksIds ? blocksIds : []);
    }, [filter]);

    return (
        <div className="overflow-y-auto max-h-[560px] w-full ">
            <div className=" px-2.5 bg-white justify-start items-center gap-5 inline-flex sticky top-0 z-10 w-full">
                <div className="grow shrink basis-0 self-stretch px-2.5 justify-between items-center flex">
                    <div className="self-stretch px-2.5justify-start items-center gap-4 flex">
                        {fields.map((field) => (
                            <div
                                key={field}
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
                {friendsIdList.map((friendId: string) => (
                    <div className="flex py-4 border-b border-gray-200 justify-between items-center w-full ">
                        <FriendCard
                            key={`friend${friendId}`}
                            friendId={friendId}
                        />
                        {/* removeUserBlockId(props.id); */}
                        <MdCancel
                            className="text-neutral-200 cursor-pointer mr-4"
                            size={32}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsDashboard;
// removeUserBlockId(props.id);
