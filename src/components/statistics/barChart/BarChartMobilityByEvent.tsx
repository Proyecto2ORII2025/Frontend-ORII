import React, { useEffect, useState } from "react";
import { getStatistics } from "@/services/statistics.service";
import GenericBarChart from "./BarChartGeneric";
import { ChartData } from "../../../validations/ChartTypes";

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

  return <GenericBarChart data={chartData} titleX="Evento" titleY="Número de movilidades" />;
}