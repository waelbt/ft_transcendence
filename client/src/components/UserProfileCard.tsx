// import {
//     AchievementIcon,
//     JoinIcon,
//     LoseCupIcon,
//     RankIcon,
//     WinCupIcon
// } from '../assets/custom-icons';
// import { useUserStore } from '../stores';
// import ProgressRingLoader from './ProgressRingLoader';

import { NavLink, Navigate } from 'react-router-dom';
import { AchievementIcon, JoinIcon } from '../assets/custom-icons';
import ProgressBar from './ProgressBar';

// import { UserMenu } from '.';

// ! add props
function UserProfileCard() {
    // const user = useUserStore();
    const navLinks = ['history', 'achivements', 'friends', 'setting'];
    return (
        <>
            <div className=" px-2.5 rounded-[20px] shadow justify-start items-center gap-5 inline-flex bg-white">
                <div className="px-5 py-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
                    {/* avatar */}
                    <div className="avatar online">
                        <div className="w-40 h-40 rounded-full">
                            <img src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" />
                        </div>
                    </div>
                    <div className="text-black text-[22px] font-normal font-['Acme']">
                        dos404
                    </div>
                </div>
                <div className="flex-col justify-center items-start inline-flex pt-4">
                    <div className="self-stretch px-10 justify-start items-start gap-2.5 inline-flex">
                        <div className="text-neutral-400 text-[22px] font-normal font-['Acme']">
                            wael boutzougarte
                        </div>
                    </div>
                    <div className="w-[553px] h-[130px] px-10 py-[35px] border-l-4 border-r-4 border-gray-200 flex-col justify-center items-start gap-2.5 flex">
                        <div className="self-stretch justify-between items-start  inline-flex text-black text-xl font-normal font-['Acme']">
                            <span>level 29</span>
                            <span>2200/3000</span>
                        </div>
                        <ProgressBar />
                    </div>
                    <div className="self-stretch px-10 justify-start items-start gap-2.5 inline-flex">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                to={`/profile/${link}`}
                                className={({ isActive }) =>
                                    `px-2.5 py-[21px] justify-center items-center gap-2.5 flex text-xl font-normal font-['Acme'] ${
                                        isActive
                                            ? 'text-black border-b-4 border-black '
                                            : ' text-neutral-500'
                                    }`
                                }
                            >
                                {index === 0 && (
                                    <Navigate
                                        to={`/profile/friends `}
                                        i
                                        replace
                                    />
                                )}
                                {link}
                            </NavLink>
                        ))}
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
                            Jan 19, 2019
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// <div className="h-[69px] left-[44px] top-[216px] absolute justify-center items-center gap-2.5 inline-flex">
//     <div className="px-2.5 py-[21px] border-b-4 border-black justify-center items-center gap-2.5 flex">
//         <div className="text-black text-xl font-normal font-['Acme']">
//             completed games
//         </div>
//     </div>
//     <div className="px-2.5 py-[21px] justify-center items-center gap-2.5 flex">
//         <div className="text-neutral-500 text-xl font-normal font-['Acme']">
//             achivements
//         </div>
//     </div>
//     <div className="px-2.5 py-[21px] justify-center items-center gap-2.5 flex">
//         <div className="text-neutral-500 text-xl font-normal font-['Acme']">
//             friends
//         </div>
//     </div>
//     <div className="px-2.5 py-[21px] justify-center items-center gap-2.5 flex">
//         <div className="text-neutral-500 text-xl font-normal font-['Acme']">
//             setting
//         </div>
//     </div>
// </div>;
// <div className="px-12 py-2 bg-white rounded-3xl border border-neutral-100 flex-col justify-start items-start gap-1.5 inline-flex">

// </div>
export default UserProfileCard;

// function UserProfileCard() {
//     // const user = useUserStore();
//     return (
//         <div className="px-12 py-2 bg-white rounded-3xl border border-neutral-100 flex-col justify-start items-start gap-1.5 inline-flex">
//             {/* nickname */}
//             <div className="space-x-2">
//                 <span className="text-black text-2xl font-normal font-['Acme']">
//                     {/* {user.nickName}{' '} */}
//                 </span>
//                 <span className="text-neutral-400 text-2xl font-normal font-['Acme']">
//                     {/* ( {user.fullName} ) */}
//                 </span>
//             </div>
//             {/* section 2 */}
//             <div className="px-1 py-4 justify-center items-center gap-4 inline-flex">
//                 {/* avatar */}
//                 <div className="avatar online">
//                     <div className="w-32 h-32 rounded-full">
//                         <img src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" />
//                     </div>
//                 </div>
//                 {/* total achievements && games + results  + join date */}
//                 <div className="px-3 py-3 rounded-lg flex-col justify-start items-center gap-6 inline-flex">
//                     <div className=" px-[5px] py-1.5 justify-center items-center gap-1 inline-flex space-x-2">
//                         <AchievementIcon />
//                         <div className="text-yellow-400 text-3xl font-normal font-['Acme']">
//                             0/13 achievements
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-center justify-start gap-2">
//                         {/* //! fix font later and maybe structre */}
//                         <div className="space-x-2">
//                             <span className="text-black text-lg font-medium font-['Lato']">
//                                 Total Games{' '}
//                             </span>
//                             <span className="text-black text-[19px] font-normal font-['Lato']">
//                                 11
//                             </span>
//                         </div>
//                         <div className="py-2.5 justify-start items-center inline-flex space-x-3">
//                             <div className="justify-center items-center gap-2.5 flex">
//                                 <WinCupIcon />
//                                 <div className="text-lime-600 text-[15px] font-normal font-['Langar']">
//                                     WINS 07
//                                 </div>
//                             </div>
//                             <div className="text-black text-base font-normal font-['Open Sans']">
//                                 -
//                             </div>
//                             <div className="justify-center items-center gap-2.5 flex">
//                                 <LoseCupIcon />
//                                 <div className="text-red-500 text-[15px] font-normal font-['Langar']">
//                                     LOSES 04
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="px-1 justify-center items-center gap-1.5 inline-flex">
//                         <JoinIcon />
//                         <div className=" text-neutral-400 text-sm font-normal font-['Acme']">
//                             {/* {user.createdAt} */}
//                         </div>
//                     </div>
//                 </div>
//                 {/* level + rank */}
//                 <div className="relative flex flex-col justift-center items-center gap-0">
//                     <div className="text-neutral-600 text-xl font-bold font-['Lato'] leading-none tracking-wide">
//                         Level
//                     </div>
//                     <ProgressRingLoader
//                         style={''}
//                         color="#FFD700"
//                         radius={88}
//                         stroke={16}
//                         progress={50}
//                     >
//                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                             <div className="relative">
//                                 <RankIcon />
//                                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-[23px] font-normal font-['Playfair Display SC']">
//                                     15
//                                 </div>
//                             </div>
//                         </div>
//                     </ProgressRingLoader>
//                     <div className="text-center text-zinc-500 text-xl font-bold font-['Lato'] leading-none">
//                         5 - 23%
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
