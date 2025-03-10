import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartData } from "../../../validations/ChartTypes";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface GenericBarChartProps {
    data: ChartData;
    titleX: string;
    titleY: string;
}

export default function GenericBarChart({ data, titleX, titleY }: GenericBarChartProps) {
    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: data.datasets.length > 1, // Mostrar leyenda solo si hay varias series
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: titleX,
                    color: "#333",
                },
            },
            y: {
                title: {
                    display: true,
                    text: titleY,
                    color: "#333",
                },
            },
        },
    };

    return (
        <div className="w mx-5 h-4/5">
            <Bar data={data} options={options} />
        </div>
    );
}
