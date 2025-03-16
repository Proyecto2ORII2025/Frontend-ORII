import React, { useState, useEffect } from "react";
import { getStatistics } from "@/services/statistics.service";
import BarChart from "./BarChart";
import { ChartData } from "@/validations/ChartTypes";
import SkeletonBarChart from "@/components/ui/skeletonBarChart";
import ChartError from "@/components/ui/chartError";
import ChartNoFound from "@/components/ui/chartNoFound";

export default function BarChartMobilityByCountry() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityByCountry();
        setChartData({
          labels: response.data.country,
          datasets: [
            {
              data: response.data.mobilities,
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

  return <BarChart xLabel="Países" yLabel="Número de movilidades" data={chartData} />;
}
