'use server';

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { UserSession } from "@/types/authType";

export async function getServerAuthToken(): Promise<string | null> {
    return (await cookies()).get('auth-token')?.value || null;
}

export async function deleteServerAuthToken() {
    const cookieStore = cookies();
    (await cookieStore).delete('auth-token');
}

export async function verifyTokenOnServer(token: string){
    if (!token) return false;
    
    try {
        const decoded = jwtDecode<UserSession>(token);
        return decoded.exp > Date.now() / 1000;
    } catch {
        return false;
    }
}