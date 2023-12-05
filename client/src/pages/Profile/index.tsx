import { useState, useEffect, useMemo } from 'react';
import MatchTable from '../../components/MatchTable';
import { Match, Player } from '../../../../shared/types';
import { Column, CellProps } from 'react-table';
import { VsIcon } from '../../assets/custom-icons';
import { Result } from 'postcss';

export function Profile() {
    const [currentView, setCurrentView] = useState<
        'achievements' | 'Completed Games'
    >('achievements');

    const [data, setData] = useState<Match[]>([]);
    const columns = useMemo<Column<Match>[]>(
        () => [
            {
                Header: 'Players',
                accessor: 'players',
                Cell: ({ value }) => (
                    <div className="px-2.5 py-1.5 justify-center items-center gap-2.5 inline-flex">
                        <div className="p-2.5 justify-center items-center gap-[5px] flex">
                            <img
                                className="w-4 h-4 relative rounded-[60px] border border-black"
                                src={value[0].avatar}
                            />
                            <div className="text-black text-base font-normal font-['Acme'] leading-tight">
                                {value[0].name} ({value[0].rating})
                            </div>
                        </div>
                        <VsIcon />
                        <div className="p-2.5 justify-center items-center gap-[5px] flex">
                            <div className="flex-col justify-center items-center gap-[5px] inline-flex">
                                <img
                                    className="w-4 h-4 relative rounded-[60px] border border-black"
                                    src={value[1].avatar}
                                />
                            </div>
                            <div className="text-black text-base font-normal font-['Acme'] leading-tight">
                                {value[1].name} ({value[1].rating})
                            </div>
                        </div>
                    </div>
                )
            },
            {
                Header: 'Result',
                accessor: 'result',
                Cell: ({ value }) => {
                    return (
                        <div className="px-4 justify-center items-center gap-2.5 inline-flex">
                            <div className="flex-col justify-center items-center inline-flex">
                                <div className="text-zinc-500 text-base font-normal font-['Acme'] leading-tight">
                                    {value.score1}
                                </div>
                                <div className="text-zinc-500 text-base font-normal font-['Acme'] leading-tight">
                                    {value.score2}
                                </div>
                            </div>
                            <div
                                className={`w-[15px] h-[15px] rounded flex-col justify-center items-center inline-flex ${
                                    value.score1 > value.score2
                                        ? 'bg-lime-600'
                                        : 'bg-red-500'
                                }`}
                            >
                                <div className="text-white text-[15px] font-normal font-['Acme'] leading-tight">
                                    {value.score1 > value.score2 ? '+' : '-'}
                                </div>
                            </div>
                        </div>
                    );
                }
            },
            {
                Header: 'Awarded',
                accessor: 'awarded',
                Cell: ({ value }) => {
                    return (
                        // ! for responsive add md on padding
                        <div className="pl-4 bg-white flex-col justify-center items-center inline-flex">
                            <div className="text-zinc-500 text-[15px] font-normal font-['Acme'] leading-tight">
                                {value}
                            </div>
                        </div>
                    );
                }
            },
            {
                Header: 'Date',
                accessor: 'date',
                Cell: ({ value }) => {
                    return (
                        <div className="px-10 bg-white flex-col justify-center items-center inline-flex">
                            <div className="text-zinc-500 text-[15px] font-normal font-['Acme'] leading-tight">
                                {value}
                            </div>
                        </div>
                    );
                }
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

// <div className="w-[35px] h-[42px] flex-col justify-center items-center inline-flex">
//     <div className="self-stretch grow shrink basis-0 relative">
//         <div className="w-2.5 h-[42px] left-0 top-0 absolute flex-col justify-center items-center inline-flex">
//             <div className="text-zinc-500 text-base font-normal font-['Acme'] leading-tight">
//                 {value.score1}
//             </div>
//             <div className="text-zinc-500 text-base font-normal font-['Acme'] leading-tight">
//                 {value.score2}
//             </div>
//         </div>
//         {value.score1 > value.score2 ? (
//             <div className="w-[15px] h-[15px] bg-lime-600 rounded flex-col justify-center items-center inline-flex">
//                 <div className="text-white text-[15px] font-normal font-['Acme'] leading-tight">
//                     +
//                 </div>
//             </div>
//         ) : (
//             <div className="w-[15px] h-[15px] left-[20px] top-[13.50px] absolute bg-red-500 rounded flex-col justify-center items-center inline-flex">
//                 <div className="text-white text-sm font-normal font-['Acme'] leading-tight">
//                     -
//                 </div>
//             </div>
//         )}
//     </div>
// </div>
