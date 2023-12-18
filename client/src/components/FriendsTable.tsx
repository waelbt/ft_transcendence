import { useEffect } from 'react';
import { Friend } from '../../../shared/types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { TbMessageCircle2Filled } from 'react-icons/tb';
type FriendsTableProps = {
    friends: Friend[];
};

function FriendsTable({ friends }: FriendsTableProps) {
    useEffect(() => {
        console.log(typeof friends);
    }, [friends]);

    return (
        <div className="flex-col justify-start items-start inline-flex">
            {friends.map((friend: Friend) => (
                <div
                    className=" py-4 border-b border-gray-200 justify-center items-center gap-[1104.88px] inline-flex "
                    key={friend.id}
                >
                    <div className="self-stretch justify-center items-center gap-2.5 inline-flex px-8">
                        <div className=" avatar">
                            <div className="w-12 rounded-full">
                                <img src={friend.avatar} />
                            </div>
                        </div>
                        <div className="self-stretch p-2.5 flex-col justify-center items-start gap-[5px] inline-flex">
                            <div className="text-black text-sm font-normal font-['Acme']">
                                {friend.name}
                            </div>
                            <div className="text-zinc-500 text-xs font-normal font-['Acme']">
                                {friend.status}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch p-2.5 justify-center items-center gap-2.5 inline-flex">
                        <div className="p-2 bg-neutral-100 rounded-3xl flex-col justify-center items-center">
                            <TbMessageCircle2Filled className="text-gray-500" />
                        </div>
                        <div className="p-2 bg-neutral-100 rounded-3xl flex-col justify-center items-center">
                            <BsThreeDotsVertical className="text-gray-500" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FriendsTable;
