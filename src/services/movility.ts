import axios from "./axios.service";
import { apiUrl } from "./env.service";
import { Movility, MovilityCrear } from "../types/movilityType"; 

const url = `${apiUrl}/form`; 

export const getMovilities = async () => {
    return await axios.get(`${url}/allForms`);
}

export const createMovility = async (movility: MovilityCrear) => {
    return await axios.post(`${url}/create`, movility);
}

export const updateMovility = async (movility: Movility, movilityId: number) => {
    return await axios.put(`${url}/update/${movilityId}`, movility);
}

export const deleteMovility = async (movilityId: number) => {
    return await axios.delete(`${url}/delete/${movilityId}`);
}

export const getMovilityById = async (id: number) => {
    return await axios.get(`${url}/${id}`);
}
