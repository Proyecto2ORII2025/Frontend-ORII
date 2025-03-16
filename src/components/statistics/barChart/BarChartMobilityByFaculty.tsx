import React, { useState, useEffect } from "react";
import { getStatistics } from "@/services/statistics.service";
import BarChart from "./BarChart";
import { ChartData } from "@/validations/ChartTypes";
import SkeletonBarChart from "@/components/ui/skeletonBarChart";
import ChartError from "@/components/ui/chartError";
import ChartNoFound from "@/components/ui/chartNoFound";

export default function BarChartMobilityByFaculty() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMovilityByFaculty();
        setChartData({
          labels: response.data.faculty,
          datasets: [
            {
              label: "Salidas",
              data: response.data.output
            },
            {
              label: "Entradas",
              data: response.data.input
            }
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

  if (loading) return <SkeletonBarChart />;
  if (error) return <ChartError />;
  if (!chartData) return <ChartNoFound />;

  return <BarChart xLabel="Facultades" yLabel="Número de estudiantes/docentes en movilidad" data={chartData} />;
};