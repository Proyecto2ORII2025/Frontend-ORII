import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { UserSession } from "@/types/authType";
import { UserRole } from "./types/userType";

// Definición de tipos para las rutas protegidas
interface ProtectedRoute {
    path: string;
    allowedRoles: UserRole[];
}

// Definición de rutas protegidas con sus roles permitidos
const protectedRoutes: ProtectedRoute[] = [
    {
        path: "/dashboard/home",
        allowedRoles: ['SU', 'ADMIN', 'USER']
    },
    {
        path: "/dashboard/agreements",
        allowedRoles: ['ADMIN', 'USER']
    },
    {
        path: "/dashboard/movility",
        allowedRoles: ['ADMIN', 'USER']
    },
    {
        path: "/dashboard/statistics",
        allowedRoles: ['ADMIN', 'USER']
    },
    {
        path: "/dashboard/user",
        allowedRoles: ['SU']
    },
    // Rutas generales
    {
        path: "/dashboard",
        allowedRoles: ['SU', 'ADMIN', 'USER']
    }
];

/**
 * Decodifica el token JWT para extraer el rol del usuario
 */
function decodeToken(token: string): UserRole | null {
    try {
        const decoded = jwtDecode<UserSession>(token);
        return decoded.role as UserRole || null;
    } catch (error) {
        console.error("Error al decodificar token:", error);
        return null;
    }
}

/**
 * Verifica si el usuario tiene permiso para acceder a una ruta específica
 */
function hasAccessToRoute(url: string, userRole: UserRole): boolean {
    // Ordenamos las rutas más específicas primero
    const sortedRoutes = [...protectedRoutes].sort((a, b) =>
        b.path.length - a.path.length
    );

    for (const route of sortedRoutes) {
        if (url.startsWith(route.path)) {
            return route.allowedRoles.includes(userRole);
        }
    }

    // Si no hay reglas específicas, denegamos el acceso por defecto
    return false;
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value;

    // Redireccionar a login si no hay token
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        const userRole = decodeToken(token);

        if (!userRole) {
            throw new Error("No se pudo decodificar el rol del token");
        }

        const url = request.nextUrl.pathname;

        // Verificar acceso a la ruta según el rol
        if (!hasAccessToRoute(url, userRole)) {
            return NextResponse.redirect(new URL("/forbidden", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Error en middleware:", error);
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};