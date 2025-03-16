"use client";

import Title from "@/components/ui/title";
import Chart from "@/components/statistics/chart";
import BarChartMobilityByFaculty from "@/components/statistics/barChart/BarChartMobilityByFaculty";
import BarChartMobilityByCountry from "@/components/statistics/barChart/BarChartMobilityByCountry";
import BarChartMobilitiesPerYear from "@/components/statistics/barChart/BarChartMobilityPerYear";
import BarChartMobilityByEvent from "@/components/statistics/barChart/BarChartMobilityByEvent";
import LineChartMobilityTrend from "@/components/statistics/lineChart/LineChartMobilityTrend";
import PieChartMobilityByEvent from "@/components/statistics/pieChart/PieChartMobilityByEvent";
import ChartError from "@/components/ui/chartError";
import ChartNoFound from "@/components/ui/chartNoFound";

export default function StatisticsPage() {

    return (
        <>
            <Title title="Estadísticas" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-10 my-10">
                <Chart title="Movilidad por facultad">
                    {/* <SkeletonPieChart /> */}
                    <BarChartMobilityByFaculty />
                </Chart>
                <Chart title="Movilidad por paises">
                    <BarChartMobilityByCountry />
                </Chart>
                <Chart title="Distribución por tipos de evento">
                    <PieChartMobilityByEvent />
                </Chart>
                <Chart title="Movilidades por Evento">
                    <BarChartMobilityByEvent />
                </Chart>
                <Chart title="Movilidades por año">
                    <ChartError />
                    {/* <BarChartMobilitiesPerYear /> */}
                </Chart>
                <Chart title="Tendencia de movilidad anual">
                    <ChartNoFound />
                    {/* <LineChartMobilityTrend /> */}
                </Chart>
            </div>
        </>
    );
}