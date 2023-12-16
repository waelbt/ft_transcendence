// import { useState } from 'react';
// import { UserProfileCard, MatchTable, Achievements } from '../../components/';
// import { request } from '../../axios-utils';
// const [currentView, setCurrentView] = useState<
// 'achievements' | 'Completed Games'
// >('achievements');
import { Outlet } from 'react-router-dom';
import { UserProfileCard } from '../../components/';

export function Profile() {
    return (
        // gap-20
        <div className="flex-grow flex-col justify-center items-center inline-flex gap-14">
            <UserProfileCard />
            <div className="w-2/3 h-full p-2.5 bg-white rounded-[20px] shadow flex-col justify-start items-center inline-flex">
                <Outlet />
            </div>
        </div>
    );
}
{
    /* <div className="p-2.5 left-0 top-0 absolute bg-stone-50 justify-center items-center gap-2.5 inline-flex">
                        <div className="w-[1323px] h-[73px] px-20 rounded-[10px] justify-between items-center flex">
                            <div className="w-[130px] px-2.5 py-1.5 justify-center items-center gap-[15px] flex">
                                <div className="w-[110px] text-neutral-500 text-[22px] font-normal font-['Acme'] leading-7">
                                    Date & Time
                                </div>
                            </div>
                            <div className="w-[480px] self-stretch px-2.5 py-1.5 justify-center items-center gap-[15px] flex">
                                <div className="text-neutral-500 text-[22px] font-normal font-['Acme'] leading-7">
                                    opponent
                                </div>
                            </div>
                            <div className="w-[63px] self-stretch px-2.5 py-1.5 justify-center items-center gap-[15px] flex">
                                <div className="text-neutral-500 text-[22px] font-normal font-['Acme'] leading-7">
                                    score
                                </div>
                            </div>
                            <div className="w-[88px] self-stretch px-2.5 py-1.5 justify-center items-center gap-[15px] flex">
                                <div className="text-neutral-500 text-[22px] font-normal font-['Acme'] leading-7">
                                    Awarded
                                </div>
                            </div>
                        </div>
                    </div> */
}
{
    /*Achievements && MatchTable */
}
{
    /*
            <div className="p-3 bg-white rounded-xl  border border-neutral-100 flex-col justify-start items-start inline-flex">
                {/* switch element 
                <div className="pl-5 pr-2.5  pb-1 bg-white justify-start items-center gap-2.5 inline-flex">
                    <button
                        className={`pl-2.5 pr-6 py-2.5 border-r border-neutral-100 flex-col justify-center items-center gap-2.5 inline-flex text-2xl font-normal font-['Acme'] cursor-pointer ${
                            currentView != 'achievements'
                                ? 'text-black'
                                : 'text-zinc-500'
                        }`}
                        onClick={() => setCurrentView('Completed Games')}
                    >
                        Completed Games
                    </button>
                    <button
                        className={`pl-4 pr-2.5 py-2.5 flex-col justify-center items-center gap-2.5 inline-flex  text-2xl font-normal font-['Acme'] cursor-pointer ${
                            currentView == 'achievements'
                                ? 'text-black'
                                : 'text-zinc-500'
                        }`}
                        onClick={() => setCurrentView('achievements')}
                    >
                        Achievements
                    </button>
                </div>
                {currentView == 'Completed Games' ? (
                    <MatchTable />
                ) : (
                    <Achievements />
                )}
            </div>
            */
}
