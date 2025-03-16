import React, { useState, useEffect } from "react";
import { getStatistics } from "@/services/statistics.service";
import LineChart from "./LineChart";
import { ChartData } from "@/validations/ChartTypes";
import SkeletonBarChart from "@/components/ui/skeletonBarChart";
import ChartError from "@/components/ui/chartError";
import ChartNoFound from "@/components/ui/chartNoFound";

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

  if (loading) return <SkeletonBarChart />;
  if (error) return <ChartError />;
  if (!chartData) return <ChartNoFound />;

  return <LineChart xLabel="Año" yLabel="Número de movilidades" data={chartData} />;
}