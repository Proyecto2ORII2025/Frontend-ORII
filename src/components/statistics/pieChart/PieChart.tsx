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
import { ChartProps } from "@/validations/ChartTypes";
import { getDistinctColors } from "../chartColors";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<ChartProps> = ({ data }) => {

    const backgroundColors =
        data.datasets.length > 1
            ? getDistinctColors(data.datasets.length)
            : getDistinctColors(data.labels.length);

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right" as const
            }
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
        <div className="w-full h-full px-12">
          <div className="h-4/5">
            <Pie data={chartData} options={options} />
          </div>
        </div>
      );
}

export default PieChart;