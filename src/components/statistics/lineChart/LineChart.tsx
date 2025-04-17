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
import { ChartProps } from "@/types/ChartTypes";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, scales);

const LineChart: React.FC<ChartProps> = ({ title, xLabel, yLabel, data }) => {

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: "bold"
        },
        color: "#000066"
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
          callback: function (value) {
            const label = this.getLabelForValue(Number(value));
            const chartWidth = this.chart.width;
            const maxLabelLength = Math.floor(chartWidth / data.labels.length / 10);
            return label.length > maxLabelLength ? label.substring(0, maxLabelLength) + "..." : label;
          },
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
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      borderColor: "#4C19AF",
      pointBackgroundColor: "#ffffff",
      pointBorderColor: "#4C19AF",
      pointBorderWidth: 2,
      pointRadius: 2.5,
    })),
  };

  return (
    <div className="mx-5 h-full">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart;



