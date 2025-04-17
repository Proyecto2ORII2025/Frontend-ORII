"use client";

import { useStatistics } from "@/hooks/useStatistics";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";

import StatisticsHeader from "@/components/statistics/statisticsHeader";
import PieChartInternationalAgreement from "@/components/statistics/pieChart/PieChartInternationalAgreement";
import PieChartNationalAgreement from "@/components/statistics/pieChart/PieChartNacionalAgreements";
import BarChartMobilityByEvent from "@/components/statistics/barChart/BarChartMobilityByEvent";
import BarChartMobilityByFaculty from "@/components/statistics/barChart/BarChartMobilityByFaculty";
import LineChartMobilityTrend from "@/components/statistics/lineChart/LineChartMobilityTrend";
import BarChartMobilitiesPerYear from "@/components/statistics/barChart/BarChartMobilityPerYear";
import BarChartMobilityByCountry from "@/components/statistics/barChart/BarChartMobilityByCountry";

export default function StatisticsPage() {

    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = (userSession?.role as UserRole) || 'USER';

    const {
        activeFilters,
        handleFilter,
        removeFilter,
        fileBlob,
        disableExport
    } = useStatistics();

    console.log("activeFilters", activeFilters);

    return (
        <div className="flex flex-col gap-6 pb-10">
            <StatisticsHeader
                title="Estadísticas"
                description="Consulta estadísticas de convenios y movilidades. Filtra la información y exporta los datos para su uso."
                role={role}
                onFilter={handleFilter}
                onRemoveFilter={removeFilter}
                activeFilters={activeFilters}
                fileBlob={fileBlob}
                disableExport={disableExport}
            />

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 mx-10 my-10">
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