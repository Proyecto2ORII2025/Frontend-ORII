import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  scales,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartProps } from "@/validations/ChartTypes";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, scales );

const LineChart: React.FC<ChartProps> = ({ xLabel, yLabel, data }) => {

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, 
        },
      },
      scales: {
        x: {
          title: {
            display: !!xLabel,
            text: xLabel,
            color: "#333",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: !!yLabel,
            text: yLabel,
            color: "#333",
          },
        },
      },
    };

    const chartData: ChartData<"line"> = {
        labels: data.labels,
        datasets: data.datasets.map((dataset, _) => ({
            ...dataset,
            borderColor: "#9D0311",
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#9D0311",
            pointBorderWidth: 2,
            pointRadius: 2.5,
        })),
      };

    return (
        <div className="w mx-5 h-4/5">
          <Line data={chartData} options={options} />
        </div>
      );
}

export default LineChart;



