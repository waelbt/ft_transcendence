import { useState, useEffect, useMemo } from 'react';
import { Match } from '../../../shared/types';
import { Column } from 'react-table';
import { VersusIcon } from '../assets/custom-icons';
import Table from './Table';

import { ProfileOutletContextType } from '../types/global';

const MatchTable = () => {
    const [data, setData] = useState<Match[]>([]);

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

        // fetchData();
    }, []);

    const columns = useMemo<Column<Match>[]>(
        () => [
            {
                Header: 'Date & Time',
                accessor: 'date',
                Cell: ({ value }) => {
                    return (
                        <div className="flex-col justify-center items-center inline-flex">
                            {value}
                        </div>
                    );
                }
            },
            {
                Header: 'Opponent',
                accessor: 'opponent',
                Cell: ({ value }) => (
                    <div className="justify-center items-center gap-4 inline-flex">
                        <VersusIcon />
                        <div className="p-2.5 justify-center items-center gap-2.5 flex">
                            <div className="flex-col justify-center items-center gap-1 inline-flex">
                                <img
                                    className="w-8 h-8 relative rounded-[60px] border border-black"
                                    src={value.avatar}
                                />
                            </div>
                            <div className="text-black">
                                {value.name} ({value.rating})
                            </div>
                        </div>
                    </div>
                )
            },
            {
                Header: 'score',
                accessor: 'score',
                Cell: ({ value }) => {
                    return (
                        <div>
                            {value.score1} - {value.score2}
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
                        <div>{value}</div>
                    );
                }
            }
        ],
        []
    );

    return (
        // ! protect if the data is empty
        <div className="overflow-y-auto max-h-[560px] w-full ">
            <Table
                columns={columns}
                data={data}
                styles={{
                    tableStyle:
                        'w-full text-xl text-neutral-500 font-normal font-["Acme"]',
                    theadStyle:
                        'sticky top-0 z-10 border-b border-neutral-100 bg-white ',
                    tbodyStyle: 'overflow-y-auto w-full',
                    trStyle: '',
                    thStyle: 'px-2 py-5',
                    tdStyle: 'p-2 text-center align-middle'
                }}
                getRowProps={(row) => ({
                    className: `rounded-3xl border-b-8 border-white rounded-full ${
                        row.original.score.score1 > row.original.score.score2
                            ? ' bg-emerald-100  '
                            : 'bg-red-200 '
                    }`
                })}
            />
        </div>
    );
};

export default MatchTable;
