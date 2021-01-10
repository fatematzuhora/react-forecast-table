import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { data } from 'data/worldcup.json';
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

function WorldCupTable() {
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
                        Cell: (props: any) => {
                            return (
                                <div
                                    style={{backgroundColor: `rgb(68, 171, 67, ${Math.round(props.value)/10})`}}
                                    className="spi_rating"
                                >
                                    <span className="spi_rating-content">
                                        {Math.round(props.value * 10) / 10}
                                    </span>
                                </div>
                            )
                        }
                    },
                    {
                        Header: 'DEF.',
                        accessor: 'global_d',
                        Cell: (props: any) => {
                            return (
                                <div
                                    style={{backgroundColor: `rgb(255, 39, 0, ${props.value})`}}
                                    className="spi_rating"
                                >
                                    <span className="spi_rating-content">
                                        {Math.round(props.value * 10) / 10}
                                    </span>
                                </div>
                            )
                        }
                    },
                ],
            },
            {
                Header: 'KNOCKOUT STAGE CHANCES',
                columns: [
                    {
                        Header: 'MAKE ROUND 16',
                        accessor: 'make_round_of_16',
                        Cell: (props: any) => {
                            return (
                                <div
                                    style={{backgroundColor: `rgb(54, 176, 171, ${props.value})`}}
                                    className="round_16"
                                >
                                    {round16(props.value)}
                                </div>
                            )
                        }
                    },
                    {
                        Header: 'MAKE QTR - FINALS',
                        accessor: 'make_quarters',
                        Cell: (props: any) => {
                            return (
                                <div
                                    style={{backgroundColor: `rgb(169, 221, 174, ${props.value})`}}
                                    className="round_16"
                                >
                                    {toPercentage(props.value)}
                                </div>
                            )
                        }
                    },
                    {
                        Header: 'MAKE SEMIFINALS',
                        accessor: 'make_semis',
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
            <table {...getTableProps()} className="worldcup-table">
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

                <tbody {...getTableBodyProps()} className="worldcup-table__body">
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
        
            <div className="left-chart worldcup">
                
            </div>
        </>
    )
}

export default WorldCupTable;