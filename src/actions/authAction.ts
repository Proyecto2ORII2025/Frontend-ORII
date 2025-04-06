'use server';

import { cookies } from 'next/headers';
import axios, { AxiosError } from 'axios';
import { ErrorResponse, LoginResponse } from './responseType';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function authAction(data: { email: string; password: string }): Promise<LoginResponse> {
    try {
        // Petición que se ejecuta desde el servidor, evitando problemas de CORS
        const apiResponse = await axios.post(`${API_URL}/auth/login`, data);

        // Obtener el token de la respuesta de la API (podría ser token o accessToken)
        const apiToken = apiResponse.data.token || apiResponse.data.accessToken;

        if (!apiToken) {
            console.error("No se recibió token de la API");
            return {
                success: false,
                error: "No se recibió token de la API",
                field: 'root'
            };
        }

        // Establecer la cookie usando la API de cookies de Next.js
        (await
            // Establecer la cookie usando la API de cookies de Next.js
            cookies()).set({
                name: 'auth-token', // Nombre de la cookie
                value: apiToken,    // Usamos el token de la API directamente
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',    // 'lax' es más compatible que 'none' para la mayoría de los casos
                maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
                path: '/'
            });

        console.log("Cookie establecida con éxito:", "auth-token");

        // También devolvemos el token en la respuesta para que el cliente
        // pueda guardarlo en localStorage si es necesario
        return {
            success: true,
            data: {
                ...apiResponse.data,
                token: apiToken // Asegurarnos de que el token esté disponible con este nombre
            }
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

// Logout action
export async function logoutAction(): Promise<{ success: boolean; error?: string }> {
    try {
        (await
            // Eliminar la cookie
            cookies()).delete('auth-token');

        console.log("Cookie eliminada con éxito");

        return {
            success: true
        };
    } catch (error) {
        console.error("Error al cerrar sesión:", error);

        return {
            success: false,
            error: "Error al cerrar sesión"
        };
    }
}