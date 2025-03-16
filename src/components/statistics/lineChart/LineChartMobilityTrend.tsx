import React, { useState, useEffect } from "react";
import { getStatistics } from "@/services/statistics.service";
import LineChart from "./LineChart";
import { ChartData, LoadingState } from "@/validations/ChartTypes";
import ChartWrapper from "../chartWrapper";

export default function LineChartMobilityTrend() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityPerYear();
        if (response.data.years.length === 0 || response.data.amountMobility.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.data.years.reverse(),
            datasets: [
              {
                data: response.data.amountMobility.reverse()
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
    <ChartWrapper state={state} chartType="line">
      {chartData && <LineChart title="Tendencia de movilidad anual" xLabel="Año" yLabel="Número de movilidades" data={chartData} />}
    </ChartWrapper>
  );
}