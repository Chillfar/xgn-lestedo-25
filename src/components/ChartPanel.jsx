import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartPanel = ({ scores }) => {
    const data = {
        labels: scores.map((score, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: 'Score Evolution',
                data: scores,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Score Evolution</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartPanel;