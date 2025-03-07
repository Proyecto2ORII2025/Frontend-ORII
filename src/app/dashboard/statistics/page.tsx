"use client";

import Title from "@/components/ui/title";
import BarChartMobilityByFaculty from "@/components/statistics/barChart/BarChartMobilityByFaculty";
import BarChartMobilityByCountry from "@/components/statistics/barChart/BarChartMobilityByCountry";
//import BarChartMobilitiesPerYear from "@/components/statistics/barChart/BarChartMobilityPerYear";
import BarChartMobilityByEvent from "@/components/statistics/barChart/BarChartMobilityByEvent";
import LineChartMobilityTrend from "@/components/statistics/lineChart/LineChartMobilityTrend";
import PieChartMobilityByEvent from "@/components/statistics/pieChart/PieChartMobilityByEvent";


export default function StatisticsPage() {

    return (
        <>
            <Title title="Estadísticas" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-10 my-10">
                <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
                    <div className="flex justify-center mt-5">
                        <h2>Distribución de tipos de convenios</h2>
                    </div>
                    <div className="mt-5 h-full"> 
                        <BarChartMobilityByFaculty />
                    </div>
                </div>
                <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
                    <div className="flex justify-center mt-5">
                        <h2>Movilidad por facultad</h2>
                    </div>
                    <div className="mt-5 h-full">
                        <BarChartMobilityByCountry />
                    </div>
                </div>
                {/*<div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
                    <div className="flex justify-center mt-5">
                        <h2>Tendencia de movilidad anual</h2>
                    </div>
                    <div className="mt-5 h-full">
                        <BarChartMobilitiesPerYear />
                    </div>
                </div>*/}
                <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
                    <div className="flex justify-center mt-5">
                        <h2>Movilidades por año</h2>
                    </div>
                    <div className="mt-5 h-full">
                        <BarChartMobilityByEvent />
                    </div>
                </div>
                <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
                    <div className="flex justify-center mt-5">
                        <h2>Movilidades por países</h2>
                    </div>
                    <div className="mt-5 h-full">
                        <LineChartMobilityTrend />
                    </div>
                </div>
                <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
                    <div className="flex justify-center mt-5">
                        <h2>Movilidades por países</h2>
                    </div>
                    <div className="mt-5 h-full">
                        <PieChartMobilityByEvent />
                    </div>
                </div>
            </div>
        </>
    );
}