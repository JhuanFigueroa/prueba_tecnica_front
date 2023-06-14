import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Chart, Line} from 'react-chartjs-2'
import {Card} from "@material-tailwind/react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const LineChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.date), // Array de fechas
        datasets: [
            {
                label: 'Encendido',
                data: data.map(item => item.encendido), // Array de veces encendido
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'Apagado',
                data: data.map(item => item.apagado), // Array de veces apagado
                borderColor: 'red',
                fill: false,
            },
        ],
    };

    return (
        <Card className='grid grid-cols-cont w-full mb-10'>
            <Line data={chartData} className='col-start-2' />
        </Card>
    );
};

export default LineChart;
