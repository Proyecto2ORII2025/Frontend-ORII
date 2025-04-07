"use client";

import * as React from "react";
import {
    Globe,
    Home,
    ChartColumnIncreasing,
    PlaneTakeoff,
    UserRoundPlus,
    LucideIcon,
} from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/navigation/sidebar";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";
import { UserData } from "@/types/userType";
import { fetchUserData } from "@/actions/userAction";
import { useEffect, useState } from "react";
import { UserRole } from "@/types/userType";

interface NavItem {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items: Array<{ title: string; url: string }>;
    roles?: UserRole[];
}

const data = {
    navMain: [
        {
            title: "Inicio",
            url: "/dashboard/home",
            icon: Home,
            isActive: true,
            items: [{ title: "Acerca de ORII", url: "/dashboard/home" }],
            roles: ['SU', 'ADMIN', 'USER']
        },
        {
            title: "Convenios",
            url: "/dashboard/agreements",
            icon: Globe,
            items: [
                { title: "Listar convenios", url: "/dashboard/agreements" },
                { title: "Crear convenio", url: "/dashboard/agreements/create" },
            ],
            roles: ['ADMIN', 'USER']
        },
        {
            title: "Movilidad",
            url: "/dashboard/movility",
            icon: PlaneTakeoff,
            items: [
                { title: "Listar movilidades", url: "/dashboard/movility" },
                { title: "Crear movilidad", url: "/dashboard/movility/create" },
            ],
            roles: ['ADMIN', 'USER']
        },
        {
            title: "Estadisticas",
            url: "/dashboard/statistics",
            icon: ChartColumnIncreasing,
            items: [{ title: "Gráficos", url: "/dashboard/statistics" }],
            roles: ['ADMIN']
        },
        {
            title: "Registrar usuarios",
            url: "/dashboard/user",
            icon: UserRoundPlus,
            items: [{ title: "Crear usuario", url: "/dashboard/user/create" }],
            roles: ['SU']
        },
    ] as NavItem[],
};

export const AppSidebar = React.memo(function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {

    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = (userSession?.role as UserRole) || 'USER';
    const [userDetails, setUserDetails] = useState<UserData | null>(null);

    useEffect(() => {
        const getUserData = async () => {
            // Si el rol es SU (SuperAdmin), no se hace la petición
            if (userSession?.role === 'SU') {
                setUserDetails({
                    name: "Super",
                    lastName: "Admin",
                    email: "",
                } as UserData);
                return; // Se sale de la función para no hacer la petición
            }

            // Para otros roles
            if (userSession?.userId) {
                try {
                    const userId = parseInt(userSession.userId || "0");

                    if (userId > 0) {
                        const userData = await fetchUserData(userId);
                        setUserDetails(userData);
                    }
                } catch (error) {
                    console.error("Error al cargar datos del usuario", error);
                }
            } else {
                console.warn("No se encontró ID en el token");
            }
        };

        getUserData();
    }, [userSession]);


    const filteredNavMain = data.navMain.filter((item) => {
        return !item.roles || item.roles.includes(role);
    });

    const user = {
        name: userSession?.role === 'SU'
            ? "SuperAdmin"
            : (userDetails
                ? `${userDetails.name} ${userDetails.lastName}`
                : userSession?.name || userSession?.email?.split('@')[0] || "Usuario"),
        email: userSession?.role === 'SU'
            ? "orii@unicauca.edu.co"
            : (userDetails?.email || userSession?.email || ""),
        avatar: "/img/user.webp",
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-blueDark text-white p-4 items-start">
                <Image
                    src={"/logos/ORII.webp"}
                    alt="Logo"
                    width={150}
                    height={150}
                    className="group-data-[collapsible=icon]:w-0 orii-logo"
                    priority
                />
            </SidebarHeader>
            <SidebarContent className="bg-blueDark text-white pt-8">
                <NavMain items={filteredNavMain} />
            </SidebarContent>
            <SidebarFooter className="bg-blueDark text-white">
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
});