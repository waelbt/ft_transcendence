// import { Outlet } from 'react-router-dom';
import { ProfileCompletion } from '../ProfileCompletion';
// import SideBar from '../../components/SideBar';

// border border-white
// ! extract component navbar/sidebar/notification.....
export function Layout() {
    return (
        <>
            {false ? (
                <ProfileCompletion />
            ) : (
                <>
                    <div className="fixed top-0 left-0 w-full flex justify-center items-center h-screen overflow-hidden bg-secondary bg-cover bg-no-repeat blur opacity-60 -z-10"></div>
                    {/* <div className="fixed top-28 left-0 inline-flex flex-col gap-14">
                        <SideBar />
                        <div className="p-2.5 pl-0 pr-[2px] items-start rounded  bg-dark-blue">
                            <div className="relative flex w-64 py-3 pl-8 pr-0 items-center gap-4 hover:bg-[#F20505]">
                                <div className="absolute top-[-35px] right-[-50px] w-32  h-28 flex-shrink-0 bg-sidebar-img1 bg-cover bg-no-repeat"></div>
                                <div className="w-6 h-6 shrink-0">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18.9375 7.08797C18.7125 6.88172 18.3563 6.88172 18.15 7.10672C17.9438 7.33172 17.9438 7.68797 18.1688 7.89422L19.9313 9.54422H14.25C13.9312 9.54422 13.6875 9.78797 13.6875 10.1067C13.6875 10.4255 13.9312 10.6692 14.25 10.6692H20.025L18.1688 12.5255C17.9438 12.7505 17.9438 13.1067 18.1688 13.313C18.2813 13.4255 18.4313 13.4817 18.5625 13.4817C18.6937 13.4817 18.8437 13.4255 18.9562 13.313L21.7687 10.5005C21.8812 10.388 21.9375 10.238 21.9375 10.088C21.9375 9.93797 21.8625 9.78797 21.75 9.69422L18.9375 7.08797Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M15.75 15.1875C15.4313 15.1875 15.1875 15.4312 15.1875 15.75V18.9375H12C11.6812 18.9375 11.4375 19.1813 11.4375 19.5C11.4375 19.8187 11.6812 20.0625 12 20.0625H15.75C16.0687 20.0625 16.3125 19.8187 16.3125 19.5V15.75C16.3125 15.4312 16.0687 15.1875 15.75 15.1875Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M15.75 5.0625C16.0688 5.0625 16.3125 4.81875 16.3125 4.5V0.75C16.3125 0.43125 16.0688 0.1875 15.75 0.1875H6.375C6.05625 0.1875 5.8125 0.43125 5.8125 0.75C5.8125 1.06875 6.05625 1.3125 6.375 1.3125H15.1875V4.5C15.1875 4.81875 15.4312 5.0625 15.75 5.0625Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M8.49375 3.99328L0.99375 0.243277C0.825 0.149527 0.61875 0.168277 0.45 0.262027C0.28125 0.374527 0.1875 0.562027 0.1875 0.749527V19.4995C0.1875 19.7058 0.3 19.912 0.50625 20.0058L8.00625 23.7558C8.08125 23.7933 8.175 23.812 8.25 23.812C8.34375 23.812 8.45625 23.7745 8.55 23.737C8.71875 23.6245 8.8125 23.437 8.8125 23.2495V4.49953C8.8125 4.29328 8.7 4.08703 8.49375 3.99328Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M11.4375 10.6875C11.7482 10.6875 12 10.4357 12 10.125C12 9.81434 11.7482 9.5625 11.4375 9.5625C11.1268 9.5625 10.875 9.81434 10.875 10.125C10.875 10.4357 11.1268 10.6875 11.4375 10.6875Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <p className="text-white text-lg w-28 h-6 font-Acme  leading-6 tracking-wide flex-shrink-0">
                                    Log out
                                </p>
                            </div>
                        </div>
                    </div> */}
                    <nav className="bg-dark-blue shadow">
                        <div className="ml-auto px-4 sm:px-6 lg:px-8">
                            {/* <div className="flex justify-between h-20">
                                <div className="relative flex items-center justify-center flex-1">
                                    <div className="absolute -top-[120px] left-1/2 transform -translate-x-60 w-full h-full">
                                        <img
                                            src="./src/assets/navbar-jake.png"
                                            alt="navbar_jake"
                                        />
                                    </div>
                                    <div className="w-[80%] max-w-md">
                                        <label
                                            htmlFor="search"
                                            className="sr-only"
                                        >
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-6-8a6 6 0 1112 0 6 6 0 01-12 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="Search"
                                                type="search"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-shrink-0">
                                        <button
                                            type="button"
                                            className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <span className="sr-only">
                                                View notifications
                                            </span>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g id="vuesax/linear/notification">
                                                    <g id="notification">
                                                        <path
                                                            id="Vector"
                                                            d="M12.0201 2.91016C8.71009 2.91016 6.02009 5.60016 6.02009 8.91016V11.8002C6.02009 12.4102 5.76009 13.3402 5.45009 13.8602L4.30009 15.7702C3.59009 16.9502 4.08009 18.2602 5.38009 18.7002C9.69009 20.1402 14.3401 20.1402 18.6501 18.7002C19.8601 18.3002 20.3901 16.8702 19.7301 15.7702L18.5801 13.8602C18.2801 13.3402 18.0201 12.4102 18.0201 11.8002V8.91016C18.0201 5.61016 15.3201 2.91016 12.0201 2.91016Z"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            id="Vector_2"
                                                            d="M13.8699 3.19945C13.5599 3.10945 13.2399 3.03945 12.9099 2.99945C11.9499 2.87945 11.0299 2.94945 10.1699 3.19945C10.4599 2.45945 11.1799 1.93945 12.0199 1.93945C12.8599 1.93945 13.5799 2.45945 13.8699 3.19945Z"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            id="Vector_3"
                                                            d="M15.02 19.0605C15.02 20.7105 13.67 22.0605 12.02 22.0605C11.2 22.0605 10.44 21.7205 9.90002 21.1805C9.36002 20.6405 9.02002 19.8805 9.02002 19.0605"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeMiterlimit="10"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-teal-blue ring-offset-base-100 ring-offset-2">
                                            <img src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </nav>
                </>
            )}
        </>
    );
}
{
    /* <Outlet /> */
}

// /* Container for your main content and sidebar */
// .container {
//     display: flex;
//   }

//   /* Main content section */
//   .main-content {
//     flex-grow: 1; /* Takes up the remaining space */
//     /* Add other styling as needed */
//   }

//   /* Sidebar section */
//   .sidebar {
//     width: 250px; /* Adjust as needed */
//     position: fixed; /* Keeps the sidebar in place when scrolling */
//     top: 0; /* Aligns the top of the sidebar with the top of the viewport */
//     right: 0; /* Positions the sidebar on the right. Use 'left: 0;' for a left sidebar */
//     height: 100vh; /* Full viewport height */
//     /* Add other styling as needed, like background, padding, etc. */
//   }

{
    /* <div class="container">
  <div class="main-content">
    <!-- Main content goes here -->
  </div>
  <div class="sidebar">
    <!-- Sidebar content goes here -->
  </div>
</div> */
}
{
    /* <div className="fixed w-full h-[8%] top-0 left-0  bg-dark-blue ">
                        <div className="absolute top-1/2 translate inline-flex justify-center items-center -translate-y-1/2 right-6 gap-4">
                            <div className="w-[52px] h-[52px] p-3.5  justify-start items-start gap-2.5 inline-flex">
                                <div className="w-6 h-6 relative">
                                    <div className="w-6 h-6 left-0 top-0 absolute justify-center items-center inline-flex">
                                        <div className="w-6 h-6 relative">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g id="vuesax/linear/notification">
                                                    <g id="notification">
                                                        <path
                                                            id="Vector"
                                                            d="M12.0201 2.91016C8.71009 2.91016 6.02009 5.60016 6.02009 8.91016V11.8002C6.02009 12.4102 5.76009 13.3402 5.45009 13.8602L4.30009 15.7702C3.59009 16.9502 4.08009 18.2602 5.38009 18.7002C9.69009 20.1402 14.3401 20.1402 18.6501 18.7002C19.8601 18.3002 20.3901 16.8702 19.7301 15.7702L18.5801 13.8602C18.2801 13.3402 18.0201 12.4102 18.0201 11.8002V8.91016C18.0201 5.61016 15.3201 2.91016 12.0201 2.91016Z"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            id="Vector_2"
                                                            d="M13.8699 3.19945C13.5599 3.10945 13.2399 3.03945 12.9099 2.99945C11.9499 2.87945 11.0299 2.94945 10.1699 3.19945C10.4599 2.45945 11.1799 1.93945 12.0199 1.93945C12.8599 1.93945 13.5799 2.45945 13.8699 3.19945Z"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            id="Vector_3"
                                                            d="M15.02 19.0605C15.02 20.7105 13.67 22.0605 12.02 22.0605C11.2 22.0605 10.44 21.7205 9.90002 21.1805C9.36002 20.6405 9.02002 19.8805 9.02002 19.0605"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                            strokeMiterlimit="10"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-1.5 h-1.5 left-[18px] top-0 absolute bg-red-600 rounded-full" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-teal-blue ring-offset-base-100 ring-offset-2">
                                    <img src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                </div>
                            </div>
                        </div>
                    </div> */
}
