import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { loginAction, logoutAction } from '@/actions/authAction';
import { decodeToken, isTokenValid } from "@/lib/auth-client";
import { AuthStore } from '@/types/authType';
import { AuthCredentials } from "@/types/authType";

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: null,
            userSession: null,
            loading: false,
            isAuthenticated: false,

            // Función para actualizar el estado basado en un token
            setToken: (token: string | null) => {
                if (!token) {
                    set({
                        token: null,
                        userSession: null,
                        isAuthenticated: false,
                    });
                    return;
                }

                const userSession = decodeToken(token);
                
                set({
                    token,
                    userSession,
                    isAuthenticated: !!userSession,
                });
            },

            // Verifica si el token actual es válido
            checkAuth: () => {
                const { token } = get();
                if (!token) return false;

                const valid = isTokenValid(token);
                if (!valid) {
                    get().setToken(null);
                }

                return valid;
            },

            // Inicia sesión con credenciales
            login: async (credentials: AuthCredentials) => {
                set({ loading: true });
            
                try {
                    const result = await loginAction(credentials);
            
                    if (result.success && result.data) {
                        get().setToken(result.data.token);
                        set({ loading: false });
                        return result;
                    } else {
                        set({
                            loading: false,
                            isAuthenticated: false
                        });
                        return result;
                    }
                } catch (error) {
                    console.log("Error en la autenticación:", error);
                    
                    const fallback = {
                        success: false,
                        error: "Error de conexión con el servidor",
                        field: "root" as const
                    };
                    set({
                        loading: false,
                        isAuthenticated: false
                    });
                    return fallback;
                }
            },

            // Cierra la sesión
            logout: async () => {
                set({ loading: true });
                await logoutAction();
                set({
                    token: null,
                    userSession: null,
                    isAuthenticated: false,
                    loading: false,
                });
            }
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                token: state.token,
                userSession: state.userSession,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);