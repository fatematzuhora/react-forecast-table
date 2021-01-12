import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { VoteBarChart } from 'components';
import { data } from 'data/vote.json';

function VoteTable() {
    const [state, setState] = useState<string | null>('');
    const [chartData, setChartData] = useState<Array<number> | []>([]);

    const columns: any = React.useMemo(
        () => [
            {
                Header: 'STATE',
                accessor: 'state',
            },
            {
                Header: 'VOTES',
                accessor: 'votes'
            },
            {
                Header: 'PERCENTAGE',
                accessor: 'perc'
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
            <table {...getTableProps()} className="vote-table">
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

                <tbody {...getTableBodyProps()} className="vote-table__body">
                    {rows.map((row: any) => {
                        prepareRow(row)
                        return (
                            <tr
                                {...row.getRowProps()}
                                onMouseOver={() => {
                                    let stateData = row.values;
                                    let arr: any[] = [
                                        (stateData.votes / 100),
                                        (stateData.perc * 100),
                                    ];
                                    
                                    setState(stateData.state);
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

            <div className="left-chart vote">
                <VoteBarChart data={chartData} state={state} />
            </div>
        </>
    )
}

export default VoteTable;