import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { NAV_LINKS } from '../constants';
import { HiLogout } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { Avatar } from '.';

function Layout() {
    const navigate = useNavigate();

    const solutions = [
        {
            name: 'Setting & privacy',
            icon: IoMdSettings,
            action: () => navigate('/profile/setting')
        },
        {
            name: 'logout',
            icon: HiLogout,
            action: () => navigate('/')
        }
        // {
        //     name: 'achivements',
        //     icon: IoMdSettings,
        //     action: () => navigate('/profile/setting')
        // },
        // {
        //     name: 'friendsy',
        //     icon: IoMdSettings,
        //     action: () => navigate('/profile/setting')
        // },
    ];
    return (
        <>
            {/* {false ? (
                <ProfileCompletion />
            ) : ( */}
            <div className="relative flex flex-col h-screen bg-primary-white">
                <nav className="bg-white border-b border-neutral-100">
                    <div className="w-full px-4">
                        <div className="flex justify-between items-center">
                            {/* <!-- Logo Section --> */}
                            <div
                                className="flex-shrink-0 text-black text-xl font-bold font-['Lemonada'] cursor-pointer"
                                onClick={() => navigate('/home')}
                            >
                                LaughTale
                            </div>

                            {/* <!-- Menu Section --> */}
                            <div className="justify-center items-center gap-2.5 inline-flex">
                                {NAV_LINKS.map((link) => (
                                    <NavLink
                                        key={link}
                                        to={`/${link}`}
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
                            </div>
                            {/* <!-- avatar && notifaction uSection --> */}
                            <div className=" px-2.5 justify-start items-center gap-[30px] inline-flex">
                                {/* <!-- notifaction Section --> */}
                                <div className="relative p-2.5 bg-neutral-100 rounded-[50px] justify-start items-center gap-2.5 inline-flex">
                                    <IoIosNotifications
                                        className="text-gray-500"
                                        size={28}
                                    />
                                    {/*  //!  Red dot for new notifications <span className="absolute top-0 right-0 block h-3 w-3 bg-red-600 rounded-full"></span> */}
                                </div>
                                {/* <!-- avatar Section --> */}
                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button
                                                className={`group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75  ${
                                                    open
                                                        ? 'text-white'
                                                        : 'text-white/90'
                                                }`}
                                            >
                                                <Avatar
                                                    imageUrl="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                                                    style="w-12 h-12 ring ring-amber-500 ring-offset-base-100 ring-offset-2"
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
                                                <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-sm -translate-x-52 transform px-4 sm:px-0 lg:max-w-3xl">
                                                    <div className="p-2.5 bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex">
                                                        <li
                                                            className="self-stretch p-2.5  border-b border-neutral-300 justify-start items-center gap-4 inline-flex hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                navigate(
                                                                    '/profile/history'
                                                                );
                                                            }}
                                                        >
                                                            <Avatar
                                                                style="h-8 w-8"
                                                                imageUrl={
                                                                    'https://tecdn.b-cdn.net/img/new/avatars/2.webp'
                                                                }
                                                                state="online"
                                                            />
                                                            <div className="text-black text-xl font-normal font-['Acme']">
                                                                dos404
                                                            </div>
                                                        </li>
                                                        {solutions.map(
                                                            (
                                                                solution,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={index}
                                                                    className="self-stretch p-2.5 justify-start items-center gap-4 inline-flex hover:bg-gray-100 cursor-pointer"
                                                                    onClick={
                                                                        solution.action
                                                                    }
                                                                >
                                                                    <div className="p-1 rounded-[50px] justify-start items-center gap-2.5 flex">
                                                                        <solution.icon
                                                                            size={
                                                                                24
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="text-zinc-600 text-xl font-normal font-['Acme'] pr-10">
                                                                        {
                                                                            solution.name
                                                                        }
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </div>
                        </div>
                    </div>
                </nav>
                <Outlet />
            </div>
        </>
    );
}

export default Layout;

{
    /* <Outlet /> */
}
{
    /* <!-- Search Section --> */
}
{
    /* <div className="hidden md:block">
    <input
        type="text"
        placeholder="Search Facebook"
        className="rounded-full py-2 px-4 border-none focus:outline-none"
    />
  </div> */
}

// import { useState } from 'react';
// import { SlLogout } from 'react-icons/sl';
// import { useEffect } from 'react';
// import { useUserStore } from '../stores';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { ProfileCompletion } from '../pages/ProfileCompletion';
// import { IconContext } from 'react-icons';

{
    /* {openProfile && (
                <div
                    className="absolute top-20 right-4"
                    onClick={() => setOpenProfile(false)}
                >
                    <UserMenu />
                </div>
            )} */
}
{
    /* // ! <div className="flex-grow"> add flex-grow to all pages */
}
{
    /* <div
                    className="absolute bottom-10 left-8"
                    onClick={() => {
                        console.log('temporary logout');
                    }}
                >
                    <SlLogout size={35} />
                </div> */
}

{
    /* <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                                            {solutions.map(
                                                                (item) => (
                                                                    <a
                                                                        key={
                                                                            item.name
                                                                        }
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                                                    >
                                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                                                            <item.icon aria-hidden="true" />
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <p className="text-sm font-medium text-gray-900">
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </p>
                                                                            <p className="text-sm text-gray-500">
                                                                                {
                                                                                    item.description
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </a>
                                                                )
                                                            )}
                                                        </div>
                                                        <div className="bg-gray-50 p-4">
                                                            <a
                                                                href="##"
                                                                className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                                            >
                                                                <span className="flex items-center">
                                                                    <span className="text-sm font-medium text-gray-900">
                                                                        Documentation
                                                                    </span>
                                                                </span>
                                                                <span className="block text-sm text-gray-500">
                                                                    Start
                                                                    integrating
                                                                    products and
                                                                    tools
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div> */
}

// const [openProfile, setOpenProfile] = useState(false);
// const { login } = useUserStore();
// const navigate = useNavigate();
// useEffect(() => {
//     const log = async () => {
//         try {
//             await login();
//         } catch (e: any) {
//             toast.error(e);
//         }
//     };
//     log();
// }, []);
