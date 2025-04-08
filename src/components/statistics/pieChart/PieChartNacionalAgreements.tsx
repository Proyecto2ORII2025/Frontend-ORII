import React, { useEffect, useState } from "react";
import { fetchAgreementByRegion } from "@/actions/statisticsAction";
import PieChart from "./PieChart";
import { ChartData, LoadingState } from "@/types/chartTypes";
import ChartWrapper from "../chartWrapper";

export default function PieChartNationalAgreement() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAgreementByRegion();
        if (response.region.length === 0 || response.totalAgreementsByRegion.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.region,
            datasets: [
              {
                data: response.totalAgreementsByRegion,
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
      {chartData && <PieChart title="Convenios nacionales" data={chartData} />}
    </ChartWrapper>
  );
}