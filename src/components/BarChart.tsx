import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


const BarChart = (props: any) => {
    const [country, setCountry] = useState<string | null>(null);
    const [chartData, setChartData] = useState<Array<number> | []>([]);

    useEffect(() => {
        setCountry(props.country);
        setChartData(props.data);
    }, [props.country])

    const data = {
        labels: [
            'Round 16',
            'Quarter Final',
            'Semi Final',
            'Final',
            'Winner'
        ],
        datasets: [
            {
                label: country,
                data: chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
      
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return (
        <div style={{width: '400px'}}>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart;