import axios from "./axios.service";
import { apiUrl } from "./env.service";

const url = `${apiUrl}/statistics`;

export const getStatistics = {
    getMovilityByFaculty: async () => {
        try {
            const response = await axios.get(`${url}/faculty`);
            return response;
        } catch (error) {
            console.error("Error al obtener estadísticas: ", error);
            throw error;
        }
    },
    getMobilityByCountry: async () => {
        try{
            const response = await axios.get(`${url}/country`);
            return response;
        } catch (error) {
            console.error("Error al obtener estadísticas: ", error);
            throw error;
        }
    },
    getMobilityPerYear: async () => {
        try{
            const response = await axios.get(`${url}/mobilitytrend`);
            return response;
        } catch (error) {
            console.error("Error al obtener estadísticas: ", error);
            throw error;
        }
    },
    getMobilityByEvent: async () => {
        try{
            const response = await axios.get(`${url}/mobilitybyevent`);
            return response;
        } catch (error) {
            console.error("Error al obtener estadísticas: ", error);
            throw error;
        }
    }
};