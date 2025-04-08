"use client";

import StatisticsHeader from "@/components/statistics/statisticsHeader";

import PieChartInternationalAgreement from "@/components/statistics/pieChart/PieChartInternationalAgreement";
import PieChartNationalAgreement from "@/components/statistics/pieChart/PieChartNacionalAgreements";
import BarChartMobilityByEvent from "@/components/statistics/barChart/BarChartMobilityByEvent";
import BarChartMobilityByFaculty from "@/components/statistics/barChart/BarChartMobilityByFaculty";
import LineChartMobilityTrend from "@/components/statistics/lineChart/LineChartMobilityTrend";
import BarChartMobilitiesPerYear from "@/components/statistics/barChart/BarChartMobilityPerYear";
import BarChartMobilityByCountry from "@/components/statistics/barChart/BarChartMobilityByCountry";

import { useStatisticsFilters } from "@/hooks/useFilterStatistics";

export default function StatisticsPage() {

    // Hook para manejar filtros
    const {
        activeFilters,
        handleFilter
    } = useStatisticsFilters();

    console.log("activeFilters", activeFilters);

    return (
        <div className="flex flex-col gap-6 pb-10">

            <StatisticsHeader
                title="Estadísticas"
                description="Consulta estadísticas de convenios y movilidades. Filtra la información y exporta los datos para su uso."
                onFilter={handleFilter}
                activeFilters={activeFilters}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-10 my-10">
                <PieChartInternationalAgreement />
                <PieChartNationalAgreement />
                <BarChartMobilityByEvent />
                <BarChartMobilityByFaculty />
                <LineChartMobilityTrend />
                <BarChartMobilitiesPerYear />
                <BarChartMobilityByCountry />
            </div>
        </div>
    );
}