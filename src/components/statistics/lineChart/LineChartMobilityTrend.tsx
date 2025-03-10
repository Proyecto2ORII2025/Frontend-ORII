import React, { useState, useEffect } from "react";
import { getStatistics } from "@/services/statistics.service";
import LineChart from "./LineChart";
import { ChartData } from "@/validations/ChartTypes";

export default function LineChartMobilityTrend() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityPerYear();
        setChartData({
            labels: response.data.years.reverse(),
            datasets: [
              {
                data: response.data.amountMobility.reverse()
              },
            ],
          });
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

  return <LineChart xLabel="Año" yLabel="Número de movilidades" data={chartData} />;
}