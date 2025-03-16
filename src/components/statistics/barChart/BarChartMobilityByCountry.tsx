import React, { useState, useEffect } from "react";
import { getStatistics } from "@/services/statistics.service";
import BarChart from "./BarChart";
import { ChartData, LoadingState } from "@/validations/ChartTypes";
import ChartWrapper from "../chartWrapper";

export default function BarChartMobilityByCountry() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityByCountry();
        if (response.data.country.length === 0 || response.data.mobilities.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.data.country,
            datasets: [
              {
                data: response.data.mobilities,
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
      {chartData && <BarChart title="Movilidad por paises" xLabel="Países" yLabel="Número de movilidades" data={chartData} />}
    </ChartWrapper>
  );
}