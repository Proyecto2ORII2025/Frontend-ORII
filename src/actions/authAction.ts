'use client'; // server action

import axios, { AxiosError } from 'axios';
import { ErrorResponse, LoginResponse } from './responseType';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export async function authAction(data: { email: string; password: string }): Promise<LoginResponse> {
    try {
        // Petición que se ejecuta desde el servidor, evitando problemas de CORS
        const response = await axios.post(`${API_URL}/auth/login`, data);

        return {
            success: true,
            data: response.data
        };
    } catch (error) {

        const axiosError = error as AxiosError;
        console.error("Error de autenticación en el servidor:", axiosError);

        // Determinar qué campo tiene el error
        let field: 'email' | 'password' | 'root' = 'root';
        let errorMessage = "Error al iniciar sesión. Inténtelo nuevamente.";

        if (axiosError.response?.status === 401) {
            errorMessage = "Credenciales incorrectas. Intente de nuevo.";
            field = 'root';

            const responseData = axiosError.response?.data as ErrorResponse;
            if (responseData?.detail?.includes('email') || responseData?.message?.includes('email') || responseData?.error?.includes('email')) {
                field = 'email';
            } else if (responseData?.detail?.includes('password') || responseData?.message?.includes('password') || responseData?.error?.includes('password')) {
                field = 'password';
            }
        }

        return {
            success: false,
            error: errorMessage,
            field: field
        };
    }
}