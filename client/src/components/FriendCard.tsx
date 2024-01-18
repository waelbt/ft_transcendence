import { Avatar } from '.';
// import { Popover, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useFriendDetails from '../hooks/FriendDetailsHook';

type FriendsTableProps = {
    friendId: string;
};

function FriendCard({ friendId }: FriendsTableProps) {
    const { isLoading, isError, error, friend } = useFriendDetails({
        friendId
    });

    const UnblockUser = (friendId: string) => {
        console.log('clicked by ', friendId);
        // todo: call the endpoint unblock
        // todo: unpush id from blacked list 
        // todo: and push it to friend list
        // todo: check if every work fine
    };

    if (isLoading)
        return (
            <div className="flex py-4 border-b border-gray-200 justify-between items-center w-full">
                <div className="flex flex-grow items-center gap-2.5 px-8">
                    <div className="skeleton-avatar w-16 h-16"></div>
                    <div className="flex flex-col justify-center items-start gap-[5px]">
                        <div className="skeleton-text w-20 h-3"></div>
                        <div className="skeleton-text w-10 h-2"></div>
                    </div>
                </div>
                <div className=" skeleton-text h-5 bg-gray-300 rounded-full w-2"></div>
            </div>
        );
    if (isError) return <div>Error: {error?.message}</div>;

    return (
        <>
            <div className="flex py-4 border-b border-gray-200 justify-between items-center w-full ">
                <Link
                    className="flex flex-grow items-center gap-2.5 px-8 cursor-pointer"
                    to={`/profile/${friendId}`}
                >
                    <Avatar
                        imageUrl={friend ? friend.avatar : ''}
                        style="w-16 h-16"
                    />
                    <div className="flex flex-col justify-center items-start gap-[5px]">
                        <div className="text-black text-xl font-normal font-['Acme']">
                            {friend?.name}
                        </div>
                        <div className="text-zinc-500 text-sm font-normal font-['Acme']">
                            {friend?.status}
                        </div>
                    </div>
                </Link>
                <MdCancel
                    className="text-neutral-200 cursor-pointer mr-4"
                    size={32}
                    onClick={() => UnblockUser(friendId)}
                />
            </div>
        </>
    );
}

export default FriendCard;
