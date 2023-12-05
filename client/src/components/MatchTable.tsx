import { useTable, TableOptions } from 'react-table';
import { Column } from 'react-table';

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

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr
                        className=" bg-[#F5F5F5]"
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
