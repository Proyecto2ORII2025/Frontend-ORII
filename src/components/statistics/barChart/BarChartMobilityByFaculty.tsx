import React, { useState, useEffect } from "react";
import { getStatistics } from "@/services/statistics.service";
import BarChart from "./BarChart";
import { ChartData, LoadingState } from "@/validations/ChartTypes";
import ChartWrapper from "../chartWrapper";

export default function BarChartMobilityByFaculty() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMovilityByFaculty();
        if (response.data.faculty.length === 0 || response.data.output.length === 0 || response.data.input.length === 0) {
          setState(LoadingState.NO_DATA);
        } else {
          setChartData({
            labels: response.data.faculty,
            datasets: [
              {
                label: "Salidas",
                data: response.data.output
              },
              {
                label: "Entradas",
                data: response.data.input
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
      {chartData && <BarChart title="Movilidad por facultad" xLabel="Facultades" yLabel="Número de estudiantes/docentes en movilidad" data={chartData} />}
    </ChartWrapper>
  );
};