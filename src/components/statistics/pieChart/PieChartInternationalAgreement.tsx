import React, { useEffect, useState } from "react";
import { fetchAgreementByCountry } from "@/actions/statisticsAction";
import PieChart from "./PieChart";
import { ChartData, LoadingState } from "@/types/ChartTypes";
import ChartWrapper from "../chartWrapper";

export default function PieChartInternationalAgreement() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAgreementByCountry();
        if (response.countries.length === 0 || response.totalAgreementsByCountry.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.countries,
            datasets: [
              {
                data: response.totalAgreementsByCountry,
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
      {chartData && <PieChart title="Convenios internacionales" data={chartData} />}
    </ChartWrapper>
  );
}