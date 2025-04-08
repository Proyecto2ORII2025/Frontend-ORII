'use server';

import axios from "@/services/axios.service";
import { apiUrl } from "@/services/env.service";
import { updatePassword } from "@/services/user.service";
import { UpdatePasswordPayload } from "@/types/passwordType";
import { UserData } from "@/types/userType";
import { AxiosError } from "axios";

interface PromiseSuccess {
    success: boolean;
    error?: string;
    field?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createUser(data: UserData) {
    try {
        console.log("Datos enviados para crear usuario:", data);
        const response = await axios.post(`${API_URL}/users/createAdmin`, data);
        console.log("Respuesta del servidor al crear usuario:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        if (error instanceof AxiosError && error.response) {
            console.error("Detalles del error de respuesta:", error.response.data);
        }
    }
}

export async function fetchUserData(userID: number) {
    try {
        const response = await axios.get(`${API_URL}/users/get/${userID}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
    }
}

export async function forgotPasswordUser(email: string): Promise<PromiseSuccess> {
    try {
        const response = await axios.post(`${apiUrl}/users/forgotpassword`, { email });

        if (response.data === true) {
            return { success: true };
        } else {
            return {
                success: false,
                error: "No se pudo enviar el correo de recuperación.",
                field: "email",
            };
        }
    } catch (error) {
        console.error("Error al recuperar contraseña:", error);
        return {
            success: false,
            error: "Ocurrió un error al procesar la solicitud.",
            field: "root",
        };
    }
}

export async function updatePasswordUser(data: UpdatePasswordPayload): Promise<PromiseSuccess> {
    try {
        const response = await updatePassword(data);
        if (response.data === true) {
            return { success: true };
        }
        return {
            success: false,
            error: "No se pudo actualizar la contraseña.",
            field: "root",
        };
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return {
            success: false,
            error: "Ocurrió un error al procesar la solicitud.",
            field: "root",
        };
    }
}