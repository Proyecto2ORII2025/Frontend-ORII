"use client";

import Title from "@/components/ui/title";
import BarChartMobilityByFaculty from "@/components/statistics/barChart/BarChartMobilityByFaculty";
import BarChartMobilityByCountry from "@/components/statistics/barChart/BarChartMobilityByCountry";
import BarChartMobilitiesPerYear from "@/components/statistics/barChart/BarChartMobilityPerYear";
import BarChartMobilityByEvent from "@/components/statistics/barChart/BarChartMobilityByEvent";
import PieChartMobilityByEvent from "@/components/statistics/pieChart/PieChartMobilityByEvent";
import LineChartMobilityTrend from "@/components/statistics/lineChart/LineChartMobilityTrend";
import LineChartEvent from "@/components/statistics/lineChart/LineChartEvent";

export default function StatisticsPage() {
    return (
        <>
            <Title title="Estadísticas" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-10 my-10">
                <PieChartMobilityByEvent />
                <BarChartMobilityByFaculty />
                <LineChartEvent />
                <BarChartMobilityByCountry />
                <BarChartMobilityByEvent />
                <BarChartMobilitiesPerYear />
                <LineChartMobilityTrend />
            </div>
        </>
    );
}