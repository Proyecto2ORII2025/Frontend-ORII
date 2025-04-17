import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartProps } from "@/types/ChartTypes";
import { getDistinctColors } from "../chartColors";
import CustomLegend from "../customLegend";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart: React.FC<ChartProps> = ({ title, xLabel, yLabel, data }) => {
    const backgroundColors =
        data.datasets.length > 1
            ? getDistinctColors(data.datasets.length)
            : getDistinctColors(data.labels.length);

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 18,
                    weight: "bold"
                },
                color: "#000066"
            },
            legend: {
                display: data.datasets.length > 1, // Mostrar leyenda solo si hay varias series
                //display: false
            },
        },
        scales: {
            x: {
                title: {
                    display: !!xLabel,
                    text: xLabel,
                    color: "#333",
                },
                type: "category",
                ticks: {
                    display: title === "Movilidad por facultad",
                    callback: function (value) {
                        const label = this.getLabelForValue(Number(value));
                        const chartWidth = this.chart.width;
                        const maxLabelLength = Math.floor(chartWidth / data.labels.length / 10);
                        return label.length > maxLabelLength ? label.substring(0, maxLabelLength) + "..." : label;
                    },
                },
            },
            y: {
                title: {
                    display: !!yLabel,
                    text: yLabel,
                    color: "#333",
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1, // Asegura que los valores sean incrementos de 1
                    callback: function (value) {
                        return Number(value).toFixed(0);
                    },
                },
            },
        },
    };

    const chartData: ChartData<"bar"> = {
        labels: data.labels,
        datasets: data.datasets.map((dataset, i) => ({
            ...dataset,
            backgroundColor: data.datasets.length > 1 ? backgroundColors[i] : backgroundColors,
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
        })),
    };

    return (
        options.scales?.x?.ticks?.display === false ? (
            <div className="mx-5 h-5/6">
                <Bar data={chartData} options={options} />
                <CustomLegend labels={data.labels} backgroundColors={backgroundColors} />
            </div>
        ) : (
            <div className="mx-5 h-full">
                <Bar data={chartData} options={options} />
            </div>
        )
    );

};

export default BarChart;
