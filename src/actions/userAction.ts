'use server';

import axios from "@/services/axios.service";
import { apiUrl } from "@/services/env.service";
import { updatePassword } from "@/services/user.service";
import { UpdatePasswordPayload } from "@/types/passwordType";
import { UserData } from "@/types/userType";
import { AxiosError } from "axios";
import { PromiseSuccess } from "@/types/responseType";
import { CreateUserResponse } from "@/types/userType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createUser(data: UserData): Promise <CreateUserResponse> {
    try {
        console.log("Datos enviados para crear usuario:", data);
        const response = await axios.post(`${API_URL}/users/createAdmin`, data);
        console.log("Respuesta del servidor al crear usuario:", response.data);
        return {
            success: true,
            data: {
                ...response.data,
            },
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        // Determinar qué campo tiene el error
        let field: 'name' | 'lastName' | 'email' | 'role' | 'faculty' | 'root' = 'root';
        let errorMessage = "Error al crear el usuario. Inténtelo nuevamente.";
        if (axiosError.response?.status === 400) {
            errorMessage = "Error de validación. Verifique los datos ingresados.";
            const responseData = axiosError.response?.data as CreateUserResponse;
            if (responseData?.error?.includes('name')) {
                field = 'name';
            } else if (responseData?.error?.includes('lastName')) {
                field = 'lastName';
            } else if (responseData?.error?.includes('email')) {
                field = 'email';
            } else if (responseData?.error?.includes('role')) {
                field = 'role';
            } else if (responseData?.error?.includes('faculty')) {
                field = 'faculty';
            }
        } else if (axiosError.response?.status === 500) {
            errorMessage = "El correo ya está registrado. Ingrese otro.";
            field = 'email';
        }

        return {
            success: false,
            error: errorMessage,
            field: field,
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