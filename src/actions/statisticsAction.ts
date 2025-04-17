'use server';

import { getMovilityByFaculty, getMobilityByCountry, getMobilityByEvent, getMobilityPerYear, getAgreementByCountry, getAgreementByRegion, getStatisticsReportBlob } from "@/services/statistics.service";
import { eventData, yearData, facultyData, countryData, InternationalAgreementData, NationalAgreementData } from "@/types/ChartTypes";

export async function fetchMobilityByFaculty(): Promise<facultyData> {
    try {
        return await getMovilityByFaculty();
    } catch (error) {
        console.error("Error al obtener las estadísticas por facultad:", error);
        throw error;
    }
}

export async function fetchMobilityByCountry(): Promise<countryData> {
    try {
        return await getMobilityByCountry();
    } catch (error) {
        console.log("Error al obtener las estadísticas:", error);
        throw error;
    }
}

export async function fetchMobilityPerYear(): Promise<yearData> {
    try {
        const response = await getMobilityPerYear();
        return response;
    } catch (error) {
        console.log("Error al obtener las estadísticas:", error);
        throw error;
    }
}

export async function fetchMobilityByEvent(): Promise<eventData> {
    try {
        const response = await getMobilityByEvent();
        return response;
    } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        throw error;
    }
}

export async function fetchAgreementByCountry(): Promise<InternationalAgreementData> {
    try {
        const response = await getAgreementByCountry();
        return response;
    } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        throw error;
    }
}

export async function fetchAgreementByRegion(): Promise<NationalAgreementData> {
    try {
        const response = await getAgreementByRegion();
        return response;
    } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        throw error;
    }
}


export async function exportStatisticsReport(): Promise<{ blob: Blob } | null> {
    try {
        const response = await getStatisticsReportBlob();
        const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        return { blob };
    } catch (error) {
        console.error("Error al obtener el blob de estadísticas:", error);
        return null;
    }
}