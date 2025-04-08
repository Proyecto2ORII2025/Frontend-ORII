import authApi from "./axios.service";
import { apiUrl } from "./env.service";
import { eventData, yearData, facultyData, countryData, InternationalAgreementData, NationalAgreementData } from "@/types/chartTypes";

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

export const getAgreementByCountry = async (): Promise<InternationalAgreementData> => {
    //const response = await axiosInstance.get(`${url}/agreementbycountry`);
    //return response.data;
    return {
        countries: ["Argentina", "Chile", "Colombia", "Perú"],
        totalAgreementsByCountry: [10, 20, 30, 40],}
}

export const getAgreementByRegion = async (): Promise<NationalAgreementData> => {
    //const response = await axiosInstance.get(`${url}/agreementbyregion`);
    //return response.data;
    return {
        region: ["Cali", "Bogota", "Medellin"],
        totalAgreementsByRegion: [50, 20, 30],}
}