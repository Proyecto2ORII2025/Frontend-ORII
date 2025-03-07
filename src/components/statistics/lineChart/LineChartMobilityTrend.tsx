import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getStatistics } from "@/services/statistics.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales
);

const options = {
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
        display: true,
        text: "Año",
        color: "#333",
      },
    },
    y: {
      //max: 10,
      beginAtZero: true,
      title: {
        display: true,
        text: "Número de movilidades",
        color: "#333",
      },
    },
  },
};

interface ChartData {
    labels: string[];
    datasets: {
      data: number[];
      borderColor: string;
      pointBackgroundColor: string;
      pointBorderColor: string;
      pointBorderWidth: number;
      pointRadius: number;
    }[];
}

export default function LineChartMobilityTrend() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityPerYear();

        const data = {
            labels: response.data.years.reverse(),
            datasets: [
              {
                label: '',
                data: response.data.amountMobility.reverse(),
                borderColor: "#9D0311",
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#9D0311",
                pointBorderWidth: 2,
                pointRadius: 2.5,
              },
            ],
          };

        setChartData(data);
      } catch (error) {
        setError("Ocurrió un error al cargar los datos");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!chartData) return <div>No hay datos disponibles</div>;

  return (
    <div className="w mx-5 h-4/5">
      <Line data={chartData} options={options} />
    </div>
  );
}