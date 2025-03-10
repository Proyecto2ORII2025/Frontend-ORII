import React, { useEffect, useState } from "react";
import { getStatistics } from "@/services/statistics.service";
import GenericBarChart from "./BarChartGeneric";
import { ChartData } from "../../../validations/ChartTypes";

export default function BarChartMobilityByFaculty() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMovilityByFaculty();
        const data = {
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

  return <GenericBarChart data={chartData} titleX="Facultades" titleY="Número de estudiantes/docentes en movilidad" />;
}
