import { NavLink } from 'react-router-dom';
import { AchievementIcon, JoinIcon } from '../assets/custom-icons';
import ProgressBar from './ProgressBar';
import { Avatar } from '.';
import { FC, Fragment, useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { BiSolidDownArrow } from 'react-icons/bi';
import { Popover, Transition } from '@headlessui/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type UserProfileCardProps = {
    id: string;
    avatar: string;
    nickName: string;
    fullName: string;
    createdAt: string;
    status: true;
    exp: 0;
    level: 0;
    actions?: string[];
    isLoading?: boolean;
};

const UserProfileCard: FC<UserProfileCardProps> = (props) => {
    const { id } = useUserStore();
    // setting
    const navLinks = ['history', 'achivements', 'friends'];
    if (props.id === id) {
        navLinks.push('setting');
    }

    useEffect(() => {
        console.log(props.actions);
    }, [props]);

    if (props.isLoading) {
        return (
            <div className="px-2.5 rounded-[20px] shadow justify-start items-center gap-5 inline-flex bg-white">
                {/* Replace actual content with Skeleton components */}
                <div className="px-5 py-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
                    <Skeleton circle height={160} width={160} />
                    <Skeleton height={30} width={200} />
                </div>
                <div className="flex-col justify-center items-start inline-flex pt-4">
                    <Skeleton height={30} width={300} />
                    <Skeleton height={130} width={553} />
                </div>
                <div className="px-3 py-3 rounded-2xl flex-col justify-center items-center gap-3 inline-flex">
                    <Skeleton height={50} width={200} />
                    <Skeleton height={20} width={150} />
                </div>
            </div>
        );
    }
    return (
        <>
            <div className=" px-2.5 rounded-[20px] shadow justify-start items-center gap-5 inline-flex bg-white mt-4">
                <div className="px-5 py-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
                    <Avatar
                        imageUrl={props.avatar}
                        state="online"
                        style="w-40 h-40"
                    />
                    <div className="text-black text-[22px] font-normal font-['Acme']">
                        {props.nickName}
                    </div>
                </div>
                <div className="flex-col justify-center items-start inline-flex pt-4">
                    <div className="self-stretch px-10 justify-start items-start gap-2.5 inline-flex">
                        <div className="text-neutral-400 text-[22px] font-normal font-['Acme']">
                            {props.fullName}
                        </div>
                    </div>
                    <div className="w-[553px] h-[130px] px-10 py-[35px] border-l-4 border-r-4 border-gray-200 flex-col justify-center items-start gap-2.5 flex">
                        <div className="self-stretch justify-between items-start  inline-flex text-black text-xl font-normal font-['Acme']">
                            <span>level {props.level}</span>
                            <span>{props.exp}/3000</span>
                        </div>
                        <ProgressBar />
                    </div>
                    <div className="self-stretch px-10 justify-start items-start gap-2.5 inline-flex">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                // ! :id
                                to={`${link}`}
                                className={({ isActive }) =>
                                    `px-2.5 py-[21px] justify-center items-center gap-2.5 flex text-xl font-normal font-['Acme'] ${
                                        isActive
                                            ? 'text-black border-b-4 border-black '
                                            : ' text-neutral-500'
                                    }`
                                }
                            >
                                {link}
                            </NavLink>
                        ))}

                        {props.id != id && (
                            <Popover className="">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={`group px-2.5 py-[21px] justify-center items-center gap-2.5 inline-flex hover:bg-neutral-100 rounded ${
                                                open
                                                    ? 'text-white'
                                                    : 'text-white/90'
                                            }`}
                                        >
                                            <div className="text-neutral-500 text-xl font-normal font-['Acme']">
                                                More
                                            </div>
                                            <BiSolidDownArrow
                                                className="text-neutral-500"
                                                size={12}
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
                                                className={`absolute left-[85%]  z-10  w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl`}
                                            >
                                                <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                                    <ul
                                                        className="py-2 text-sm text-zinc-600 "
                                                        aria-labelledby="dropdownMenuIconButton"
                                                    >
                                                        {/* {props.actions.map(
                                                            (action, index) => (
                                                                <li
                                                                    className="block px-4 py-2 hover:bg-gray-100 "
                                                                    key={index}
                                                                    // onClick={() => ()  axiosPrivate.get(`/${action}/id`)}
                                                                >
                                                                    {action}
                                                                </li>
                                                            )
                                                        )} */}
                                                    </ul>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        )}
                    </div>
                </div>
                <div className="px-3 py-3 rounded-2xl flex-col justify-center items-center gap-3 inline-flex">
                    <div className="px-1 py-1 justify-center items-center gap-2.5 inline-flex">
                        <AchievementIcon />
                        <div className="text-amber-500 text-3xl font-normal font-['Acme']">
                            0/13 achievement{' '}
                        </div>
                    </div>
                    <div className="px-1 justify-center items-center gap-1.5 inline-flex">
                        <JoinIcon />
                        <div className="text-neutral-400 text-sm font-normal font-['Acme']">
                            {/* Jan 19, 2019 */}
                            {props.createdAt}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileCard;
