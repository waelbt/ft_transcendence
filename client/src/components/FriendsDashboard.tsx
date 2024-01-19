import React, { useState, useEffect } from 'react';
import FriendCard from './FriendCard';
import { useOutletContext } from 'react-router-dom';
import { ProfileOutletContextType } from '../types/global';

const FriendsDashboard: React.FC = () => {
    const { isCurrentUser, friends, block, paramId } =
        useOutletContext<ProfileOutletContextType>();
    const fields = ['all', 'blocked']; // !context
    const [friendsIdList, setFriendsIdList] = useState<string[]>([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        filter == 'all'
            ? setFriendsIdList(friends ? friends : [])
            : setFriendsIdList(block ? block : []);
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
                    <FriendCard
                        key={`friend${friendId}`}
                        friendId={friendId}
                        isCurrentUser={isCurrentUser as boolean}
                        paramId={paramId as string}
                    />
                ))}
            </div>
        </div>
    );
};

export default FriendsDashboard;
