import FriendCard from './FriendCard';

type FriendsTableProps = {
    friendsIdList: string[];
};

// ! not used
function FriendsTable({ friendsIdList }: FriendsTableProps) {
    return (
        <div className="flex flex-col w-full">
            {friendsIdList.map((friendId: string) => (
                <FriendCard friendId={friendId} />
            ))}
        </div>
    );
}

export default FriendsTable;

{
    /* <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img
                                    src={friend.avatar}
                                    alt={`${friend.name}'s avatar`}
                                />
                            </div>
                        </div> */
}
