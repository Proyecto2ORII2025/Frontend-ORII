"use server";

import { Movility, MovilityCrear} from "@/types/movilityType";
import { getMovilities, createMovility, updateMovility, deleteMovility, getMovilityById } from "@/services/movility";

interface PromiseSuccess {
    success: boolean;
    error?: string;
    field?: string;
}

export async function fetchMovilities(): Promise<Movility[]> {
    try {
        console.log("Obteniendo las movilidades...");
        const response = await getMovilities();
        return response.data.content;
    } catch (error) {
        console.error("Error al obtener las movilidades:", error);
        return [];
    }
}

export async function createMovilityAction(data: MovilityCrear): Promise<PromiseSuccess> {
    try {
        console.log("Datos recibidos en createMovilityAction:", data);
        
        await createMovility(data);

        return { success: true };
    } catch (error) {
        console.error("Error detallado en createMovilityAction:", error);
        return { success: false };
    }
}

export async function editMovilityAction(data: Movility, movilityId: number): Promise<PromiseSuccess> {
    try {
        console.log("Datos recibidos en editMovilityAction:", data);

        await updateMovility(data, movilityId);

        return { success: true };
    } catch (error) {
        console.error("Error detallado en editMovilityAction:", error);
        return { success: false };
    }
}

export async function deleteMovilityAction(movilityId: number): Promise<PromiseSuccess> {
    try {
        console.log("Eliminando movilidad con ID:", movilityId);

        await deleteMovility(movilityId);

        return { success: true };
    } catch (error) {
        console.error("Error detallado en deleteMovilityAction:", error);
        return { success: false };
    }
}

export async function getMovilityByIdAction(id: number): Promise<Movility | null> {
    try {
        console.log("Obteniendo movilidad con ID:", id);

        const response = await getMovilityById(id);
        return response.data;
    } catch (error) {
        console.error("Error detallado en getMovilityByIdAction:", error);
        return null;
    }
}
