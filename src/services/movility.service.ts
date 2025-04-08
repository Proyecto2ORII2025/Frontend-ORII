import authApi from "./axios.service";
import { apiUrl } from "./env.service";
import { MovilityCrear } from "../types/movilityType";

const url = `${apiUrl}/form`;

export const getMovilities = async () => {
    return await authApi.get(`${url}/allForms`);
}

export const createMovility = async (movility: MovilityCrear) => {
    return await authApi.post(`${url}/create`, movility);
}

export const updateMovility = async (movility: MovilityCrear, movilityId: number) => {
    return await authApi.put(`${url}/update/${movilityId}`, movility);
}

export const deleteMovility = async (movilityId: number) => {
    return await authApi.delete(`${url}/delete/${movilityId}`);
}

export const getMovilityById = async (id: number) => {
    return await authApi.get(`${url}/${id}`);
}

export const getMobilitiesBlob = async () => {
    //Desde el back se esta trayendo un arraybuffer, de aqui pasamos al action
    //Importante definir el responseType
    return await authApi.get(`${apiUrl}/reports/mobility/filters`, { responseType: 'arraybuffer' });
}

