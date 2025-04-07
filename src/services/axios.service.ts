import axios from "axios";
import { getServerAuthToken } from "@/lib/auth-server";

const baseURL = process.env.NODE_ENV === "production"
    ? process.env.DOMAIN
    : process.env.NEXT_PUBLIC_API_URL;

const authApi = axios.create({
    baseURL,
    withCredentials: true,
});

// Interceptor para requests desde el cliente
authApi.interceptors.request.use(async (config) => {
    const token = await getServerAuthToken();
    
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

export default authApi;