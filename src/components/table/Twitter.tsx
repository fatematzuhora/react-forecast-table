import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { data } from 'data/twitter.json';

const horizontalBarData = {
    labels: ['s'],
    datasets: [
        {
            backgroundColor: 'rgba(255,99,132,0.2)',
            data: [10]
        }
    ]
};

function TwitterTable() {
    const [country, setCountry] = useState<string | null>('');
    const [chartData, setChartData] = useState<Array<number> | []>([]);

    const columns: any = React.useMemo(
        () => [
            {
                Header: 'ACCOUNT',
                accessor: 'account',
                Cell: (props: any) => `@${props.value}`,
            },
            {
                Header: 'FOLLOWERS',
                accessor: 'followers',
                Cell: (props: any) => {
                    const pct = (props.value / 100000).toFixed(1);
                    return (
                        <div className="bar-cell">
                            <span className="number">{props.value}</span>
                            <div className="bar-chart" style={{ backgroundColor: '#e1e1e1' }}>
                                <div className="bar" style={{ width: `${pct}px`, backgroundColor: '#3fc1c9' }}></div>
                            </div>
                        </div>
                    )
                }
            },
            {
                Header: 'EXCLUSIVE FOLLOWERS',
                accessor: 'exclusive_followers_pct',
                Cell: (props: any) => {
                    const pct = (props.value * 100).toFixed(1);
                    return (
                        <div className="bar-cell">
                            <span className="number">{props.value}</span>
                            <div className="bar-chart" style={{ backgroundColor: '#e1e1e1' }}>
                                <div className="bar" style={{ width: `${pct}px`, backgroundColor: '#fc5185' }}></div>
                            </div>
                        </div>
                    )
                }
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        { columns, data },
        useSortBy
    )

    return (
        <>
            <table {...getTableProps()} className="twitter-table">
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="col-header"
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? "↑" : "↓") : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()} className="twitter-table__body">
                    {rows.map((row: any) => {
                        prepareRow(row)
                        return (
                            <tr
                                {...row.getRowProps()}
                                onMouseOver={() => {
                                    
                                }}
                            >
                                {row.cells.map((cell: any) => {
                                    return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>

            <div className="left-chart twitter">
            </div>
        </>
    )
}

export default TwitterTable;