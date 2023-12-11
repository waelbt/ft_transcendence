import { useState, useEffect, useMemo } from 'react';
import { Match } from '../../../shared/types';
import { Column } from 'react-table';
import { VersusIcon } from '../assets/custom-icons';
import Table from './Table';

const MatchTable = () => {
    const [data, setData] = useState<Match[]>([]);
    const columns = useMemo<Column<Match>[]>(
        () => [
            {
                Header: 'Players',
                accessor: 'players',
                Cell: ({ value }) => (
                    <div className="px-10 py-2 justify-center items-center gap-2.5 inline-flex">
                        <div className="p-2.5 justify-center items-center gap-[5px] flex">
                            <img
                                className="w-4 h-4 relative rounded-[60px] border border-black"
                                src={value[0].avatar}
                            />
                            <div className="text-black">
                                {value[0].name} ({value[0].rating})
                            </div>
                        </div>
                        <VersusIcon />
                        <div className="p-2.5 justify-center items-center gap-[5px] flex">
                            <div className="flex-col justify-center items-center gap-1 inline-flex">
                                <img
                                    className="w-4 h-4 relative rounded-[60px] border border-black"
                                    src={value[1].avatar}
                                />
                            </div>
                            <div className="text-black">
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
                        <div className="px-10 py-2 justify-center items-center gap-2.5 inline-flex">
                            <div className="flex-col justify-center items-center inline-flex">
                                <span>{value.score1}</span>
                                <span>{value.score2}</span>
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
                        <div className="px-10 py-2 bg-white flex-col justify-center items-center inline-flex">
                            {value}
                        </div>
                    );
                }
            },
            {
                Header: 'Date',
                accessor: 'date',
                Cell: ({ value }) => {
                    return (
                        <div className="px-14 py-2 bg-white flex-col justify-center items-center inline-flex">
                            {value}
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
            styles={{
                tableStyle: 'font-normal font-["Acme"]',
                theadStyle: 'bg-[#F5F5F5] text-zinc-500 text-sm  leading-5',
                tbodyStyle: 'text-zinc-500 text-base  leading-tight',
                trStyle: '',
                thStyle: 'py-2',
                tdStyle: ''
            }}
        />
    );
};

export default MatchTable;
