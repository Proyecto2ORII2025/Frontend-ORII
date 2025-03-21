import axios from "axios";
import { apiUrl } from "./env.service";
import { cookies } from 'next/headers';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: apiUrl
});

// Interceptor para añadir el token de autorización a todas las peticiones
axiosInstance.interceptors.request.use(
    async (config) => {
        // Obtener el token de las cookies
        try {
            const token = (await cookies()).get('auth-token')?.value;
            
            if (token) {
                // Añadir el token al header de autorización a todas las peticiones
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error al obtener el token:", error);
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;