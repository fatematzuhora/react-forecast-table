import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { TwitterBarChart } from 'components';
import { data } from 'data/twitter.json';

function TwitterTable() {
    const [username, setUsername] = useState<string | null>('');
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
                                    let userData = row.values;
                                    let arr: any[] = [
                                        (userData.followers / 1000),
                                        (userData.exclusive_followers_pct * 1000),
                                    ];
                                    
                                    setUsername(userData.account);
                                    setChartData(arr);
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
                <TwitterBarChart data={chartData} username={username} />
            </div>
        </>
    )
}

export default TwitterTable;