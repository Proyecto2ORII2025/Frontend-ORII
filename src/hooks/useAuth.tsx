import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { isTokenValid } from "@/lib/auth-client";

export function useAuth({ requireAuth = false, redirectTo = '/' } = {}) {
    const { token, userSession, isAuthenticated, loading, login, logout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Verificar token expirado
        if (token && !isTokenValid(token)) {
            logout();
        }

        // Redireccionar si se requiere autenticación
        if (requireAuth && !isAuthenticated && !loading) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, loading, requireAuth, redirectTo, router, token, logout]);

    return {
        userSession,
        token,
        isAuthenticated,
        loading,
        login,
        logout
    };
}