import React, { useEffect, useState } from "react";
import { getStatistics } from "@/services/statistics.service";
import PieChart from "./PieChart";
import { ChartData, LoadingState } from "@/validations/ChartTypes";
import ChartWrapper from "../chartWrapper";

export default function PieChartMobilityByEvent() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityByEvent();
        if (response.data.agreementType.length === 0 || response.data.totalMobilityByAgreementsType.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.data.agreementType,
            datasets: [
              {
                data: response.data.totalMobilityByAgreementsType,
              },
            ],
          });
          setState(LoadingState.SUCCESS);
        }

      } catch (err) {
        setState(LoadingState.ERROR);
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartWrapper state={state} chartType="pie">
      {chartData && <PieChart title="Distribución por tipos de evento" data={chartData} />}
    </ChartWrapper>
  );
}