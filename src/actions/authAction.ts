// actions/authAction.ts
'use server';

import { cookies } from 'next/headers';
import axios, { AxiosError } from 'axios';
import { LoginResponse, ErrorResponse } from '@/types/authType';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_COOKIE_NAME = 'auth-token';

/**
 * Acción del servidor para iniciar sesión
 */
export async function loginAction(credentials: { email: string; password: string }): Promise<LoginResponse> {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        const apiToken = response.data.accessToken;

        if (!apiToken) {
            console.error("No se recibió token de la API");
            return {
                success: false,
                error: "No se recibió token de la API",
                field: 'root'
            };
        }

        // Guardar token en cookies HTTP para el servidor
        const cookieStore = cookies();
        (await cookieStore).set(TOKEN_COOKIE_NAME, apiToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 semana
            path: '/',
        });

        return {
            success: true,
            data: {
                ...response.data,
                token: apiToken
            }
        };
    } catch (error) {
        const axiosError = error as AxiosError;
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

/**
 * Acción del servidor para cerrar sesión
 */
export async function logoutAction() {
    try {
        const cookieStore = cookies();
        (await cookieStore).delete(TOKEN_COOKIE_NAME);
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return { success: false };
    }
}

/**
 * Obtiene el token de autenticación del servidor
 */
export async function getServerToken() {
    const cookieStore = cookies();
    return (await cookieStore).get(TOKEN_COOKIE_NAME)?.value || null;
}