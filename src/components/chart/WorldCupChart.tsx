import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const WorldCupBarChart = (props: any) => {
    const [country, setCountry] = useState<string | null>(null);
    const [chartData, setChartData] = useState<Array<number> | []>([]);

    useEffect(() => {
        setCountry(props.country);
        setChartData(props.data);
    }, [props.country])

    const data = {
        labels: [
            'R-16',
            'Q-Final',
            'Semi',
            'Winner',
        ],
        datasets: [
            {
                label: country,
                data: chartData,
                barThickness: 10,
                backgroundColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ]
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [{
                display: false
            }]
        },
    }

    return (
        <div style={{width: '220px'}}>
            <Bar data={data} options={options} />
        </div>
    )
}

export default WorldCupBarChart;