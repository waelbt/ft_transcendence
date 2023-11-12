// import { Outlet } from 'react-router-dom';
import { ProfileCompletion } from '../ProfileCompletion';

export function Layout() {
    return (
        <>
            {false ? (
                <ProfileCompletion />
            ) : (
                <div className="flex">
                    <div className='fixed top-10 left-0'>
                        <div className=" inline-flex p-2.5 pr-[2px] flex-col items-start gap-2.5 rounded bg-dark-blue">
                            <div className="absolute top-[-30px] right-[-40px] w-36 h-32 flex-shrink-0 bg-bmo-sitting bg-cover bg-no-repeat"></div>
                            <div className="flex w-64 py-3 pl-6 pr-0 items-center gap-4 hover:bg-[#F20505]">
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
                    </div>
                </div>
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
