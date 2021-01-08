import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import BarChart from 'components/BarChart';
import { data } from 'data/forecasts.json';
import './table.scss';

const toPercentage = (num: number) => {
    let round = (num * 1000) / 10;

    if (round > 99) {
        return `>${Math.floor(round)}%`;
    } else if (round < 1) {
        if (round === 0) {
            return `-`;
        } else {
            return `<${Math.ceil(round)}%`;
        }
    } else {
        return `${Math.round(round)}%`;
    }
}

const round16 = (num: number) => {
    let round: number;

    if (num === 1) {
        round = num;
    } else {
        round = (num * 1000) / 10;
    }

    if (round > 99) {
        return `>${Math.floor(round)}%`;
    } else if (round === 1) {
        return `✓`;
    } else if (round < 1) {
        if (round === 0) {
            return `-`;
        } else {
            return `<${Math.ceil(round)}%`;
        }
    } else {
        return `${Math.round(round)}%`;
    }
}

function Table() {
    const [country, setCountry] = useState<string | null>('');
    const [chartData, setChartData] = useState<Array<number> | []>([]);
    
    const columns: any = React.useMemo(
        () => [
            {
                Header: ' ',
                style: {
                    borderBottom: '1px solid #e6e6e6',
                    backgroundColor: 'red'
                },
                columns: [
                    {
                        Header: 'TEAM',
                        accessor: 'team',
                    },
                    {
                        Header: '',
                        accessor: 'points',
                        Cell: (props: any) => `${props.value}pts.`
                    },
                    {
                        Header: 'GROUP',
                        accessor: 'group',
                    },
                ],
            },
            {
                Header: 'TEAM RATING',
                columns: [
                    {
                        Header: 'SPI',
                        accessor: 'spi',
                        Cell: (props: any) => `${Math.round(props.value * 10) / 10}`,
                    },
                    {
                        Header: 'OFF.',
                        accessor: 'global_o',
                        Cell: (props: any) => `${Math.round(props.value * 10) / 10}`,
                    },
                    {
                        Header: 'DEF.',
                        accessor: 'global_d',
                        Cell: (props: any) => `${Math.round(props.value * 10) / 10}`,
                    },
                ],
            },
            {
                Header: 'AVG. SIMULATED SEASON',
                columns: [
                    {
                        Header: '1ST PLACE',
                        accessor: 'group_1',
                        Cell: (props: any) => toPercentage(props.value),
                    },
                    {
                        Header: '2ND PLACE',
                        accessor: 'group_2',
                        Cell: (props: any) => toPercentage(props.value),
                    },
                    {
                        Header: '3RD PLACE',
                        accessor: 'group_3',
                        Cell: (props: any) => toPercentage(props.value),
                    },
                ],
            },
            {
                Header: 'KNOCKOUT STAGE CHANCES',
                columns: [
                    {
                        Header: 'MAKE ROUND OF 16',
                        accessor: 'make_round_of_16',
                        Cell: (props: any) => round16(props.value)
                    },
                    {
                        Header: 'MAKE QTR-FINALS',
                        accessor: 'make_quarters',
                        Cell: (props: any) => toPercentage(props.value)
                    },
                    {
                        Header: 'MAKE SEMIFINALS',
                        accessor: 'make_semis',
                        Cell: (props: any) => toPercentage(props.value),
                    },
                    {
                        Header: 'MAKE FINAL',
                        accessor: 'make_final',
                        Cell: (props: any) => toPercentage(props.value),
                    },
                    {
                        Header: 'WIN WORLD CUP',
                        accessor: 'win_league',
                        Cell: (props: any) => toPercentage(props.value),
                    },
                ],
            }
        ],
        []
    )

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
            <table {...getTableProps()}>
                <thead className="">
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="col-header"
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()} className="forecast-table__body">
                    {rows.map((row: any) => {
                        prepareRow(row)
                        return (
                            <tr
                                {...row.getRowProps()}
                                onMouseOver={() => {
                                    let teamData = row.values;
                                    let arr: any[] = [
                                        teamData.make_round_of_16,
                                        teamData.make_quarters,
                                        teamData.make_semis,
                                        teamData.make_final,
                                        teamData.win_league,
                                    ];
                                    
                                    setCountry(teamData.team);
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
        
            <BarChart
                country={country}
                data={chartData}
            />
        </>
    )
}

export default Table;