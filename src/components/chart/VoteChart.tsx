import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const VoteBarChart = (props: any) => {
    const [state, setState] = useState<string | null>(null);
    const [chartData, setChartData] = useState<Array<number> | []>([]);

    useEffect(() => {
        setState(props.state);
        setChartData(props.data);
    }, [props.state])

    const data = {
        labels: [
            'Votes',
            '(%)',
        ],
        datasets: [
            {
                label: state,
                data: chartData,
                barThickness: 10,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ]
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    return (
        <div style={{width: '220px'}}>
            <Bar data={data} options={options} />
        </div>
    )
}

export default VoteBarChart;