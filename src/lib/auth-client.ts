import { jwtDecode } from "jwt-decode";
import { UserSession } from "@/types/authType";

export function isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
        const decoded = jwtDecode(token) as { exp: number };
        return decoded.exp > Date.now() / 1000;
    } catch {
        return false;
    }
}

export function decodeToken(token: string): UserSession | null {
    if (!token) return null;

    try {
        const decoded = jwtDecode(token) as UserSession;
        return decoded;
    } catch (error) {
        console.error("Error al decodificar token:", error);
        return null;
    }
}