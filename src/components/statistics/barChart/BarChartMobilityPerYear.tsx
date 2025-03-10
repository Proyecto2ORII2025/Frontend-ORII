import React, { useEffect, useState } from "react";
import GenericBarChart from "./BarChartGeneric";
import { getStatistics } from "@/services/statistics.service";
import { ChartData } from "../../../validations/ChartTypes";

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
              label: "Movilidades",
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
    <GenericBarChart
      data={chartData}
      titleX="Años"
      titleY="Número de movilidades"
    />
  );
}
