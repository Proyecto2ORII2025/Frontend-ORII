import { createContext, useState, useEffect, ReactNode } from "react";
import { login } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";

// Definición de interfaces
interface User {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  singin: (userLogin: LoginCredentials) => Promise<void>;
  user: User | null;
  loginError: string | null;
  singout: () => boolean;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Crear contexto con tipo
export const AuthContext = createContext<AuthContextType>({
  user: null,
  singin: async () => {},
  loginError: null,
  singout: () => true,
  loading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loginError) {
      const timer = setTimeout(() => {
        setLoginError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginError]);

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token);

        // Verificar si el token ha expirado
        if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          setUser(decodedToken);
        } else {
          // El token ha expirado
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("user"); // Eliminar tokens corruptos
      }
    }

    setLoading(false);
  }, []);

  const singin = async (userLogin: LoginCredentials): Promise<void> => {
    try {
      console.log("Intentando iniciar sesión con:", userLogin);
      const res = await login(userLogin);
      console.log("Respuesta del servidor:", res);
      
      if (res.data?.accessToken) {
        const decodedUser = jwtDecode<User>(res.data.accessToken);
        console.log("Usuario decodificado:", decodedUser);
        
        setUser(decodedUser);
        localStorage.setItem("user", res.data.accessToken);
        setLoginError(null);
      } else {
        console.error("Token no recibido");
        setLoginError("Error en la autenticación");
      }
    } catch (error) {
      console.error("Error completo:", error);
      setLoginError("Usuario o contraseña incorrectos");
    }
  };

  const singout = (): boolean => {
    setUser(null);

    localStorage.removeItem("user");
    sessionStorage.removeItem("movility");

    return true;
  };

  return (
    <AuthContext.Provider
      value={{ singin, user, loginError, singout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
