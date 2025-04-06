'use server';

import { getMovilityByFaculty, getMobilityByCountry, getMobilityByEvent, getMobilityPerYear } from "@/services/statistics.service";
import { eventData, yearData, facultyData, countryData } from "@/types/ChartTypes";

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