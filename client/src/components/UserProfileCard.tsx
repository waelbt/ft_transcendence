import {
    AchievementIcon,
    JoinIcon,
    LoseCupIcon,
    RankIcon,
    WinCupIcon
} from '../assets/custom-icons';
import ProgressRingLoader from './ProgressRingLoader';

function UserProfileCard() {
    return (
        <div className="px-12 py-2 bg-white rounded-3xl border border-neutral-100 flex-col justify-start items-start gap-1.5 inline-flex">
            {/* nickname */}
            <div className="space-x-2">
                <span className="text-black text-[22px] font-normal font-['Acme']">
                    Dos404{' '}
                </span>
                <span className="text-neutral-400 text-[22px] font-normal font-['Acme']">
                    ( wael boutzougarte )
                </span>
            </div>
            {/* section 2 */}
            <div className="px-1 py-4 justify-center items-center gap-4 inline-flex">
                {/* avatar */}
                <div className="avatar online">
                    <div className="w-32 h-32 rounded-full">
                        <img src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" />
                    </div>
                </div>
                {/* total achievements && games + results  + join date */}
                <div className="px-3 py-3 rounded-lg flex-col justify-start items-center gap-6 inline-flex">
                    <div className=" px-[5px] py-1.5 justify-center items-center gap-1 inline-flex space-x-2">
                        <AchievementIcon />
                        <div className="text-yellow-400 text-3xl font-normal font-['Acme']">
                            0/13 achievements
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        {/* //! fix font later and maybe structre */}
                        <div className="space-x-2">
                            <span className="text-black text-lg font-medium font-['Lato']">
                                Total Games{' '}
                            </span>
                            <span className="text-black text-[19px] font-normal font-['Lato']">
                                11
                            </span>
                        </div>
                        <div className="py-2.5 justify-start items-center inline-flex space-x-3">
                            <div className="justify-center items-center gap-2.5 flex">
                                <WinCupIcon />
                                <div className="text-lime-600 text-[15px] font-normal font-['Langar']">
                                    WINS 07
                                </div>
                            </div>
                            <div className="text-black text-base font-normal font-['Open Sans']">
                                -
                            </div>
                            <div className="justify-center items-center gap-2.5 flex">
                                <LoseCupIcon />
                                <div className="text-red-500 text-[15px] font-normal font-['Langar']">
                                    LOSES 04
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-1 justify-center items-center gap-1.5 inline-flex">
                        <JoinIcon />
                        <div className=" text-neutral-400 text-sm font-normal font-['Acme']">
                            Jan 19, 2019
                        </div>
                    </div>
                </div>
                {/* level + rank */}
                <ProgressRingLoader
                    style={''}
                    color="#FFD700"
                    radius={88}
                    stroke={16}
                    progress={50}
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <RankIcon />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-[23px] font-normal font-['Playfair Display SC']">
                                15
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[14%] left-1/2 transform -translate-x-1/2  text-neutral-600 text-xs font-bold font-['Lato'] leading-none tracking-wide">
                        Level
                    </div>
                    <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 text-center text-zinc-500 text-xs font-bold font-['Lato'] leading-none">
                        5 - 23%
                    </div>
                </ProgressRingLoader>
            </div>
        </div>
    );
}

export default UserProfileCard;
