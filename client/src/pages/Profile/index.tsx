import { useState, useEffect, useMemo } from 'react';
import MatchTable from '../../components/MatchTable';
import { Column, Match, Player } from '../../../../shared/types';

export function Profile() {
    const [currentView, setCurrentView] = useState<
        'achievements' | 'Completed Games'
    >('achievements');

    const [data, setData] = useState<Match[]>([]);
    const columns = useMemo<Column<Match>[]>( // Remove the generic <Match> from here
        () => [
            {
                Header: 'Players',
                accessor: (row: Match) =>
                    row.players
                        .map(
                            (player: Player) =>
                                `${player.name} (${player.rating})`
                        )
                        .join(' vs ')
            },
            {
                Header: 'Result',
                accessor: 'result'
            },
            {
                Header: 'Awarded',
                accessor: 'awarded'
            },
            {
                Header: 'Date',
                accessor: 'date'
            }
        ],
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/matches');
                const matches: Match[] = await response.json();
                setData(matches);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        // gap-20
        <div className="flex-grow flex-col justify-center items-center inline-flex">
            {/* profile card <UserProfileCard/> */}
            {/* <UserProfileCard/> */}
            <div className="pb-3.5 bg-white rounded-xl  border border-neutral-100 flex-col justify-start items-start inline-flex">
                {/* switch element */}
                {/* <div className="pl-5 pr-2.5 pt-6 pb-1 bg-white justify-start items-center gap-2.5 inline-flex">
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
                </div> */}
                {/* // !add coonditionnal rendering here later*/}
                <MatchTable columns={columns} data={data} />
            </div>
        </div>
    );
}

// import { useState, useEffect, useMemo } from 'react';
// import MatchTable from '../../components/MatchTable';
// import { Column, Match, Player } from '../../../../shared/types';
{
    /* <MatchTable columns={columns} data={data} />; */
}

// const [data, setData] = useState<Match[]>([]);
//     const columns = useMemo<Column<Match>[]>( // Remove the generic <Match> from here
//         () => [
//             {
//                 Header: 'Players',
//                 accessor: (row: Match) =>
//                     row.players
//                         .map(
//                             (player: Player) =>
//                                 `${player.name} (${player.rating})`
//                         )
//                         .join(' vs ')
//             },
//             {
//                 Header: 'Result',
//                 accessor: 'result'
//             },
//             {
//                 Header: 'Awarded',
//                 accessor: 'awarded'
//             },
//             {
//                 Header: 'Date',
//                 accessor: 'date'
//             }
//         ],
//         []
//     );

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/matches');
//                 const matches: Match[] = await response.json();
//                 setData(matches);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };

//         fetchData();
//     }, []);
