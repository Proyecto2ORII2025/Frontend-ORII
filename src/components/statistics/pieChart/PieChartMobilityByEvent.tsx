import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getStatistics } from "@/services/statistics.service";

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
    },
    tooltip: {
      enabled: true,
    },
  },
  layout: {
    padding: 10,
  },
};

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
  }[];
}

export default function PieChartMobilityByEvent() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityByEvent();
        const data: ChartData = {
          labels: response.data.agreementType,
          datasets: [
            {
              data: response.data.totalMobilityByAgreementsType,
              backgroundColor: ["#1D72D3", "#9D0311", "#F8AE15", "#249300", "#C8C5D0"],
              hoverOffset: 10,
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
    <div className="w-full h-[calc(100%-40px)] p-5">
      <div className="h-full">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}