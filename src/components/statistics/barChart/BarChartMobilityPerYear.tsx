import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getStatistics } from "@/services/statistics.service";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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
        text: "Años",
        color: "#333",
      },
    },
    y: {
      //max: 25,
      title: {
        display: true,
        text: "Número de movilidades",
        color: "#666",
      },
    },
  },
};

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
    barPercentage: number;
  }[];
}

export default function BarChartMobilityPerYear() {
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
              label: 'Movilidades',
              data: response.data.amountMobility.reverse(),
              backgroundColor: "#8CBB22",
              borderWidth: 1,
              barPercentage: 0.5,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        setError("Error al cargar los datos");
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
      <Bar data={chartData} options={options} />
    </div>
  );
}