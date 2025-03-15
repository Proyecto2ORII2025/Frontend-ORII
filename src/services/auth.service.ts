import axios from "./axios.service";
import { apiUrl } from "./env.service";

const url = `${apiUrl}/auth`;

interface User {
    email: string;
    password: string;
}

export async function login(user: User) {
    try {
        const response = await axios.post(`${url}/login`, user);
        return response;
    } catch (error) {
        throw error;
    }
};