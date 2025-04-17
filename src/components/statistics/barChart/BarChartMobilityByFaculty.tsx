import React, { useState, useEffect } from "react";
import { fetchMobilityByFaculty } from "@/actions/statisticsAction";
import BarChart from "./BarChart";
import { ChartData, LoadingState } from "@/types/ChartTypes";
import ChartWrapper from "../chartWrapper";

export default function BarChartMobilityByFaculty() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMobilityByFaculty();
        if (response.faculty.length === 0 || response.output.length === 0 || response.input.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.faculty,
            datasets: [
              {
                label: "Salidas",
                data: response.output
              },
              {
                label: "Entradas",
                data: response.input
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
      {chartData && <BarChart 
      title="Movilidad por facultad" 
      xLabel="Facultades" 
      yLabel="Número de estudiantes/docentes en movilidad" 
      data={chartData} />}
    </ChartWrapper>
  );
};