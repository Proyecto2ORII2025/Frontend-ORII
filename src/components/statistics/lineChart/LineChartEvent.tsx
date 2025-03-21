import React, { useState, useEffect } from "react";
import { fetchMobilityByEvent } from "@/actions/statisticsAction";
import LineChart from "./LineChart";
import { ChartData, LoadingState } from "@/types/ChartTypes";
import ChartWrapper from "../chartWrapper";

export default function LineChartEvent() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMobilityByEvent();
                if (response.agreementType.length === 0 || response.totalMobilityByAgreementsType.length === 0) {
                    setState(LoadingState.NO_DATA);
                } else {
                    setChartData({
                        labels: response.agreementType,
                        datasets: [
                            {
                                data: response.totalMobilityByAgreementsType,
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
        <ChartWrapper state={state} chartType="line">
            {chartData && <LineChart title="Tendencia de eventos" xLabel="Evento" yLabel="Número de eventos" data={chartData} />}
        </ChartWrapper>
    );
}