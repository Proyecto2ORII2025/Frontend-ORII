import axiosInstance from "./axios.service";
import { apiUrl } from "./env.service";
import { eventData, yearData, facultyData, countryData } from "@/types/ChartTypes";

const url = `${apiUrl}/statistics`;

export const getMovilityByFaculty = async (): Promise<facultyData> => {
    try {
        const response = await axiosInstance.get(`${url}/faculty`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas: ", error);
        throw error;
    }
}

export const getMobilityByCountry = async (): Promise<countryData> => {
    try{
        const response = await axiosInstance.get(`${url}/country`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas: ", error);
        throw error;
    }
}

export const getMobilityPerYear = async (): Promise<yearData> => {
    try{
        const response = await axiosInstance.get(`${url}/mobilitytrend`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas: ", error);
        throw error;
    }
}

export const getMobilityByEvent = async (): Promise<eventData> => {
    try {
        // Limitar explícitamente lo que se devuelve para evitar estructuras circulares
        const response = await axiosInstance.get(`${url}/mobilitybyevent`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        throw new Error("Error al obtener estadísticas de movilidad por evento");
    }
}