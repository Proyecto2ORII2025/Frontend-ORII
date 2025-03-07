import axios from "./axios.service";
import { apiUrl } from "./env.service";

const url = `${apiUrl}/auth`;

type User = {
    email: string;
    password: string;
}

export const login = async (user: User) => {
    console.log("URL de la API:", apiUrl);
    console.log("URL completa:", `${url}/login`);
    
    try {
        const response = await axios.post(`${url}/login`, user);
        console.log("Login exitoso:", response);
        return response;
    } catch (error) {
        console.error("Error detallado en login:", error);
        throw error;
    }
};