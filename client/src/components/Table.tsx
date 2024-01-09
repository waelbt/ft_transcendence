import { useTable, TableOptions, Column } from 'react-table';

interface TableStyles {
    tableStyle?: string;
    theadStyle?: string;
    tbodyStyle?: string;
    trStyle?: string;
    thStyle?: string;
    tdStyle?: string;
}

type TableProps<D extends object> = {
    columns: Column<D>[];
    data: D[];
    styles?: TableStyles;
};

const Table = <D extends object>({
    columns,
    data,
    styles = {}
}: TableProps<D>): JSX.Element => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<D>({
            columns,
            data
        } as TableOptions<D>);

    return (
        <table
            {...getTableProps()}
            className={`tableScroll ${styles.tableStyle || ''}`}
        >
            <thead className={styles.theadStyle || ''}>
                {headerGroups.map((headerGroup) => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        className={styles.trStyle || ''}
                    >
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                className={styles.thStyle || ''}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className={styles.tbodyStyle || ''}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            className={styles.trStyle || ''}
                        >
                            {row.cells.map((cell) => (
                                <td
                                    {...cell.getCellProps()}
                                    className={styles.tdStyle || ''}
                                >
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
