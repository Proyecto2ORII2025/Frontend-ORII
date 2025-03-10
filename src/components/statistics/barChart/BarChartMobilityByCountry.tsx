import React, { useEffect, useState } from "react";
import { getStatistics } from "@/services/statistics.service";
import GenericBarChart from "./BarChartGeneric";
import { ChartData } from "../../../validations/ChartTypes";

export default function BarChartMobilityByCountry() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityByCountry();
        const data = {
          labels: response.data.country,
          datasets: [
            {
              data: response.data.mobilities,
              backgroundColor: "#04B2B5",
              borderWidth: 1,
              barPercentage: 0.5,
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

  return <GenericBarChart data={chartData} titleX="Países" titleY="Número de movilidades" />;
}
