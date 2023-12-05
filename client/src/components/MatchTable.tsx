import { useState, useEffect, useMemo } from 'react';
import { Match } from '../../../shared/types';
import { Column } from 'react-table';
import { VsIcon } from '../assets/custom-icons';
import Table from './Table';

const MatchTable = () => {
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
                        <div className="px-24 bg-white flex-col justify-center items-center inline-flex">
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
        <Table
            columns={columns}
            data={data}
            HeaderStyle="bg-[#F5F5F5] text-zinc-500 text-sm font-normal font-['Acme'] leading-5"
        />
    );
};

export default MatchTable;
