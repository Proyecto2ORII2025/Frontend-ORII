import { JwtPayload } from "jwt-decode";

/**
 * Información decodificada del token JWT
 */
export interface UserSession extends JwtPayload {
    email: string;
    role: string;
    userId: string;
    sub: string;
    name: string;
    lastname: string;
    exp: number;
}

/**
 * Estado global de autenticación
 */
export interface AuthState {
    token: string | null;
    userSession: UserSession | null;
    loading: boolean;
    isAuthenticated: boolean;
}

/**
 * Acciones disponibles para la autenticación
 */
export interface AuthActions {
    login: (credentials: AuthCredentials) => Promise<LoginResponse | { success: boolean; error: string; field: "root"; }>;
    logout: () => Promise<void>;
    setToken: (token: string | null) => void;
    checkAuth: () => boolean;
}

/**
 * Credenciales para iniciar sesión
 */
export interface AuthCredentials {
    email: string;
    password: string;
}

/**
 * Store completo de autenticación (combinación de estado y acciones)
 */
export type AuthStore = AuthState & AuthActions;

/**
 * Respuesta de la API al iniciar sesión
 */
export interface LoginResponse {
    success: boolean;
    data?: {
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    };
    error?: string;
    field?: 'email' | 'password' | 'root';
}

/**
 * Respuesta de error de la API
 */
export interface ErrorResponse {
    detail?: string;
    message?: string;
    error?: string;
}