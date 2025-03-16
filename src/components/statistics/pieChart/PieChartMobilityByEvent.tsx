import React, { useEffect, useState } from "react";
import { getStatistics } from "@/services/statistics.service";
import PieChart from "./PieChart";
import { ChartData } from "@/validations/ChartTypes";
import SkeletonPieChart from "@/components/ui/SkeletonPieChart";
import ChartError from "@/components/ui/chartError";
import ChartNoFound from "@/components/ui/chartNoFound";

export default function PieChartMobilityByEvent() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityByEvent();
        setChartData({
          labels: response.data.agreementType,
          datasets: [
            {
              data: response.data.totalMobilityByAgreementsType,
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

  if (loading) return <SkeletonPieChart />;
  if (error) return <ChartError />;
  if (!chartData) return <ChartNoFound />;

  return <PieChart data={chartData} />;
}