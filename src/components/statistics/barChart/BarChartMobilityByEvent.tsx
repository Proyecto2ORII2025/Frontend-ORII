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
        display: false, // Oculta la leyenda
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Evento",
          color: "#333",
        },
      },
      y: {
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
      backgroundColor: string;
      borderWidth: number;
    }[];
}

export default function BarChartMobilityByEvent() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getStatistics.getMobilityByEvent();

            const data = {
                labels: response.data.agreementType,
                datasets: [
                    {
                        data: response.data.totalMobilityByAgreementsType,
                        backgroundColor: "#3182CE",
                        borderWidth: 1,
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
        <Bar data={chartData} options={options} />
        </div>
    );
}

