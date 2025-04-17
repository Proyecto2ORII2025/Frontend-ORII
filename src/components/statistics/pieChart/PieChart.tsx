import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { ChartProps } from "@/types/ChartTypes";
import { getDistinctColors } from "../chartColors";
import CustomLegend from "../customLegend";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<ChartProps> = ({ title, data }) => {

    const backgroundColors =
        data.datasets.length > 1
            ? getDistinctColors(data.datasets.length)
            : getDistinctColors(data.labels.length);

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: "right" as const,
                fullSize: false,
                labels: {
                    boxWidth: 18, 
                    font: {
                        size: 12, 
                    }
                }
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 18,
                    weight: "bold"
                },
                color: "#000066",
                padding: {
                    bottom: 10 // Aumenta el espacio entre el título y la leyenda
                }
            },
        },
        layout: {
            padding: 25,
        },
    };

    const chartData: ChartData<'pie'> = {
        labels: data.labels,
        datasets: data.datasets.map((dataset, i) => ({
            ...dataset,
            backgroundColor: data.datasets.length > 1 ? backgroundColors[i] : backgroundColors,
            hoverOffset: 17,
        })),
    };

    return (
        <div className="h-5/6 mx-5 mt-4">
            <Pie data={chartData} options={options} />
            <CustomLegend
                labels={data.labels}
                backgroundColors={backgroundColors}
            />
        </div>
    );
}

export default PieChart;