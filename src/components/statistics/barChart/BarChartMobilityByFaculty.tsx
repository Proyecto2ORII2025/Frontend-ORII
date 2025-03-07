import React, { useEffect, useState } from "react";
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
import { getStatistics } from "@/services/statistics.service";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const createOptions = (labels: string[]): ChartOptions<'bar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Facultades",
        color: "#333",
      },
      ticks: {
        callback: function (tickValue: string | number, index: number): string {
          const label = labels[index];
          return label.length > 20 ? label.substring(0, 23) + "..." : label;
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Número de estudiantes/docentes en movilidad",
        color: "#333",
      },
    },
  },
});

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export default function BarChartMobilityByFaculty() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMovilityByFaculty();
        console.log(response.data.faculty);
        const data: ChartData = {
          labels: response.data.faculty,
          datasets: [
            {
              label: "Salidas",
              data: response.data.output,
              backgroundColor: "#000066",
              borderColor: "#000066",
              borderWidth: 1,
            },
            {
              label: "Entradas",
              data: response.data.input,
              backgroundColor: "#9D0311",
              borderColor: "#9D0311",
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error("Error:", err);
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
      <Bar data={chartData} options={createOptions(chartData.labels)} />
    </div>
  );
}