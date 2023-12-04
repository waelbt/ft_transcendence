import { useTable, TableOptions } from 'react-table';
import { Column } from '../../../shared/types';

type TableProps<D extends object> = {
    columns: Column<D>[];
    data: D[];
};

const MatchTable = <D extends object>({
    columns,
    data
}: TableProps<D>): JSX.Element => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<D>({
            columns,
            data
        } as TableOptions<D>);
    <div className="w-[930px] h-[55.50px] justify-center items-center inline-flex">
        <div className="grow shrink basis-0 self-stretch px-3 py-2.5 bg-neutral-100 justify-center items-center flex">
            <div className="w-[41px] text-zinc-500 text-sm font-normal font-['Acme'] leading-[18.20px]">
                Players
            </div>
        </div>
        <div className="w-[107px] self-stretch px-3 py-2.5 bg-neutral-100 justify-center items-center flex">
            <div className="w-[39px] text-zinc-500 text-xs font-semibold font-['Inter'] leading-none">
                Result
            </div>
        </div>
        <div className="w-[119px] self-stretch px-3 py-2.5 bg-neutral-100 justify-center items-center flex">
            <div className="w-[54px] text-zinc-500 text-xs font-semibold font-['Inter'] leading-none">
                Awarded
            </div>
        </div>
        <div className="grow shrink basis-0 self-stretch px-3 py-2.5 bg-neutral-100 justify-center items-center flex">
            <div className="w-[29px] text-zinc-500 text-xs font-semibold font-['Inter'] leading-none">
                Date
            </div>
        </div>
    </div>;
    return (
        <table className="border border-black" {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr
                        className=" bg-neutral-100 "
                        {...headerGroup.getHeaderGroupProps()}
                    >
                        {headerGroup.headers.map((column) => (
                            <th
                                className="text-zinc-500 text-sm font-normal font-['Acme'] leading-5"
                                {...column.getHeaderProps()}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            className="border border-black"
                        >
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default MatchTable;
