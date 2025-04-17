import React, { useState, useEffect } from "react";
import { fetchMobilityByCountry } from "@/actions/statisticsAction";
import BarChart from "./BarChart";
import { ChartData, LoadingState } from "@/types/ChartTypes";
import ChartWrapper from "../chartWrapper";

export default function BarChartMobilityByCountry() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMobilityByCountry();
        if (response.country.length === 0 || response.mobilities.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.country,
            datasets: [
              {
                data: response.mobilities,
              }
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
      {chartData && <BarChart title="Movilidad por países" xLabel="Países" yLabel="Número de movilidades" data={chartData} />}
    </ChartWrapper>
  );
}