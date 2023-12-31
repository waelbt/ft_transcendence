import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MENU_FIELDS, NAV_LINKS } from '../constants';

import { Avatar } from '.';
import { useUserStore } from '../stores';
import { ProfileCompletion } from '../pages/ProfileCompletion';

function Layout() {
    // const { logout, login, isLogged, isProfileComplete } = useUserStore();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isLogged) navigate('/');
    // }, []);

    // useEffect(() => {
    //     // Define the async function inside the useEffect
    //     const fetchData = async () => {
    //         try {
    //             await login();
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     // Call the async function
    //     fetchData();
    // }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <>
            {false ? (
                <ProfileCompletion />
            ) : (
                <div className="relative flex flex-col h-screen bg-primary-white gap-3">
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
                                                                        '/profile/me'
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
                                                            {MENU_FIELDS.map(
                                                                (
                                                                    field,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="self-stretch p-2.5 justify-start items-center gap-4 inline-flex hover:bg-gray-100 cursor-pointer"
                                                                        onClick={() => {
                                                                            field.path ==
                                                                            '/'
                                                                                ? logout()
                                                                                : null;
                                                                            navigate(
                                                                                field.path
                                                                            );
                                                                        }}
                                                                    >
                                                                        <div className="p-1 rounded-[50px] justify-start items-center gap-2.5 flex">
                                                                            <field.icon
                                                                                size={
                                                                                    24
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="text-zinc-600 text-xl font-normal font-['Acme'] pr-10">
                                                                            {
                                                                                field.name
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
            )}
        </>
    );
}

export default Layout;
