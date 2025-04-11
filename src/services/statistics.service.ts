import authApi from "./axios.service";
import { apiUrl } from "./env.service";
import { eventData, yearData, facultyData, countryData, InternationalAgreementData, NationalAgreementData } from "@/types/chartTypes";

import * as XLSX from "xlsx"; //TEMPORAL

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
    //const response = await authApi.get(`${url}/agreementbycountry`);
    //return response.data;
    return {
        countries: ["Argentina", "Chile", "Colombia", "Perú"],
        totalAgreementsByCountry: [10, 20, 30, 40],
    }
}

export const getAgreementByRegion = async (): Promise<NationalAgreementData> => {
    //const response = await authApi.get(`${url}/agreementbyregion`);
    //return response.data;
    return {
        region: ["Cali", "Bogota", "Medellin"],
        totalAgreementsByRegion: [50, 20, 30],
    }
}

/*export const getStatisticsReportBlob = async () => {
    const response = await authApi.get(`${url}/reports/statistics`, { responseType: 'arraybuffer' });
    return response.data;
} */

//TEMPORAL
export const getStatisticsReportBlob = async () => {
    // Crear datos simulados para el archivo Excel
    const worksheetData = [["En construcción..."]]; // Datos de la hoja de cálculo
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData); // Crear hoja de cálculo
    const workbook = XLSX.utils.book_new(); // Crear libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte"); // Agregar hoja al libro

    // Generar el archivo Excel en formato binario
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Crear un Blob a partir del buffer
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return { data: blob };
};