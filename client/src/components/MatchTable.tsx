import { useState, useEffect, useMemo } from 'react';
import { Match } from '../../../shared/types';
import { Column } from 'react-table';
import { VersusIcon } from '../assets/custom-icons';
import Table from './Table';
import { useOutletContext } from 'react-router-dom';

// <div className="w-[1323px] h-[73px] px-20 bg-emerald-600 bg-opacity-20 rounded-[10px] justify-between items-center inline-flex">
//     <div className="w-[169px] self-stretch px-2.5 py-1.5 justify-center items-center gap-[15px] flex">
//         <div className="text-neutral-500 text-[22px] font-normal font-['Acme'] leading-7">
//             12-12-2023 17:39
//         </div>
//     </div>
//     <div className="w-[480px] self-stretch px-2.5 py-1.5 justify-center items-center gap-[15px] flex">
//         <div className="w-[50px] h-[50px] relative"></div>
//         <div className="p-2.5 justify-center items-center gap-2.5 flex">
//             <img
//                 className="w-8 h-8 relative rounded-[60px] border border-black"
//                 src="https://via.placeholder.com/32x32"
//             />
//             <div>
//                 <span className="text-black text-[22px] font-normal font-['Acme'] leading-7">
//                     simopoza{' '}
//                 </span>
//                 <span className="text-zinc-500 text-[22px] font-normal font-['Acme'] leading-7">
//                     (8.58)
//                 </span>
//                 <span className="text-black text-[22px] font-normal font-['Acme'] leading-7">
//                     {' '}
//                 </span>
//             </div>
//         </div>
//     </div>
//     <div className="w-[61px] self-stretch px-2.5 py-1.5 justify-center items-center gap-[15px] flex">
//         <div className="text-black text-[22px] font-normal font-['Acme'] leading-7">
//             3 - 5
//         </div>
//     </div>
//     <div className="w-[88px] self-stretch px-2.5 py-1.5 justify-center items-center gap-[15px] flex">
//         <div className="text-black text-[22px] font-normal font-['Acme'] leading-7">
//             +30 exp
//         </div>
//     </div>
// </div>;

const MatchTable = () => {
    const [data, setData] = useState<Match[]>([]);
    const columns = useMemo<Column<Match>[]>(
        () => [
            {
                Header: 'Date & Time',
                accessor: 'date',
                Cell: ({ value }) => {
                    return (
                        <div className="px-14 py-2  flex-col justify-center items-center inline-flex">
                            {value}
                        </div>
                    );
                }
            },
            {
                Header: 'Opponent',
                accessor: 'opponent',
                Cell: ({ value }) => (
                    <div className="px-10 py-2 justify-center items-center gap-4 inline-flex">
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
                        <div className="px-10 py-2 justify-center items-center gap-2.5 inline-flex">
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
                        <div className="px-10 py-2 flex-col justify-center items-center inline-flex">
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
                tableStyle: 'font-normal font-["Acme"] text-2xl',
                theadStyle: 'bg-[#F5F5F5] text-zinc-500  leading-5',
                tbodyStyle: 'text-zinc-500 leading-tight ',
                trStyle: 'px-20',
                thStyle: 'py-2',
                tdStyle: ''
            }}
        />
    );
};

export default MatchTable;
