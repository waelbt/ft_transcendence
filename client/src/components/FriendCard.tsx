import { Avatar } from '.';
import { Link } from 'react-router-dom';
// import Popup from 'reactjs-popup';
// import { MdCancel } from 'react-icons/md';
// import { BsThreeDotsVertical } from 'react-icons/bs';
import useFriendPrevious from '../hooks/friendPreviousHook';
import useAxiosPrivate from '../hooks/axiosPrivateHook';

type FriendsTableProps = {
    friendId: string;
    isCurrentUser: boolean;
    paramId: string;
};

function FriendCard({ friendId, isCurrentUser, paramId }: FriendsTableProps) {
    const axiosPrivate = useAxiosPrivate();

    const fetchFriendDetails = async (): Promise<Friend> => {
        const response = await axiosPrivate.get();
        return response.json();
    };

    const query = useQuery<Friend, Error>({
        queryKey: ['friend', friendId],
        queryFn: fetchFriendDetails
    });

    const { isLoading, isError, error, friend } = useFriendPrevious({
        friendId
    });

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
                {/* <Popup
                    trigger={
                        <div
                            className={`group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 text-white`}
                        >
                            <BsThreeDotsVertical
                                className="text-gray-500"
                                size={22}
                            />
                        </div>
                    }
                    position="bottom right"
                    nested
                >
                    <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul
                            className="py-2 text-sm text-zinc-600 "
                            aria-labelledby="dropdownMenuIconButton"
                        >
                            {friend?.actions.map((action, index) => (
                                <li
                                    className="block px-4 py-2 hover:bg-gray-100 "
                                    key={index}
                                    // onClick={() => ()  request.get(`/${action}/id`)}
                                >
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Popup> */}
                {/* <MdCancel
                    className="text-neutral-200 cursor-pointer mr-4"
                    size={32}
                    onClick={() => UnblockUser(friendId)}
                /> */}
            </div>
        </>
    );
}

export default FriendCard;

// import { Avatar } from '.';
// // import { Popover, Transition } from '@headlessui/react';
// // import { Fragment } from 'react';
// // import { BsThreeDotsVertical } from 'react-icons/bs';
// import { MdCancel } from 'react-icons/md';
// import { Link } from 'react-router-dom';
// import useFriendPrevious from '../hooks/FriendDetailsHook';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import Popup from 'reactjs-popup';

// type FriendsTableProps = {
//     friendId: string;
//     isCurrentUser: boolean;
//     // friendId: string[];
// };

// function FriendCard({ friendId }: FriendsTableProps) {
//     const { isLoading, isError, error, friend } = useFriendPrevious({
//         friendId
//     });

//     // const UnblockUser = (friendId: string) => {
//     //     console.log('clicked by ', friendId);
//     //     // todo: call the endpoint unblock
//     //     // todo: unpush id from blacked list
//     //     // todo: and push it to friend list
//     //     // todo: check if every work fine
//     // };

//     if (isLoading)
//         return (
//             <div className="flex py-4 border-b border-gray-200 justify-between items-center w-full">
//                 <div className="flex flex-grow items-center gap-2.5 px-8">
//                     <div className="skeleton-avatar w-16 h-16"></div>
//                     <div className="flex flex-col justify-center items-start gap-[5px]">
//                         <div className="skeleton-text w-20 h-3"></div>
//                         <div className="skeleton-text w-10 h-2"></div>
//                     </div>
//                 </div>
//                 <div className=" skeleton-text h-5 bg-gray-300 rounded-full w-2"></div>
//             </div>
//         );
//     if (isError) return <div>Error: {error?.message}</div>;

//     return (
//         <>
//             <div className="flex py-4 border-b border-gray-200 justify-between items-center w-full ">
//                 <Link
//                     className="flex flex-grow items-center gap-2.5 px-8 cursor-pointer"
//                     to={`/profile/${friendId}`}
//                 >
//                     <Avatar
//                         imageUrl={friend ? friend.avatar : ''}
//                         style="w-16 h-16"
//                     />
//                     <div className="flex flex-col justify-center items-start gap-[5px]">
//                         <div className="text-black text-xl font-normal font-['Acme']">
//                             {friend?.name}
//                         </div>
//                         <div className="text-zinc-500 text-sm font-normal font-['Acme']">
//                             {friend?.status}
//                         </div>
//                     </div>
//                 </Link>
//                 <Popup
//                     trigger={
//                         <div
//                             className={`group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 text-white`}
//                         >
//                             <BsThreeDotsVertical
//                                 className="text-gray-500"
//                                 size={22}
//                             />
//                         </div>
//                     }
//                     position="bottom right"
//                     nested
//                 >
//                     <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
//                         <ul
//                             className="py-2 text-sm text-zinc-600 "
//                             aria-labelledby="dropdownMenuIconButton"
//                         >
//                             {friend?.actions.map((action, index) => (
//                                 <li
//                                     className="block px-4 py-2 hover:bg-gray-100 "
//                                     key={index}
//                                     // onClick={() => ()  request.get(`/${action}/id`)}
//                                 >
//                                     {action}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </Popup>
//                 {/* <MdCancel
//                     className="text-neutral-200 cursor-pointer mr-4"
//                     size={32}
//                     onClick={() => UnblockUser(friendId)}
//                 /> */}
//             </div>
//         </>
//     );
// }

// export default FriendCard;
