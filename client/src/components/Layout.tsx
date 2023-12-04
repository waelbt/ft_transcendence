import { NavLink, Outlet } from 'react-router-dom';
import { ProfileCompletion } from '../pages/ProfileCompletion';
import { IconContext } from 'react-icons';
import { IoIosNotifications } from 'react-icons/io';

export function Layout() {
    const navLinks = ['Home', 'Profile', 'Chat', 'Rooms', 'Game']; //! game section is temporary here

    return (
        <>
            {false ? (
                <ProfileCompletion />
            ) : (
                <div className="flex flex-col h-screen bg-primary-white">
                    <nav className="bg-white border-b border-neutral-100">
                        <div className="w-full px-4">
                            <div className="flex justify-between items-center">
                                {/* <!-- Logo Section --> */}
                                <div className="flex-shrink-0 text-black text-xl font-bold font-['Lemonada']">
                                    LaughTale
                                </div>

                                {/* <!-- Menu Section --> */}
                                <div className="justify-center items-center gap-2.5 inline-flex">
                                    {navLinks.map((link) => (
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
                                <div className="px-2.5 justify-start items-center gap-[30px] inline-flex">
                                    <div className="relative p-2.5 bg-neutral-100 rounded-[50px] justify-start items-center gap-2.5 inline-flex">
                                        <IconContext.Provider
                                            value={{
                                                color: '#787878'
                                            }}
                                        >
                                            <IoIosNotifications size={28} />
                                        </IconContext.Provider>
                                        {/*  //!  Red dot for new notifications <span className="absolute top-0 right-0 block h-3 w-3 bg-red-600 rounded-full"></span> */}
                                    </div>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-amber-500 ring-offset-base-100 ring-offset-2">
                                            <img src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {/* // ! <div className="flex-grow"> add flex-grow to all pages */}
                    <Outlet />
                </div>
            )}
        </>
    );
}

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
