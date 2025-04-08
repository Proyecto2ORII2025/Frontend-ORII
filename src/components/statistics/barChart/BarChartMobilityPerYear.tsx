import React, { useState, useEffect } from "react";
import { fetchMobilityPerYear } from "@/actions/statisticsAction";
import BarChart from "./BarChart";
import { ChartData, LoadingState } from "@/types/chartTypes";
import ChartWrapper from "../chartWrapper";

export default function BarChartMobilityPerYear() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMobilityPerYear();
        if (response.years.length === 0 || response.amountMobility.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.years.reverse(),
            datasets: [
              {
                data: response.amountMobility.reverse()
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
    <ChartWrapper state={state} chartType="bar">
      {chartData && <BarChart title="Movilidades por año" xLabel="Años" yLabel="Número de movilidades" data={chartData} />}
    </ChartWrapper>
  );
}
