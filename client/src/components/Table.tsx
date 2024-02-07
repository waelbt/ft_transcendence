import { useTable, TableOptions, Column, Row } from 'react-table';

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
    styles = {},
    getRowProps = () => ({}) // Default to no-op function if not provided
}: TableProps<D> & {
    getRowProps?: (row: Row<D>) => object;
}): JSX.Element => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<D>({
            columns,
            data
        } as TableOptions<D>);

    return (
        // <div className='"max-h-[300px] overflow-y-auto"'>
        <table {...getTableProps()} className={` ${styles.tableStyle || ''}`}>
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
                            {...getRowProps(row)}
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
        // </div>
    );
};

export default Table;
