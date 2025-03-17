import axios from "axios";
import { apiUrl } from "./env.service";

/**
 * Axios instance configured with default settings.
 *
 * @constant {AxiosInstance} instance - The Axios instance.
 * @property {boolean} withCredentials - Indicates whether or not cross-site Access-Control requests should be made using credentials.
 * @property {string} baseURL - The base URL for the Axios instance.
 */
const instance = axios.create({
    withCredentials: true,
    baseURL: apiUrl
});

// Función para obtener el valor de una cookie por su nombre
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
        return null; // Estamos en el servidor
    }
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

// Interceptor para añadir el token automáticamente a cada petición
instance.interceptors.request.use(
    (config) => {
        // Solo ejecutar en el navegador
        if (typeof window !== 'undefined') {
            // Intenta obtener el token de la cookie primero
            const cookieToken = getCookie('auth-token');
            
            if (cookieToken) {
                config.headers.Authorization = `Bearer ${cookieToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;