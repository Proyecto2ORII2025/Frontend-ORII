import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    id: number;
    role: string;
}

export function decodeToken(token: string): string | null {
    try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        return decodedToken.role;
    } catch (error) {
        console.error("Error decodificando el token:", error);
        return null;
    }
}