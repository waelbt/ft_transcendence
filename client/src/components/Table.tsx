import { useTable, TableOptions } from 'react-table';
import { Column } from 'react-table';

type TableProps<D extends object> = {
    columns: Column<D>[];
    data: D[];
    HeaderStyle?: string;
    BodyStyle?: string;
};

const Table = <D extends object>({
    columns,
    data,
    HeaderStyle,
    BodyStyle
}: TableProps<D>): JSX.Element => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<D>({
            columns,
            data
        } as TableOptions<D>);

    return (
        <table {...getTableProps()}>
            <thead className={HeaderStyle ? HeaderStyle : ''}>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody
                className={BodyStyle ? BodyStyle : ''}
                {...getTableBodyProps()}
            >
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
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

export default Table;
