import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const TwitterBarChart = (props: any) => {
    const [username, setUsername] = useState<string | null>(null);
    const [chartData, setChartData] = useState<Array<number> | []>([]);

    useEffect(() => {
        setUsername(props.username);
        setChartData(props.data);
    }, [props.username])

    const data = {
        labels: [
            'Followers',
            'Exclusive',
        ],
        datasets: [
            {
                label: username,
                data: chartData,
                barThickness: 10,
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
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

export default TwitterBarChart;