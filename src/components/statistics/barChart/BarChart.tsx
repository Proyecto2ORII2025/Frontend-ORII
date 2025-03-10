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
import { ChartProps } from "@/validations/ChartTypes";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const COLORS = ["#000066", "#9D0311"]; // Agregar mas colores

const BarChart: React.FC<ChartProps> = ({ xLabel, yLabel, data }) => {

    const backgroundColors =
    data.datasets.length > 1
            ? data.datasets.map((_, i) => COLORS[i % COLORS.length])
            : data.labels.map((_, i) => COLORS[i % COLORS.length]);

    const options: ChartOptions<"bar"> = {
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
                     display: !!xLabel, 
                     text: xLabel,
                     color: "#333",
                    }, 
                    type: "category" 
                },
                //TODO: Implementar truncado de etiquetas
                /*ticks: {
                    callback: function (value, index, ticks) {
                      const label = this.getLabelForValue(value);
                      return label.length > 15 ? label.substring(12, 24) + "..." : label;
                    },
                },*/
            y: { 
                title: {
                     display: !!yLabel,
                     text: yLabel,
                     color: "#333",
                    }, 
                    beginAtZero: true 
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
        <div className="w mx-5 h-4/5"> 
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
