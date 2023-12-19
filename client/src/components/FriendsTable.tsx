import { useEffect } from 'react';
import { Friend } from '../../../shared/types';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import DropDownMenu from './DropDownMenu';

type FriendsTableProps = {
    friends: Friend[];
};


// ! fix later 
function FriendsTable({ friends }: FriendsTableProps) {
    useEffect(() => {
        console.log(window.innerWidth);
    }, [window.innerWidth]);

    return (
        <div className="flex flex-col w-full">
            {friends.map((friend: Friend) => (
                <div
                    className="flex py-4 border-b border-gray-200 justify-between items-center w-full"
                    key={friend.id}
                >
                    {/* Element to take all available space */}
                    <div className="flex flex-grow items-center gap-2.5 px-8">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img
                                    src={friend.avatar}
                                    alt={`${friend.name}'s avatar`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-[5px]">
                            <div className="text-black text-sm font-normal font-['Acme']">
                                {friend.name}
                            </div>
                            <div className="text-zinc-500 text-xs font-normal font-['Acme']">
                                {friend.status}
                            </div>
                        </div>
                    </div>

                    {/* Popover element */}
                    <Popover className="">
                        {({ open }) => (
                            <>
                                <Popover.Button
                                    className={`group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
                                        open ? 'text-white' : 'text-white/90'
                                    }`}
                                >
                                    <BsThreeDotsVertical className="text-gray-500" />
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
                                        className={`absolute left-[85%]  z-10  w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl`}
                                    >
                                        <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                            <ul
                                                className="py-2 text-sm text-zinc-600 "
                                                aria-labelledby="dropdownMenuIconButton"
                                            >
                                                {friend.actions.map(
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
            ))}
        </div>
    );
}

export default FriendsTable;
