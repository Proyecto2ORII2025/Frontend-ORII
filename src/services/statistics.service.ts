import authApi from "./axios.service";
import { apiUrl } from "./env.service";
import { eventData, yearData, facultyData, countryData } from "@/types/ChartTypes";

const url = `${apiUrl}/statistics`;

export const getMovilityByFaculty = async (): Promise<facultyData> => {
    const response = await authApi.get(`${url}/faculty`);
    return response.data;
}

export const getMobilityByCountry = async (): Promise<countryData> => {
    const response = await authApi.get(`${url}/country`);
    return response.data;
}

export const getMobilityPerYear = async (): Promise<yearData> => {
    const response = await authApi.get(`${url}/mobilitytrend`);
    return response.data;
}

export const getMobilityByEvent = async (): Promise<eventData> => {
    const response = await authApi.get(`${url}/mobilitybyevent`);
    return response.data;
}