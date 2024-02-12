import { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';
import { LeaderboardEntry } from '../../../shared/types';
import { NewTabIcon } from '../assets/custom-icons';
import { Table } from '.';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
// import useAxiosPrivate from '../hooks/axiosPrivateHook';

function LeaderBoard() {
    const axiosPrivate = useAxiosPrivate();
    const rankColors = ['', 'red-600', 'orange-800', 'amber-500'];
    const [data, setData] = useState<LeaderboardEntry[]>([]);
    const columns = useMemo<Column<LeaderboardEntry>[]>(
        () => [
            {
                Header: 'Rank',
                accessor: 'rank',
                Cell: ({ value }) => (
                    <div className="grow shrink basis-0 self-stretch px-3 py-[15px] bg-white flex-col justify-center items-center inline-flex">
                        <div
                            className={`  text-[25px] font-normal font-['Acme'] leading-loose ${
                                value <= 3
                                    ? `text-${rankColors[value]}`
                                    : 'text-black'
                            }`}
                        >
                            {value}
                        </div>
                    </div>
                )
            },
            {
                Header: 'Player',
                accessor: (data) => ({
                    nickName: data.nickName,
                    avatar: data.avatar
                }),
                Cell: ({
                    value
                }: {
                    value: {
                        nickName: string;
                        avatar: string;
                    };
                }) => (
                    <div className="grow shrink basis-0 self-stretch px-3 py-[15px] bg-white flex-col justify-center items-center inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <img
                                className="w-8 h-8 rounded-full"
                                src={value.avatar}
                            />
                            <div className="text-black text-base font-normal font-['Acme'] leading-tight">
                                {value.nickName}
                            </div>
                        </div>
                    </div>
                )
            },
            {
                Header: 'Level',
                accessor: (data) => ({
                    level: data.level,
                    exp: data.xp
                }),
                Cell: ({
                    value
                }: {
                    value: {
                        level: number;
                        exp: number;
                    };
                }) => (
                    <div className="grow shrink basis-0 self-stretch px-3 py-[15px] bg-white flex-col justify-center items-center inline-flex">
                        <div className="text-black text-base font-normal font-['Acme'] leading-tight">
                            {value.level}.{Math.floor((value.exp / 1200) * 10)}
                        </div>
                    </div>
                )
            },
            {
                Header: 'Completed games',
                accessor: (data) => ({
                    id: data.id
                }),
                Cell: ({
                    value
                }: {
                    value: {
                        id: string;
                    };
                }) => (
                    <a
                        href={`/profile/${value.id}/history`} // Replace 'value' with the actual dynamic value if necessary
                        target="_blank"
                        rel="noopener noreferrer" // This is for security and performance reasons
                        className="grow shrink basis-0 self-stretch px-3 py-[15px] bg-white flex-col justify-center items-center inline-flex"
                    >
                        <div className="justify-center items-center gap-[5px] inline-flex">
                            <div className="text-teal-600 text-base font-normal font-['Acme'] leading-tight">
                                details
                            </div>
                            <NewTabIcon />
                        </div>
                    </a>
                )
            },
            {
                Header: 'View',
                accessor: 'id',
                Cell: ({ value }) => (
                    <a
                        href={`/profile/${value}`} // Replace 'value' with the actual dynamic value if necessary
                        target="_blank"
                        rel="noopener noreferrer" // This is for security and performance reasons
                        className="grow shrink basis-0 self-stretch px-3 py-[15px] bg-white flex-col justify-center items-center inline-flex"
                    >
                        <div className="justify-center items-center gap-[5px] inline-flex">
                            <div className="text-teal-600 text-base font-normal font-['Acme'] leading-tight">
                                view
                            </div>
                            <NewTabIcon />
                        </div>
                    </a>
                )
            }
        ],
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/users/rank');
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="overflow-y-auto h-[470px] w-[1100px] bg-white  items-start justify-start mb-2 rounded-[20px] shadow  border border-stone-300">
            <Table
                columns={columns}
                data={data}
                styles={{
                    tableStyle:
                        'w-full  text-zinc-500 text-base font-normal font-["Acme"]',
                    theadStyle:
                        'sticky top-0 z-10 border-b border-neutral-100 bg-white ',
                    tbodyStyle: 'overflow-y-auto w-full ',
                    trStyle: '',
                    thStyle: 'px-3 py-[25px]',
                    tdStyle: 'p-2 text-center align-middle'
                }}
            />
        </div>
    );
}

{
    /* <div className="w-[229.20px] h-[71px] px-3 py-[25px] bg-white flex-col justify-center items-center inline-flex">
    <div className="text-zinc-500 text-base font-normal font-['Acme'] leading-tight">Player</div>
</div> */
}

export default LeaderBoard;
