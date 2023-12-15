// import { useState } from 'react';
// import { UserProfileCard, MatchTable, Achievements } from '../../components/';
// import { request } from '../../axios-utils';
// const [currentView, setCurrentView] = useState<
// 'achievements' | 'Completed Games'
// >('achievements');
import { Outlet } from 'react-router-dom';
import { UserProfileCard } from '../../components/';

export function Profile() {
    // useEffect(() => {
    //     request.get('/users/me').then((response) => console.log(response)).catch(error => console.log(error));
    // }, []);
    return (
        // gap-20
        <div className="flex-grow flex-col justify-center items-center inline-flex gap-14">
            {/* profile card */}
            <UserProfileCard />
            <Outlet/>
        </div>
    );
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
