import { Avatar } from '.';
import { Link } from 'react-router-dom';
import useFriendPrevious from '../hooks/friendPreviousHook';

type FriendDataPreviouProps = {
    friendId: string;
};

function FriendDataPreviou({ friendId }: FriendDataPreviouProps) {
    const { isLoading, isError, error, friend } = useFriendPrevious(friendId);

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
        </>
    );
}

export default FriendDataPreviou;
