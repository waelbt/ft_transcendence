import { Avatar } from '.';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useFriendDetails from '../hooks/FriendDetailsHook';

type FriendsTableProps = {
    friendId: string;
};

function FriendCard({ friendId }: FriendsTableProps) {
    const { isLoading, isError, error, friend } = useFriendDetails({
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
                <Popover className="relative debug">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={`group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
                                    open ? 'text-white' : 'text-white/90'
                                }`}
                            >
                                <BsThreeDotsVertical
                                    className="text-gray-500"
                                    size={22}
                                />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel
                                    className={`absolute  top-0  z-10  w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl`}
                                >
                                    <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                        <ul
                                            className="py-2 text-sm text-zinc-600 "
                                            aria-labelledby="dropdownMenuIconButton"
                                        >
                                            {friend?.actions.map(
                                                (action, index) => (
                                                    <li
                                                        className="block px-4 py-2 hover:bg-gray-100 "
                                                        key={index}
                                                        // onClick={() => ()  request.get(`/${action}/id`)}
                                                    >
                                                        {action}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        </>
    );
}

export default FriendCard;

{
    /* <div className=" animate-pulse h-2.5 bg-gray-300 rounded-full w-12"></div> */
}

// import { Popover, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import { Avatar } from '.';
// import { useQuery } from '@tanstack/react-query';
// import { Friend } from '../../../shared/types'; // Make sure the path is correct

// type FriendsTableProps = {
//     friendId: string;
// };

// function FriendCard({ friendId }: FriendsTableProps) {
//     const fetchFriend = async () => {
//         const response = await fetch(
//             `http://localhost:3000/friendDetails/${friendId}`
//         );
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     };

//     const {
//         data: Friend,
//         isLoading,
//         isError,
//         error
//     } = useQuery<Friend, Error>(
//         ['friend', friendId], // Query key
//         fetchFriend // Fetch function
//     );

//     if (isLoading) return <div>Skeleton here...</div>;
//     if (isError) return <div>Error: {error?.message}</div>;

//     return (
//         <>
//             {/* {friend && ( */}
//             <div className="flex py-4 border-b border-gray-200 justify-between items-center w-full">
//                 <div className="flex flex-grow items-center gap-2.5 px-8">
//                     <Avatar imageUrl={data.avatar} style="w-16 h-16" />
//                     <div className="flex flex-col justify-center items-start gap-[5px]">
//                         <div className="text-black text-xl font-normal font-['Acme']">
//                             {data.name}
//                         </div>
//                         <div className="text-zinc-500 text-sm font-normal font-['Acme']">
//                             {data.status}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Popover element */}

//             </div>
//             {/* )} */}
//         </>
//     );
// }

// export default FriendCard;
