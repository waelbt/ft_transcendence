import { useState } from 'react';
import { UserProfileCard, MatchTable } from '../../components/';

export function Profile() {
    const [currentView, setCurrentView] = useState<
        'achievements' | 'Completed Games'
    >('achievements');

    return (
        // gap-20
        <div className="flex-grow flex-col justify-center items-center inline-flex">
            {/* profile card <UserProfileCard/> */}
            <UserProfileCard />
            <div className="p-3 bg-white rounded-xl  border border-neutral-100 flex-col justify-start items-start inline-flex">
                {/* switch element */}
                <div className="pl-5 pr-2.5  pb-1 bg-white justify-start items-center gap-2.5 inline-flex">
                    <button
                        className={`pl-2.5 pr-6 py-2.5 border-r border-neutral-300 flex-col justify-center items-center gap-2.5 inline-flex text-5 font-normal font-['Acme'] cursor-pointer ${
                            currentView != 'achievements'
                                ? 'text-black'
                                : 'text-zinc-500'
                        }`}
                        onClick={() => setCurrentView('Completed Games')}
                    >
                        Completed Games
                    </button>
                    <button
                        className={`pl-4 pr-2.5 py-2.5 flex-col justify-center items-center gap-2.5 inline-flex  text-5 font-normal font-['Acme'] cursor-pointer ${
                            currentView == 'achievements'
                                ? 'text-black'
                                : 'text-zinc-500'
                        }`}
                        onClick={() => setCurrentView('achievements')}
                    >
                        Achievements
                    </button>
                </div>
                <MatchTable />
                {/* // !add coonditionnal rendering here later*/}
            </div>
        </div>
    );
}
